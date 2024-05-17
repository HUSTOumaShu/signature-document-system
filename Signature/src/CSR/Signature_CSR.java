package CSR ;

import javacard.framework.APDU;
import javacard.framework.Applet;
import javacard.framework.ISO7816;
import javacard.framework.ISOException;
import javacard.framework.JCSystem;
import javacard.framework.Util;
import javacard.security.KeyBuilder;
import javacard.security.KeyPair;
import javacard.security.RSAPrivateKey;
import javacard.security.RSAPublicKey;
import javacard.security.Signature;

public class Signature_CSR extends Applet
{

	private static final byte INS_GENKEY = (byte)0x00;
	private static final byte INS_SIGN = (byte)0x01;
	private static final byte INS_VERIFY = (byte)0x02;
	
	private static final byte INS_SIGN_BUF = (byte)0x03;
	
	private static final byte INS_GET_EXP = (byte)0x04;
	private static final byte INS_GET_MOD_START = (byte)0x05;
	private static final byte INS_GET_MOD_END = (byte)0x06;
	
	private static final byte INS_SEND_TOTAL_LENGTH = (byte)0x10;
	private static final byte INS_SEND_DATA_START = (byte)0x11;
	private static final byte INS_SEND_DATA_END = (byte)0x12;
	
	private static final byte INS_GET_TOTAL_LENGTH = (byte)0x20;
	private static final byte INS_GET_DATA_START = (byte) 0x21;
	private static final byte INS_GET_DATA_END = (byte)0x22;
	
	// Properties for key pair
	private final KeyPair keyPair;
	private RSAPrivateKey rsaPrivate;
	private RSAPublicKey rsaPublic;
	private final Signature rsaSig;
	
	private byte[] buf_temp, data, buf_totalLen;
	private short length, totalLen;
	
    private final byte[] sig_buffer;
	private final short sigLen;
	
	// Properties of public key
	private byte[] mod, exp; 		// exponent and modulus of public key
	private short mod_len, exp_len; // modulus & exponent length
	
	private Signature_CSR() {
		sigLen = (short)(KeyBuilder.LENGTH_RSA_2048/8);
		sig_buffer = new byte[sigLen];
		
		rsaSig = Signature.getInstance(Signature.ALG_RSA_SHA_256_PKCS1, false);
		rsaPrivate = (RSAPrivateKey)(KeyBuilder.buildKey(KeyBuilder.TYPE_RSA_PRIVATE, (short)(8*sigLen), false));
		rsaPublic = (RSAPublicKey)(KeyBuilder.buildKey(KeyBuilder.TYPE_RSA_PUBLIC, (short)(8*sigLen), false));
		
		keyPair = new KeyPair(KeyPair.ALG_RSA, (short)(8*sigLen));
	}

	public static void install(final byte[] bArray, final short bOffset, final byte bLength) 
	{
		new Signature_CSR().register(bArray, (short) (bOffset + 1), bArray[bOffset]);
	}

