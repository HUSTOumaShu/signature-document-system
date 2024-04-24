import React, { useState } from "react"
import SideBar from "../../components/Sidebar"
import './index.css'
import { useDispatch, useSelector } from "react-redux";
import { addSignee, removeSignee } from "../../app/features/assignSlice";
import { setHead } from "../../app/features/headDocSlice";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from 'react-icons/md'

const Assign = () => {
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const assignees = useSelector(state => state.data.assign.signees)
    const head = useSelector(state => state.data.head)
    console.log(head)

    const addRepicent = (name, email) => {
        const key = `${new Date().getTime()}${email}`
        if(name !== '' && email !== '') {
            console.log('add recipent', name, email, key)
            dispatch(addSignee({key, name, email}))
            setDisplayName('')
            setEmail('')
        }
    }

    const removeRecipent = (key) => {
        console.log('remove recipent', key)
        dispatch(removeSignee(key))
    }

    const prepare = () => {
        if(assignees.length > 0) {
            dispatch(setHead({title, message}))
            console.log('prepare', head)
            navigate('/prepare')
        }
        else {
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 1000)
        }
    }

    return (
        <div className="assign-page">
            <SideBar />
            <div className="assign-content">
                <h1>Create Document</h1>
                
                <div className="assign-add-recipent">
                    <h2>Add Recipent</h2>

                    <div class="input-group mb-3">
                        <input 
                            type="text"
                            class="form-control" 
                            placeholder="Name" 
                            aria-label="Name"
                            id="displayName"
                            onChange={event => setDisplayName(event.target.value)}
                            value={displayName} />
                        <span class="input-group-text">@</span>
                        <input 
                            type="email" 
                            class="form-control" 
                            placeholder="Email" 
                            aria-label="Email"
                            id="email"
                            onChange={event => setEmail(event.target.value)}
                            value={email} />
                    </div>
                </div>

                <button type="button" class="btn btn-primary btn-add-recipent" onClick={() => {
                    addRepicent(displayName, email)
                }}>Add recipent</button>

                <table class="table recipents">
                    <thead>
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignees?.map((user) => (
                            <tr key={user.key}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td><button className='btn btn-outline-danger' onClick={() => {
                                    removeRecipent(user.key)
                                }}><MdDeleteForever /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <div className="assign-add-message">
                    <h1>Add Message</h1>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Title</span>
                        <input 
                            type="text"
                            class="form-control" 
                            placeholder="Enter the title of document" 
                            aria-label="title" 
                            aria-describedby="basic-addon1"
                            id="title"
                            value={title}
                            onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div class="input-group">
                        <span class="input-group-text">Email message</span>
                        <textarea 
                            class="form-control" 
                            aria-label="message"
                            id="message"
                            value={message}
                            onChange={e => setMessage(e.target.value)}></textarea>
                    </div>
                </div>
                <div className="button-group">
                    <button type="button" class="btn btn-danger">Discard</button>
                    <button type="button" class="btn btn-warning">Save to Draft</button>
                    <button type="button" class="btn btn-success" onClick={prepare}>Next</button>
                </div>

            </div>
        </div>
    )
}

export default Assign