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
    console.log(docToView)

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
            const trust_url = (await getDownloadURL(ref(storage, 'trustedCertificate/CertExchange.fdf'))).toString()
            const response = await fetch(trust_url)
            const trustCertList = await response.arrayBuffer();
            instance.UI.VerificationOptions.loadTrustList(trustCertList)
            
            // Load document
            const URL = (await getDownloadURL(ref(storage, docToView.reference))).toString()
            documentViewer.loadDocument(URL)
            annotationManager.enableReadOnlyMode()
        })
    }, [dispatch, docToView.reference])

    return (
        <div className='view-page'>
            <div className='view-sidebar'>
                <h1>View Document</h1>
                <div className='view-info'>
                    <div className='doc-header'>
                        <h2><strong>Document Information</strong></h2>
                        <h4><strong>Title: </strong>{docToView.title}</h4>
                        <span><strong>From:</strong> {docToView.email}</span>
                        <span><strong>Requested Time:</strong> {docToView.requestedTime.toDate().toUTCString()}</span>
                        {docToView.isVoided ? (
                            <>
                                <span><strong>Voided by:</strong> {docToView.voidedBy}</span>
                                <span><strong>Voided Time:</strong> {docToView.voidedTime.toDate().toUTCString()}</span>
                                <span><strong>Reason:</strong> {docToView.reason}</span>
                            </>
                        ) : (
                            <>
                                <span>Signed by: {docToView.email} </span>
                                <span>Signed Time: {docToView.signedTime.toDate().toUTCString()}</span>
                            </>
                        )}
                        
                    </div>
                    <div className='doc-info'>
                        info
                    </div>
                </div>
            </div>
            <div className='view-content'>
                <div className='webviewer' ref={viewer} style={{height: '96vh'}}></div>
            </div>
        </div>
    )
}

export default ViewDocument;
