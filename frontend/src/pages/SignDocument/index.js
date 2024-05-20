import './index.css'
import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { FaFileSignature } from 'react-icons/fa'
import WebViewer from '@pdftron/webviewer'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../firebase/firebase'
import { updateDocument } from '../../app/document'
import { useNavigate } from 'react-router-dom'

const SignDocument = () => {
    const navigate = useNavigate()

    const [instance, setInstance] = useState(null)
    const [annotationManager, setAnnotationManager] = useState(null)

    const [fieldName, setFieldName] = useState('')
    const [password, setPassword] = useState('')
    const [docInfo, setDocInfo] = useState({
        location: '',
        reason: '',
        contact: ''
    })
    const handleChange = (e) => {
        setDocInfo((prev) => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
    }

    const [cert, setCert] = useState(null)

    const user = useSelector(state => state.data.user.user)
    const docToSign = useSelector(state => state.data.doc.docToSign)
    
    const pfxFile = useRef(null)
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
                                if(annotation.fieldName.startsWith(user.email)) {
                                    if(annotation instanceof Annotations.SignatureWidgetAnnotation) {
                                        setFieldName(annotation.fieldName)
                                    }
                                }
                                else {
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
        const { PDFNet, documentViewer } = instance.Core
        const doc = await documentViewer.getDocument().getPDFDoc()

        // Get signature field for signing
        const field = await doc.getField(fieldName)
        const signatureField = await PDFNet.DigitalSignatureField.createFromField(field)

        // Update xfdf
        const xfdf = await annotationManager.exportAnnotations({links: false, widgets: true})
        await updateDocument(docToSign.docId, user.email, xfdf)
        const fdfDoc = await PDFNet.FDFDoc.createFromXFDF(xfdf)

        // Sign the document
        const url = URL.createObjectURL(pfxFile.current.files[0])
        await signatureField.signOnNextSaveFromURL(url, password)
        .then(async () => {
            await signatureField.setLocation(docInfo.location)
            await signatureField.setReason(docInfo.reason)
            await signatureField.setContactInfo(docInfo.contact)

            await doc.fdfMerge(fdfDoc)

            // Convert the document to blob
            const docBuf = await doc.saveMemoryBuffer(PDFNet.SDFDoc.SaveOptions.e_incremental)
            const blob = new Blob([docBuf], {type: 'application/pdf'})
            
            // Update the document
            const docRef = ref(storage, docToSign.reference)
            uploadBytes(docRef, blob).then((snapshot) => {
                console.log('Document signed', snapshot)
            })

            navigate('/')
        })
        .catch((error) => {
            alert('Sign failed!')
            console.log(error)
        })
    }

    // Connect to plugin
    const socket = new WebSocket('ws://localhost:4444')
    socket.onopen = () => {
        console.log('Connected to server')
    }
    socket.onmessage = (event) => {
        console.log(event.data)
        setCert(event.data)
    }
    socket.onerror = (error) => {
        console.log(`Error: ${error}`)
    }
    async function getCertificate() {
        socket.send('get_certificate')
    }

    const signDocumentWithCard = async () => {
        await getCertificate()
        console.log(cert)

        const { PDFNet, documentViewer } = instance.Core
        const doc = await documentViewer.getDocument().getPDFDoc()

        // // Get signature field for signing
        const signatureField = await doc.createDigitalSignatureField(fieldName)
        console.log(PDFNet.DigitalSignatureField.SubFilterType.e_ETSI_CAdES_detached)
    
        // // Create a digital signature dictionary inside the digital signature field
        await signatureField.createSigDictForCustomSigning(
            'Adobe.PPKLite',
            PDFNet.DigitalSignatureField.SubFilterType.e_ETSI_CAdES_detached,
            7500,
        )
        await doc.saveMemoryBuffer(PDFNet.SDFDoc.SaveOptions.e_incremental)

        // // Update xfdf
        // const xfdf = await annotationManager.exportAnnotations({links: false, widgets: true})
        // await updateDocument(docToSign.docId, user.email, xfdf)
        // const fdfDoc = await PDFNet.FDFDoc.createFromXFDF(xfdf)

        // // Sign the document
        // const pdf_digest = await signatureField.calculateDigest(PDFNet.DigestAlgorithm.e_SHA256)
        // console.log(pdf_digest)
        // const signer_cert = await PDFNet.X509Certificate.createFromURL(cert.toString())
        // console.log(signer_cert)
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
                                    <input type="text" class="form-control" id="location" placeholder="Ex: Hanoi, Vietnam"
                                        value={docInfo.location}
                                        onChange={handleChange} />
                                </div>
                                <div class="mb-3">
                                    <label for="reason" class="form-label">Reason</label>
                                    <input type="text" class="form-control" id="reason" placeholder="Ex: Sign for testing"
                                        value={docInfo.reason}
                                        onChange={handleChange} />
                                </div>
                                <div class="mb-3">
                                    <label for="contact" class="form-label">Contact Information</label>
                                    <input type="text" class="form-control" id="contact" placeholder="Ex: example@gmail.com"
                                        value={docInfo.contact}
                                        onChange={handleChange} />
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
            
            <button type='button' className='btn btn-primary btn-lg' onClick={signDocumentWithCard}></button>

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
                        <input class="form-control form-control-sm" id="formFileSm" type="file" accept='.pfx' ref={pfxFile} />
                    </div>
                    <div class="mb-3">
                        <label for="inputPassword" class="form-label">Password</label>
                        <input type="password" class="form-control" id="inputPassword" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onClick={signDocument} data-bs-dismiss='modal'>Sign Now!</button>
                </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default SignDocument