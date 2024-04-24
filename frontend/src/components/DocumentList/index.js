import { FaSignature } from 'react-icons/fa'
import { HiInformationCircle } from 'react-icons/hi'
import { AiFillDelete, AiOutlineCloudDownload } from 'react-icons/ai'
import './index.css'

const DocumentList = ({docType, documents}) => {
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
                                <td>{(document.signed?`Complete` : `Processing`)}</td>
                                <td>{document.requestedTime.toDate().toUTCString()}</td>
                                <td>
                                    {!document.signed ? (
                                        <a href='#' className='btn btn-outline-success' title='Sign Now'>
                                            <FaSignature />
                                        </a>
                                    ) : (
                                        <a href='#' className='btn btn-outline-success' title='Detail'>
                                            <HiInformationCircle />
                                        </a>
                                    )}
                                    <a href='#' className='btn btn-outline-danger' title='Delete'>
                                        <AiFillDelete />
                                    </a>
                                    <a href='#' className='btn btn-outline-warning' title='Download'>
                                        <AiOutlineCloudDownload />
                                    </a>
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