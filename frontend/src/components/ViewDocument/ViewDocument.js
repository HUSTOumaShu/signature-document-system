import { useEffect, useRef } from 'react';
import WebViewer from '@pdftron/webviewer';

const ViewDocument = () => {
    const viewer = useRef(null);

    useEffect(() => {
        WebViewer(
            {
                fullAPI: true,
                path: '/webviewer/lib',
                licenseKey:
                    'demo:1711275376590:7f0c56cd030000000060525107bc85911c3dfb4a55f44d650263ca8942',
                initialDoc: '/files/sdms_system.pdf',
            },
            viewer.current,
            ).then(instance => {
                const {PDFNet, documentViewer} = instance.Core;

                documentViewer.addEventListener('documentLoaded', async () => {
                    await PDFNet.initialize();
                    const doc = documentViewer.getDocument().getPDFDoc();

                    await PDFNet.runWithCleanup(async() => {

                        // Find certificate field
                        const foundCertificationField = await (await doc).getField('SignatureFormField 1');
                        const certificateSigField = await PDFNet.DigitalSignatureField.createFromField(foundCertificationField);

                        await certificateSigField.signOnNextSaveFromURL('/files/ESPSigner.pfx', 'ejbca');
                        const docBuf = (await doc).saveMemoryBuffer(PDFNet.SDFDoc.SaveOptions.e_incremental);
                        return docBuf;
                    })
                })
                
            }, []);
    });
    return (
        <div className="MyComponent">
            <div
                className="webviewer"
                ref={viewer}
                style={{ height: '100vh' }}
            ></div>
        </div>
    );
};

export default ViewDocument;
