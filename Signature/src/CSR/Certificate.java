package CSR ;

import javacard.framework.APDU;
import javacard.framework.Applet;
import javacard.framework.ISO7816;
import javacard.framework.ISOException;
import javacard.framework.JCSystem;

public class Certificate extends Applet
{
	
	private static final byte INS_SEND_CERT_LEN = (byte)0x00;
	private static final byte INS_SEND_CERT = (byte)0x01;
	private static final byte INS_REMOVE_OLD_CERT = (byte)0x02;
	
	private static final byte INS_GET_CERT_LEN = (byte)0x10;
	private static final byte INS_GET_CERT = (byte)0x11;
	
	private byte[] buf_temp;
	private final byte[] data, buf_totalLen;
	private short totalLen, numOfPacket;
	private boolean isDivided;
	
	private Certificate() {
		buf_totalLen = new byte[2];
		data = new byte[2048];
	}
 
	public static void install(byte[] bArray, short bOffset, byte bLength) 
	{
		new Certificate().register(bArray, (short) (bOffset + 1), bArray[bOffset]);
	}

	public void process(APDU apdu)
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
		case INS_REMOVE_OLD_CERT:
			
			break;
		case INS_SEND_CERT_LEN:
			buf_totalLen[0] = buf_temp[0];
			buf_totalLen[1] = buf_temp[1];
			
			totalLen = (short)0;
			totalLen |= (short)(buf_totalLen[0]&0xFF) << 8;
			totalLen |= (short)(buf_totalLen[1]&0xFF);
			
			numOfPacket = (short)(totalLen/250);
			isDivided = (numOfPacket*250 == totalLen);
			if(!isDivided) numOfPacket++;
			
			break;
		case INS_SEND_CERT:
			short index = (short)0;
			index |= (short)(buf_temp[0]&0xFF);	// the index of packet received
			for(short i = 1; i < (short)buf_temp.length; i++) {
				data[(short)(i + index*250 - 1)] = buf_temp[i];
			}
			break;
		case INS_GET_CERT_LEN:
			apdu.setOutgoing();
			apdu.setOutgoingLength((short)2);
			apdu.sendBytesLong(buf_totalLen, (short)0, (short)2);
			break;
		case INS_GET_CERT:
			short index_get = (short)0;
			index_get |= (short)(buf_temp[0]&0xFF);
			if(index_get < numOfPacket-1) {
				apdu.setOutgoing();
				apdu.setOutgoingLength((short)250);
				apdu.sendBytesLong(data, (short)(index_get*250), (short)250);
			}
			else {
				short length = (short)(totalLen - 250*(numOfPacket-1));
				apdu.setOutgoing();
				apdu.setOutgoingLength(length);
				apdu.sendBytesLong(data, (short)(index_get*250), length);
			}
			break;
		default:
			ISOException.throwIt(ISO7816.SW_INS_NOT_SUPPORTED);
		}
	}

}
