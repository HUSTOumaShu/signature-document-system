import React, { useEffect, useRef, useState } from 'react';
import './index.css'
import { useDispatch, useSelector } from 'react-redux';
import WebViewer from '@pdftron/webviewer';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../firebase/firebase';

const ViewDocument = () => {
    const docToView = useSelector(state => state.data.doc.docToView)
    const viewer = useRef(null)
    const dispatch = useDispatch()

    const [instance, setInstance] = useState(null)

    useEffect(() => {
        WebViewer({
            fullAPI: true,
            path: '/webviewer/lib',
            licenseKey:
                    'demo:1711275376590:7f0c56cd030000000060525107bc85911c3dfb4a55f44d650263ca8942',
            disabledElements: [
                'ribbonButton',
                'toggleNotesButton',
                'contextMenuPopup',
            ]
        }, viewer.current)
        .then(async (instance) => {
            setInstance(instance)
            const { documentViewer, annotationManager } = instance.Core
            instance.UI.setToolbarGroup('toolbarGroup-View')
            instance.UI.openElements(['signaturePanel']);

            // Add trusted root certificate
            
            const cert_url = (await getDownloadURL(ref(storage, 'trustedCertificate/SubCA.cacert.pem'))).toString()
            const response = await fetch(cert_url)
            const cert = await (await response.blob()).arrayBuffer()
            console.log(cert)

            instance.UI.VerificationOptions.addTrustedCertificates([cert_url])
            console.log(instance.UI)
            
            const URL = (await getDownloadURL(ref(storage, docToView.reference))).toString()
            documentViewer.loadDocument(URL)

            annotationManager.enableReadOnlyMode()
            
            // Verify Certificate
            // const digitalSignatures = await doc.getDigitalSignatureFieldIteratorBegin()
            // console.log(digitalSignatures)

            // Add trusted certificate
            // const opts = PDFNet.VerificationOptions.create(PDFNet.VerificationOptions.SecurityLevel.e_compatibility_and_archiving)
            // (await opts).addTrustedCertificateFromURL(

            // )

        })
    }, [dispatch, docToView.reference])

    const verifySignature = async () => {
        const { PDFNet, documentViewer } = instance.Core
        const { VerificationOptions } = instance.UI
        const doc = await documentViewer.getDocument().getPDFDoc()

        console.log(VerificationOptions)
        // Add trusted certificate
        VerificationOptions.addTrustedCertificates('https://ssl-tools.net/certificates/247106a405b288a46e70a0262717162d0903e734.pem')
        console.log(VerificationOptions)

        // Get signatures from document
        const signatures = await doc.getDigitalSignatureFieldIteratorBegin()
        let verification_status = true
        for(; signatures.hasNext(); signatures.next()) {
            const sig = await signatures.current()
            const verification_result = await sig.verify()
            
            const result = await verification_result.getTrustVerificationResult()
            console.log(await result.getResultString())
            const cert_path = await result.getCertPath()
            console.log(cert_path)
            for(let i = 0; i < await cert_path.length; i++) {
                console.log(await (await cert_path.get(i)).getSubjectName())
            }

            if(await verification_result.getVerificationStatus()) {
                console.log('Signature verified', (await (await sig.getSDFObj()).getObjNum()))
            } else {
                verification_status = false
                console.log('Signature not verified')
            }

            switch(await verification_result.getDigestAlgorithm()) {
                case PDFNet.DigestAlgorithm.Type.e_SHA1:
                    console.log('Digest Algorithm: SHA-1')
                    break
                case PDFNet.DigestAlgorithm.Type.e_SHA256:
                    console.log('Digest Algorithm: SHA-256')
                    break
                case PDFNet.DigestAlgorithm.Type.e_SHA384:
                    console.log('Digest Algorithm: SHA-384')
                    break
                case PDFNet.DigestAlgorithm.Type.e_SHA512:
                    console.log('Digest Algorithm: SHA-512')
                    break
                default:
                    console.log('Digest Algorithm: Unknown')
                    break
            }
        }

        console.log(signatures)
    }

    return (
        <div className='view-page'>
            <div className='view-sidebar'>
                <h1>View Document</h1>
                <div className='view-info'>
                    <div className='doc-header'>
                        <h2><strong>Document Information</strong></h2>
                        <h4><strong>Title: </strong>{docToView.title}</h4>
                        <span>From: {docToView.email}</span>
                        <span>Requested Time: {docToView.requestedTime.toDate().toUTCString()}</span>
                        <span>Signed Time: {docToView.signedTime.toDate().toUTCString()}</span>
                    </div>
                    <div className='doc-info'>
                        info
                    </div>
                </div>
                <button onClick={verifySignature}>Detail</button>
            </div>
            <div className='view-content'>
                <div className='webviewer' ref={viewer} style={{height: '96vh'}}></div>
            </div>
        </div>
    )
}

export default ViewDocument;
