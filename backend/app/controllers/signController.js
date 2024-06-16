const fs = require('fs');
const forge = require('node-forge');
const crypto = require('crypto');

// exports.signData = async (req, res, next) => {
//     try {
//         const {email, data} = req.body;
//         const p12FilePath = './files/' + email + '.p12'
//         const p12Asn1 = forge.asn1.fromDer(fs.readFileSync(p12FilePath, 'binary'));
//         const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, 'ejbca');

//         let privateKey, certificate;
//         let certificates = []
//         for (const safeContents of p12.safeContents) {
//             for (const safeBag of safeContents.safeBags) {
//                 if (safeBag.type === forge.pki.oids.certBag) {
//                     certificates.push(safeBag.cert);
//                 } else if (safeBag.type === forge.pki.oids.pkcs8ShroudedKeyBag) {
//                     privateKey = safeBag.key;
//                 }
//             }
//         }
//         const publicKey = forge.pki.setRsaPublicKey(privateKey.n, privateKey.e);

//         // Get certificate
//         certificate = certificates[0];
//         const derBytes = forge.asn1.toDer(forge.pki.certificateToAsn1(certificate)).getBytes();
//         const base64Cert = forge.util.encode64(derBytes);

//         // Sign data
//         const uint8Array = new Uint8Array(Object.values(data));
//         let hexString = Buffer.from(uint8Array).toString('hex');
//         console.log('Hex String: ', hexString);
//         let md = forge.md.sha256.create();
//         md.update(uint8Array, 'utf8');
//         console.log('Digest: ', md.digest().toHex());
//         let signature = privateKey.sign(md);
//         console.log('Signature: ', forge.util.encode64(signature));

//         // Verify data
//         let mdVerify = forge.md.sha256.create();
//         mdVerify.update(hexString);
//         console.log('verfied: ', publicKey.verify(mdVerify.digest().getBytes(), signature));
//         res.json({success: true, signature: forge.util.encode64(signature), certificate: base64Cert});
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({success: false, message: 'Server Error'});
//     }
// }

exports.signData = async (req, res, next) => {
    try {
        const {email, data} = req.body;
        const p12FilePath = './files/' + email + '.p12'
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
        const privateKey = fs.readFileSync('./files/privatekey.key')
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