	public void process(final APDU apdu)
	{
		if (selectingApplet())
		{
			return;
		}

		final byte[] buf = apdu.getBuffer();
		short dataLen = (short)(buf[ISO7816.OFFSET_LC] &0x00FF);
		short readCount = apdu.setIncomingAndReceive();
		
		buf_temp = JCSystem.makeTransientByteArray(dataLen, JCSystem.CLEAR_ON_RESET);
		
		while(dataLen > 0) {
			dataLen -= readCount;
			readCount = apdu.receiveBytes(ISO7816.OFFSET_CDATA);
		}
		
		for(short i = 0; i< buf_temp.length; i++) {
			final short j = (short)(i+5);
			buf_temp[i] = (byte)(buf[j]);
		}

		switch (buf[ISO7816.OFFSET_INS])
		{
	/*
		GET DATA
		Certificate Request Information's length is more than 256 bytes
	*/			
		case INS_SEND_TOTAL_LENGTH:
			buf_totalLen = JCSystem.makeTransientByteArray((short)2, JCSystem.CLEAR_ON_RESET);
			buf_totalLen[0] = buf_temp[0];
			buf_totalLen[1] = buf_temp[1];
			
			totalLen = (short)0;
			totalLen |= (short)(buf_totalLen[0]&0xFF) << 8;
			totalLen |= (short)(buf_totalLen[1]&0xFF);
			
			data = new byte[totalLen];
			
			break;
		case INS_SEND_DATA_START:
			length = (short)buf_temp.length;
			for(short i = 0; i < (short)buf_temp.length; i++) {
				data[i] = buf_temp[i];
			}
			break;
		case INS_SEND_DATA_END:
			for(short i = 0; i< (short)buf_temp.length; i++) {
				data[i + length] = buf_temp[i];
			}
			break;
		
	/*
		GENERATE KEY, SIGN & VERIFY
	*/
		case INS_GENKEY:
			
			rsaPrivate = null;
			rsaPublic = null;
			
			// Generate key pair
			keyPair.genKeyPair();
			rsaPrivate = (RSAPrivateKey)keyPair.getPrivate();
			rsaPublic = (RSAPublicKey)keyPair.getPublic();
			
			// Get properties of public key
			exp = new byte[(short)(8*sigLen)];
			exp_len = rsaPublic.getExponent(exp, (short)2);
			Util.setShort(exp, (short)0, exp_len);
			
			mod = new byte[(short)(8*sigLen)];
			mod_len = rsaPublic.getModulus(mod, (short)2);
			Util.setShort(mod, (short)0, mod_len);
			break;	
			
		case INS_SIGN:
			rsaSig.init(rsaPrivate, Signature.MODE_SIGN);
			short sig_buffer_len = rsaSig.sign(data, (short)0, (short)data.length, sig_buffer, (short)0);
			
			apdu.setOutgoing();
			apdu.setOutgoingLength(sig_buffer_len);
			apdu.sendBytesLong(sig_buffer,(short)0, sig_buffer_len);
			break;
			
		case INS_VERIFY:
			rsaSig.init(rsaPublic, Signature.MODE_VERIFY);
			
			// in this example, get sig_buffer from function INS_SIGN because sig_buffer
			// in the system, client send plain text with sig_buffer to verify Signature
			final boolean result = rsaSig.verify(buf_temp, (short)0, (short)buf_temp.length, sig_buffer, (short)0, sigLen);
			buf[(short)0] = result? (byte)1 : (byte)0;
			apdu.setOutgoingAndSend((short)0, (short)1);
			break;
			
		case INS_SIGN_BUF:
			rsaSig.init(rsaPrivate, Signature.MODE_SIGN);
			short sig_buf_len = rsaSig.sign(buf_temp, (short)0, (short)buf_temp.length, sig_buffer, (short)0);
			
			apdu.setOutgoing();
			apdu.setOutgoingLength(sig_buf_len);
			apdu.sendBytesLong(sig_buffer,(short)0, sig_buf_len);
			break;
			
	/*
		GET PUBLIC KEY
	*/
		case INS_GET_EXP:
			apdu.setOutgoing();
			apdu.setOutgoingLength((short)(exp_len));
			apdu.sendBytesLong(exp, (short)2, (short)(exp_len));
			break;
		case INS_GET_MOD_START:
			apdu.setOutgoing();
			apdu.setOutgoingLength((short)(mod_len/2));
			apdu.sendBytesLong(mod, (short)2, (short)(mod_len/2));
			break;
		case INS_GET_MOD_END:
			apdu.setOutgoing();
			apdu.setOutgoingLength((short)(mod_len/2));
			apdu.sendBytesLong(mod, (short)(2 + mod_len/2), (short)(mod_len/2));
			break;
		
		default:
			ISOException.throwIt(ISO7816.SW_INS_NOT_SUPPORTED);
			
	/*
		GET DATA
	*/
		case INS_GET_TOTAL_LENGTH:
			apdu.setOutgoing();
			apdu.setOutgoingLength((short)buf_totalLen.length);
			apdu.sendBytesLong(buf_totalLen, (short)0, (short)buf_totalLen.length);
			break;
		case INS_GET_DATA_START:
			apdu.setOutgoing();
			apdu.setOutgoingLength(length);
			apdu.sendBytesLong(data, (short)0, length);
			break;
			
		case INS_GET_DATA_END:
			apdu.setOutgoing();
			apdu.setOutgoingLength((short)(totalLen - length));
			apdu.sendBytesLong(data, (short)length, (short)(totalLen - length));
			break;
		}
	}
}
