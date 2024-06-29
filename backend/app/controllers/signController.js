const fs = require('fs');
const forge = require('node-forge');
const crypto = require('crypto');

exports.signData = async (req, res, next) => {
    try {
        const {email, data} = req.body;
        const p12FilePath = './hsm/' + email + '.p12'
        const privateKeyPath = './hsm/' + email + '.key'
        const p12Asn1 = forge.asn1.fromDer(fs.readFileSync(p12FilePath, 'binary'));
        const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, 'ejbca');

        let certificate;
        let certificates = []
        for (const safeContents of p12.safeContents) {
            for (const safeBag of safeContents.safeBags) {
                if (safeBag.type === forge.pki.oids.certBag) {
                    certificates.push(safeBag.cert);
                }
            }
        }
        const privateKey = fs.readFileSync(privateKeyPath)
        const publicKey = forge.pki.setRsaPublicKey(privateKey.n, privateKey.e);

        // Get certificate
        certificate = certificates[0];
        const derBytes = forge.asn1.toDer(forge.pki.certificateToAsn1(certificate)).getBytes();
        const base64Cert = forge.util.encode64(derBytes);

        // Sign data
        const uint8Array = new Uint8Array(Object.values(data));
        const signature = crypto.sign("SHA256", uint8Array, privateKey);
        const signature_value = new Uint8Array(signature)
        console.log(typeof signature_value, signature_value)

        res.json({success: true, signature: signature_value, certificate: base64Cert});
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Server Error'});
    }
}