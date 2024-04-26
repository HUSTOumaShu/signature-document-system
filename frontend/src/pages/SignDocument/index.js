import './index.css'
import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { FaFileSignature } from 'react-icons/fa'
import WebViewer from '@pdftron/webviewer'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../../firebase/firebase'

const SignDocument = () => {
    const [instance, setInstance] = useState(null)
    const [annotationManager, setAnnotationManager] = useState(null)
    const [annotationPosition, setAnnotationPosition] = useState(0)

    const user = useSelector(state => state.data.user.user)
    const docToSign = useSelector(state => state.data.doc.docToSign)
    
    const viewer = useRef(null)

    useEffect(() => {
        WebViewer(
            {
                fullAPI: true,
                path: '/webviewer/lib',
                licenseKey:
                    'demo:1711275376590:7f0c56cd030000000060525107bc85911c3dfb4a55f44d650263ca8942',
                disabledElements: [
                    'ribbons',
                    'toggleNotesButton',
                    'searchButton',
                    'menuButton',
                    'rubberStampToolGroupButton',
                    'stampToolGroupButton',
                    'fileAttachmentToolGroupButton',
                    'calloutToolGroupButton',
                    'undo',
                    'redo',
                    'eraserToolButton'
                ]
            },
            viewer.current,
            ).then(async instance => {
                setInstance(instance)
                const {documentViewer, annotationManager, Annotations} = instance.Core
                setAnnotationManager(annotationManager)

                instance.UI.setToolbarGroup('toolbarGroup-Insert')

                // load the document
                const URL = (await getDownloadURL(ref(storage, docToSign.reference))).toString()
                documentViewer.loadDocument(URL)

                const normalStyles = (widget) => {
                    if(widget instanceof Annotations.TextWidgetAnnotation) {
                        return {
                            'background-color': '#a5c7ff',
                            color: 'white',
                        }
                    } else if(widget instanceof Annotations.SignatureWidgetAnnotation) {
                        return {
                            'border': '1px solid #a5c7ff',
                        }
                    }
                }

                annotationManager.addEventListener('annotationChanged', async (annotations, action, imported) => {
                    if(imported && action === 'add') {
                        annotations.forEach(annotation => {
                            if(annotation instanceof Annotations.WidgetAnnotation) {
                                Annotations.WidgetAnnotation.getCustomStyles = normalStyles
                                if(!annotation.fieldName.startsWith(user.email)) {
                                    annotation.Hidden = true
                                    annotation.Listable = false
                                }
                            }
                        })
                    }
                })
            });
    }, [docToSign, user])

    const signDocument = async () => {
        const annotations = await annotationManager.getAnnotationsList()
        
        const xfdf = await annotationManager.exportAnnotations({links: false, widgets: true})
        console.log(xfdf)
    }

    return (
        <div className='sign-page'>
            <div className='sign-sidebar'>
                <h1>Sign Document</h1>
                <div className='sign-fields'>
                    <div class="accordion accordion-flush" id="accordionFlush">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                <strong>Set Information</strong>
                            </button>
                        </h2>

                        <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                            <div class="accordion-body">
                                <div class="mb-3">
                                    <label for="location" class="form-label">Location</label>
                                    <input type="text" class="form-control" id="location" placeholder="Ex: Hanoi, Vietnam" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="reason" class="form-label">Reason</label>
                                        <input type="text" class="form-control" id="reason" placeholder="Ex: Sign for testing" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="contact" class="form-label">Contact Information</label>
                                        <input type="text" class="form-control" id="contact" placeholder="Ex: example@gmail.com" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                    
                </div>

                <div className='sign-actions'>
                    <div>Apply Fields</div>
                    <button type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal"
                    >Sign Now &nbsp; <FaFileSignature  /></button>
                </div>
            </div>
            <div className='sign-viewer'>
                <div className='webviewer' ref={viewer} style={{height: '96vh'}}></div>
            </div>

            {/* Modal */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Information Signature</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="formFileSm" class="form-label">Add Digital ID file</label>
                            <input class="form-control form-control-sm" id="formFileSm" type="file" accept='.pfx' />
                        </div>
                        <div class="mb-3">
                            <label for="inputPassword" class="form-label">Password</label>
                            <input type="password" class="form-control" id="inputPassword" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onClick={signDocument}>Sign Now!</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignDocument