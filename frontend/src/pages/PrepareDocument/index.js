import './index.css'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import WebViewer from '@pdftron/webviewer'
import { storage } from '../../firebase/firebase'
import { addDocumentToSign } from '../../app/document'
import {resetSignee} from '../../app/features/assignSlice'
import { FaSignature } from 'react-icons/fa'
import { BsCalendar2DateFill } from 'react-icons/bs'
import { BsFillSendArrowUpFill } from 'react-icons/bs'

const PrepareDocument = () => {
    const [instance, setInstance] = useState(null)
    const [dropPoint, setDropPoint] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const assignees = useSelector(state => state.data.assign.signees)
    console.log(assignees)
    const assigneesValues = assignees?.map(assignee => {
        return {value: assignee.email, label: assignee.name}
    })
    console.log(assigneesValues)
    let initialAssignee = assigneesValues?.length > 0 ? assigneesValues[0].value : ''
    const [assignee, setAssignee] = useState(initialAssignee)

    const user = useSelector(state => state.data.user.user)
    const viewer = useRef(null)
    const filePicker = useRef(null)
    console.log(instance)

    useEffect(() => {
        WebViewer(
            {
                path: '/webviewer/lib',
                disabledElements: [
                    'ribbons',
                    'toggleNotesButton',
                    'searchButton',
                    'menuButton',
                ],
            },
            viewer.current
        ).then((instance) => {
            setInstance(instance)
            const {iframeWindow} = instance.UI
            instance.UI.setToolbarGroup('toolbarGroup-View')

            const iframeDoc = iframeWindow?.document.body;
            iframeDoc.addEventListener('dragover', dragOver)
            iframeDoc.addEventListener('drop', (e) => drop(e, instance))
            
            filePicker.current.onChange = (e) => {
                const file = e.target.files[0]
                if(file) {
                    instance.UI.loadDocument(file)
                }
            }
        })
    }, [])

    const applyFields = async () => {
        const { Annotations, documentViewer } = instance.Core
        const annotationManager = documentViewer.getAnnotationManager()
        const fieldManager = annotationManager.getFieldManager()
        const annotationList = annotationManager.getAnnotationList()
        const annotsToDelete = []
        const annotsToDraw = []
        
        await Promise.all(annotationList.map(async (annot, index) => {
            let inputAnnot;
            let field;
            if (typeof annot.custom !== 'undefined') {
                if(annot.custom.type === 'SIGNATURE') {
                    field = new Annotations.Forms.Field(annot.getContents() + Date.now() + index, {
                        type: 'Sig',
                    })
                    inputAnnot = new Annotations.SignatureWidgetAnnotation(field, {
                        appearance: '_DEFAULT',
                        appearances: {
                            _DEFAULT: {
                                Normal: {
                                    data: 
                                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuMWMqnEsAAAANSURBVBhXY/j//z8DAAj8Av6IXwbgAAAAAElFTkSuQmCC',
                                    offset: {
                                        x: 100,
                                        y: 100,
                                    }
                                }
                            }
                        }
                    })

                } else if(annot.custom.type === 'DATE') {
                    field = new Annotations.Forms.Field(annot.getContents() + Date.now() + index, {
                        type: 'Tx',
                        value: 'm-d-yyyy',
                        actions: {
                            F: [
                                {
                                    name: 'JavaScript',
                                    javascript: 'AFDate_FormatEx("m-d-yyyy")'
                                }
                            ],
                            K: [
                                {
                                    name: 'JavaScript',
                                    javascript: 'AFDate_FormatEx("m-d-yyyy")'
                                }
                            ]
                        }
                    })
                    inputAnnot = new Annotations.DatePickerWidgetAnnotation(field)

                } else {
                    annotationManager.deleteAnnotation(annot, false, true)
                    return;
                }
            } else {
                return;
            }

            // set position
            inputAnnot.PageNumber = annot.getPageNumber()
            inputAnnot.X = annot.getX()
            inputAnnot.Y = annot.getY()
            inputAnnot.rotation = annot.Rotation
            if(annot.Rotation === 0 || annot.Rotation === 180) {
                inputAnnot.Width = annot.getWidth()
                inputAnnot.Height = annot.getHeight()
            } else {
                inputAnnot.Width = annot.getHeight()
                inputAnnot.Height = annot.getWidth()
            }

            // delete original annotation
            annotsToDelete.push(annot)
            Annotations.WidgetAnnotation.getCustomStyles = (widget) => {
                if(widget instanceof Annotations.SignatureWidgetAnnotation) {
                    return {
                        border: '1px solid #a5c7ff'
                    }
                }
            }
            Annotations.WidgetAnnotation.getCustomStyles(inputAnnot)

            // draw the annotation the viewer
            annotationManager.addAnnotation(inputAnnot)
            fieldManager.addField(field)
            annotsToDraw.push(inputAnnot)
        }))
        // delete old annotations
        annotationManager.deleteAnnotations(annotsToDelete, null, true)

        // refresh viewer
        await annotationManager.drawAnnotationsFromList(annotsToDraw)
        await uploadForSigning()
    }

    const addField = (type, point = {}, name = '', value = '', flag = {}) => {
        const {documentViewer, Annotations} = instance.Core
        const annotationManager = documentViewer.getAnnotationManager()
        const doc = documentViewer.getDocument()
        const displayMode = documentViewer.getDisplayModeManager().getDisplayMode()
        const page = displayMode.getSelectedPages(point, point)
        if(!!point.x && page.first == null) {
            return;
        }
        const page_idx = page.first !== null ? page.first : documentViewer.getCurrentPage()
        const page_info = doc.getPageInfo(page_idx)
        const page_point = displayMode.windowToPage(point, page_idx)
        const zoom = documentViewer.getZoom()

        var textAnnot = new Annotations.FreeTextAnnotation()
        textAnnot.PageNumber = page_idx
        const rotation = documentViewer.getCompleteRotation(page_idx) * 90
        textAnnot.Rotation = rotation
        if(rotation === 270 || rotation === 90) {
            textAnnot.Width = 50.0 / zoom
            textAnnot.Height = 250.0 / zoom
        } else {
            textAnnot.Width = 250.0 / zoom
            textAnnot.Height = 50.0 / zoom
        }
        textAnnot.X = (page_point.x || page_info.width / 2) - textAnnot.Width / 2
        textAnnot.Y = (page_point.y || page_info.height / 2) - textAnnot.Height / 2
        
        textAnnot.setPadding(new Annotations.Rect(0, 0, 0, 0))
        textAnnot.custom = {
            type,
            value,
            flag,
            name: `${assignee}_${type}_`
        }

        // set the type
        textAnnot.setContents(textAnnot.custom.name)
        textAnnot.fontSize = '' + 20 / zoom + 'px'
        textAnnot.fillColor = new Annotations.Color(211, 211, 211, 0.5)
        textAnnot.TextColor = new Annotations.Color(0, 165, 228)
        textAnnot.StrokeThickness = 1
        textAnnot.StrokeColor = new Annotations.Color(0, 165, 228)
        textAnnot.TextAlign = 'center'

        textAnnot.Author = annotationManager.getCurrentUser()

        annotationManager.deselectAllAnnotations()
        annotationManager.addAnnotation(textAnnot, true)
        annotationManager.redrawAnnotation(textAnnot)
        annotationManager.selectAnnotation(textAnnot)
    }

    const uploadForSigning = async () => {
        const referenceString = `docToSign/${user.uid}${Date.now()}.pdf`
        const docRef = storage.ref(referenceString)
        const {documentViewer, annotationManager} = instance.Core
        const doc = documentViewer.getDocument()
        const xfdfString = await annotationManager.exportAnnotations({widgets: true, fields: true})
        const data = await doc.getFileData({xfdfString})
        const arr = new Uint8Array(data)
        const blob = new Blob([arr], {type: 'application/pdf'})
        docRef.put(blob).then(() => {
            console.log('Upload the blob')
        })

        const emails = assignees?.map(assignee => assignee.email)
        await addDocumentToSign(user.uid, user.email, referenceString, emails)
        dispatch(resetSignee())
        navigate('/')
    }

    const drop = (e, instance) => {
        const {docViewer} = instance;
        const scrollElement = docViewer.getScrollViewElement();
        const scrollLeft = scrollElement.scrollLeft;
        const scrollTop = scrollElement.scrollTop;
        setDropPoint({x: e.pageX + scrollLeft, y: e.pageY + scrollTop})
        e.preventDefault();
        return false;
    }

    const dragOver = (e) => {
        e.preventDefault();
        return false;
    }

    const dragStart = (e) => {
        e.target.style.opacity = '0.5'
        const copy = e.target.cloneNode(true)
        copy.id = 'form-build-drag-image-copy'
        copy.style.width = '250px'
        document.body.appendChild(copy)
        e.dataTransfer.setDragImage(copy, 125, 125)
        e.dataTransfer.setData('text', '')
    }
    const dragEnd = (e, type) => {
        addField(type, dropPoint)
        e.target.style.opacity = 1;
        document.body.removeChild(document.getElementById('form-build-drag-image-copy'))
        e.preventDefault()
    }

    return (
        <div className='prepare-page'>
            <div className='prepare-sidebar'>
                <h1>Prepare Document</h1>
                <div className='prepare-upload'>
                    <div class="mb-3">
                        <label for="formFile" class="form-label">Upload a document</label>
                        <button type="button" class="btn btn-primary btn-lg" onClick={() => {
                            if(filePicker) {
                                filePicker.current.click()
                            }
                        }}>Upload a document</button>
                    </div>
                </div>
                <div className='prepare-fields'>
                    <div>Add signature</div>
                    <select class="form-select" aria-label="Default select example">
                        {assigneesValues?.map(assignee => {
                            return <option value={assignee.value}>{assignee.label}</option>
                        })}
                    </select>
                    <div draggable onDragStart={e => dragStart(e)} onDragEnd={e => dragEnd(e, 'SIGNATURE')}>
                        <button type="button" class="btn btn-secondary btn-lg"
                            onClick={() => addField('SIGNATURE')}
                        >Add Signature <FaSignature /></button>
                    </div>
                    <div draggable onDragStart={e => dragStart(e)} onDragEnd={e => dragEnd(e, 'DATE')}>
                        <button type="button" class="btn btn-secondary btn-lg"
                            onClick={() => addField('DATE')}
                        >Add Date <BsCalendar2DateFill /></button>
                    </div>
                </div>
                <div className='prepare-actions'>
                    <div>Apply Fields</div>
                    <button type="button" class="btn btn-primary btn-lg"
                        onClick={applyFields}
                    >Send <BsFillSendArrowUpFill /></button>
                </div>
            </div>
            <div className='prepare-viewer'>
                <div className='webviewer' ref={viewer}></div>
            </div>
            <input type='file' ref={filePicker} style={{display: 'none'}} />
        </div>
    )
}

export default PrepareDocument