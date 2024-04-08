const {PDFNet} = require('@pdftron/pdfnet-node')

export const signPDF = async (req, res) => {
    const inputPath = req.body.inputPath;
    
}

export const runDigitalSignature = async (req, res) => {
    const inputPath = req.body.inputPath;
    const publicKeyPath = req.body.publicKeyPath;
    const doc = await PDFNet.PDFDoc.createFromFilePath(inputPath);
    doc.initSecurityHandler();
    const opts = await PDFNet.VerificationOptions.create(PDFNet.VerificationOptions.SecurityLevel.e_compatibility_and_archiving);

    await opts.addTrustedCertificateUString(publicKeyPath,
        PDFNet.VerificationOptions.CertificateTrustFlag.e_default_trust + PDFNet.VerificationOptions.CertificateTrustFlag.e_certification_trust);

    const result = await doc.verifySignedDigitalSignatures(opts);
    switch(result) {
        case PDFNet.PDFDoc.SignaturesVerificationStatus.e_unsigned:
            res.json({ message: 'unsigned' });
        case PDFNet.PDFDoc.SignaturesVerificationStatus.e_failure:
            res.json({ message: 'failure' });
        case PDFNet.PDFDoc.SignaturesVerificationStatus.e_untrusted:
            res.json({ message: 'untrusted' });
        case PDFNet.PDFDoc.SignaturesVerificationStatus.e_unsupported:
            res.json({ message: 'unsupported' });
        case PDFNet.PDFDoc.SignaturesVerificationStatus.e_verified:
            res.json({ message: 'verified' });
        return true;
    }
    return false;
}

