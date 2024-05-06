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
    console.log(docToView)

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
            const { documentViewer, PDFNet, annotationManager } = instance.Core
            instance.UI.setToolbarGroup('toolbarGroup-View')
            
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

    const detail = async () => {
        console.log(instance)
        const { documentViewer } = instance.Core
        const doc = documentViewer.getDocument()
        // const signatures = await doc.getDigitalSignatureFieldIteratorBegin()
        console.log(doc)
    }

    return (
        <div className='view-page'>
            <div className='view-sidebar'>
                <h1>View Document</h1>
                <button onClick={detail}>Detail</button>
            </div>
            <div className='view-content'>
                <div className='webviewer' ref={viewer} style={{height: '96vh'}}></div>
            </div>
        </div>
    )
}

export default ViewDocument;
