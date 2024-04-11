import { FaSignature } from 'react-icons/fa'
import { HiInformationCircle } from 'react-icons/hi'
import { AiFillDelete, AiOutlineCloudDownload } from 'react-icons/ai'
import './index.css'

const documents = [
    {
        title: 'Title',
        from: 'From',
        to: 'To',
        status: 'Processing',
        lastChange: '2/2/2022',
    },
    {
        title: 'Title',
        from: 'From',
        to: 'To',
        status: 'Processing',
        lastChange: '2/2/2022',
    },
]

const DocumentList = () => {
    return (
        <div className='document--list'>
            <div className='list--header'>
                <h2>Documents</h2>
                <select>
                    <option value='completed'>Completed</option>
                    <option value='processing'>Processing</option>
                </select>
            </div>
            <div className='list--container'>
                <table class="table table-light table-striped">
                    <thead>
                        <th scope='col'>STT</th>
                        <th scope='col'>Subject</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Last Change</th>
                        <th scope='col'>Action</th>
                    </thead>
                    <tbody>
                        {documents.map((document, index) => (
                            <tr>
                                <td style={{alignContent: 'center'}}>{index + 1}</td>
                                <td>
                                    <h5>{document.title}</h5>
                                    <p>From: {document.from}</p>
                                    <p>To: {document.to}</p>
                                </td>
                                <td>{document.status}</td>
                                <td>{document.lastChange}</td>
                                <td>
                                    {document.status === 'Processing' ? (
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