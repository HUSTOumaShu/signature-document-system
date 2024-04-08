const signPDF = async (doc, signatureField, pfxFile, password) => {
    const { PDFNet } = instance.Core;
    const foundCertificationField = await doc.getField(signatureField);
    const certificateSigField = await PDFNet.DigitalSignatureField.createFromField(foundCertificationField);
    await certificateSigField.signOnNextSaveFromURL(pfxFile, password);
    const docBuf = await doc.saveMemoryBuffer(PDFNet.SDFDoc.SaveOptions.e_incremental);
    return docBuf;
}