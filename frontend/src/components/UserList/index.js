import { FaSignature } from 'react-icons/fa'
import { HiInformationCircle } from 'react-icons/hi'
import { AiFillDelete, AiOutlineCloudDownload } from 'react-icons/ai'
import './index.css'

const users = [
    {
        title: 'Title',
        from: 'From',
        to: 'To',
        status: 'Successed',
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

const UserList = () => {
    return (
        <div className='user--list'>
            <div className='list--header'>
                <h2>User List</h2>
                <select>
                    <option value='completed'>Completed</option>
                    <option value='processing'>Processing</option>
                </select>
            </div>
            <div className='list--container'>
                <table class="table table-light table-striped table-document">
                    <thead>
                        <th className='col-1' scope='col'>STT</th>
                        <th className='col-5' scope='col'>Subject</th>
                        <th className='col-2' scope='col'>Status</th>
                        <th className='col-2' scope='col'>Last Change</th>
                        <th className='col-3' scope='col'>Action</th>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>
                                    <strong>{user.title}</strong> <br />
                                    From: {user.from} <br />
                                    To: {document.to}
                                </td>
                                <td>{user.status}</td>
                                <td>{user.lastChange}</td>
                                <td style={{margin: '4px'}}>
                                    {user.status === 'Processing' ? (
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

export default UserList;