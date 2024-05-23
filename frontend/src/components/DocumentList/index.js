import { FaSignature } from 'react-icons/fa'
import { HiInformationCircle } from 'react-icons/hi'
import { AiFillDelete } from 'react-icons/ai'
import { FaEdit } from 'react-icons/fa'
import { FaBan } from 'react-icons/fa'
import { FaQuestionCircle } from 'react-icons/fa'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { setDocToSign, setDocToView } from '../../app/features/docSlice'
import { useNavigate } from 'react-router-dom'
import { deleteDocument, voidDocument } from '../../app/document'
import { useState } from 'react'

const DocumentList = ({docType, documents}) => {
    const docToSign = useSelector(state => state.data.doc.docToSign)
    const docToView = useSelector(state => state.data.doc.docToView)
    const user = useSelector(state => state.data.user.user)

    const [deleteId, setDeleteId] = useState("")
    const [voidId, setVoidId] = useState("")
    const [reason, setReason] = useState("")

    const handleDelete = (id) => {
        setDeleteId(id)
    }
    const handleVoid = (id) => {
        console.log(id)
        setVoidId(id)
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div className='document--list'>
            <div className='list--header'>
                <h2>{docType}</h2>
                <select>
                    <option value='completed'>All</option>
                    <option value='completed'>Completed</option>
                    <option value='processing'>Processing</option>
                </select>
            </div>
            <div className='list--container'>
                <table class="table table-light table-striped table-document">
                    <thead>
                        <tr>
                            <th className='col-1' scope='col'>STT</th>
                            <th className='col-5' scope='col'>Subject</th>
                            <th className='col-2' scope='col'>Status</th>
                            <th className='col-2' scope='col'>Last Change</th>
                            <th className='col-3' scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents?.map((document, index) => (
                            <tr key={index+1}>
                                <td>{index + 1}</td>
                                <td style={{fontSize: '14px'}}>
                                    <strong>{document.title}</strong> <br />
                                    From: {document.email} <br />
                                    To: {document.emails.map((email, index) => (
                                        <span key={index}>{email}, </span>
                                    ))} <br />
                                </td>
                                <td>{(document.signed? `Completed` : document.isVoided ? `Voided` :  `Processing`)}</td>
                                <td>{document.requestedTime.toDate().toUTCString()}</td>
                                <td>
                                    {document.isVoided ? (
                                        <button className='btn btn-outline-danger' title='Reason'
                                        onClick={() => {
                                            const {docId, email, emails, title, message, reference, requestedTime, signedTime, isVoided, reason, voidedTime, voidedBy, isDeleted, deletedTime} = document
                                            dispatch(setDocToView({docId, email, emails, title, message, reference, requestedTime, signedTime, isVoided, reason, voidedTime, voidedBy, isDeleted, deletedTime}))
                                            console.log('View', docToView)
                                            navigate('/viewDocument')
                                        }}>
                                            <FaQuestionCircle />
                                        </button>
                                    ) : (
                                        <>
                                        {document.signed ? (
                                        <button className='btn btn-outline-success' title='Detail'
                                        onClick={() => {
                                            const {docId, email, emails, title, message, reference, requestedTime, signedTime} = document
                                            dispatch(setDocToView({docId, email, emails, title, message, reference, requestedTime, signedTime}))
                                            console.log('View', docToView)
                                            navigate('/viewDocument')
                                        }}>
                                            <HiInformationCircle />
                                        </button>
                                        ) : (
                                        <>
                                        {docType === 'Inbox' ? (
                                            <>
                                            <div className='button-group'>
                                                <button className='btn btn-outline-success' title='Sign Now'
                                                onClick={() => {
                                                    const {docId, emails, title, reference} = document
                                                    dispatch(setDocToSign({docId, emails, title, reference}))
                                                    console.log('Sign', docToSign)
                                                    navigate('/sign')
                                                }}>
                                                <FaSignature />
                                                </button>
                                                <button className='btn btn-outline-danger' title='Void' data-bs-toggle="modal" data-bs-target="#voidModal"
                                                onClick={() => handleVoid(document.docId)}>
                                                    <FaBan />
                                                </button>
                                            </div>
                                            </>
                                        ) : (
                                            <>
                                            <div className='button-group'>
                                                <button className='btn btn-outline-warning' title='Edit'>
                                                    <FaEdit />
                                                </button>
                                                <button className='btn btn-outline-danger' title='Delete' data-bs-toggle="modal" data-bs-target="#deleteModal"
                                                onClick={() => handleDelete(document.docId)}>
                                                    <AiFillDelete />
                                                </button>
                                            </div>
                                            </>
                                        )}
                                        </>
                                    )}
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <div class="modal fade" id="voidModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel"><strong>Void Document</strong></h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        By voiding this document, you are cancelling and refusing all the signatures. Are you sure you want to void this document?
                        <br />
                        <strong>Reason for voiding</strong>
                        <textarea class="form-control" aria-label="Reason"
                        id='reason' value={reason} onChange={e => setReason(e.target.value)}></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss='modal' onClick={() => {
                            console.log(voidId)
                            voidDocument(voidId, user.email, reason)
                            navigate('/document/inbox')
                        }}>Void</button>
                    </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel"><strong>Delete Document</strong></h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Do you want to delete this document? The recipent will not be able to sig.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss='modal'
                        onClick={() => {
                            console.log(deleteId)
                            deleteDocument(deleteId)
                            navigate('/document/sent')
                        }}>Delete</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DocumentList;