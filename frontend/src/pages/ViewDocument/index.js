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
            const { documentViewer } = instance.Core
            instance.UI.setToolbarGroup('toolbarGroup-View')
            setInstance(instance)
            const URL = (await getDownloadURL(ref(storage, docToView.reference))).toString()
            console.log(URL)
            documentViewer.loadDocument(URL)
        })
    })

    return (
        <div className='view-page'>
            <div className='view-sidebar'>
                <h1>View Document</h1>
            </div>
            <div className='view-content'>
                <div className='webviewer' ref={viewer} style={{height: '96vh'}}></div>
            </div>
        </div>
    )
}

export default ViewDocument;
