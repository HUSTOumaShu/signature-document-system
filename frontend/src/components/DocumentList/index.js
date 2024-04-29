import { FaSignature } from 'react-icons/fa'
import { HiInformationCircle } from 'react-icons/hi'
import { AiFillDelete, AiOutlineCloudDownload } from 'react-icons/ai'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { setDocToSign, setDocToView } from '../../app/features/docSlice'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../../firebase/firebase'

const DocumentList = ({docType, documents}) => {
    const docToSign = useSelector(state => state.data.doc.docToSign)
    const docToView = useSelector(state => state.data.doc.docToView)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const downloadDoc = async (reference, filename) => {
        const URL = (await getDownloadURL(ref(storage, reference)))
        console.log(URL)
        var a = document.createElement('a')
        a.href = URL
        a.download = filename
        document.body.appendChild(a)
        a.click()
        a.remove()
    }

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
                                <td>{(document.signed?`Completed` : `Processing`)}</td>
                                <td>{document.requestedTime.toDate().toUTCString()}</td>
                                <td>
                                    {!document.signed ? (
                                        <button className='btn btn-outline-success' title='Sign Now'
                                            onClick={() => {
                                                const {docId, emails, title, reference} = document
                                                dispatch(setDocToSign({docId, emails, title, reference}))
                                                console.log('Sign', docToSign)
                                                navigate('/sign')
                                            }}>
                                            <FaSignature />
                                        </button>
                                    ) : (
                                        <button className='btn btn-outline-success' title='Detail'
                                            onClick={() => {
                                                const {docId, emails, title, reference} = document
                                                dispatch(setDocToView({docId, emails, title, reference}))
                                                console.log('View', docToView)
                                                navigate('/viewDocument')
                                            }}>
                                            <HiInformationCircle />
                                        </button>
                                    )}
                                    <a href='#' className='btn btn-outline-danger' title='Delete'>
                                        <AiFillDelete />
                                    </a>
                                    <button className='btn btn-outline-warning' title='Download' onClick={() => {
                                        console.log('Download', document.reference)
                                        downloadDoc(document.reference, document.title)
                                    }}>
                                        <AiOutlineCloudDownload />
                                    </button>
                                </td>
                            </tr>
                        ))}    
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DocumentList;