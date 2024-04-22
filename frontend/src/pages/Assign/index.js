import React, { useState } from "react"
import SideBar from "../../components/Sidebar"
import './index.css'
import { useDispatch, useSelector } from "react-redux";
import { addSignee } from "../../app/features/assignSlice";
import {Toast} from 'gestalt'
import { useNavigate } from "react-router-dom";

const Assign = () => {
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [showToast, setShowToast] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const assignees = useSelector(state => state.data.assign.signees)

    const addRepicent = (name, email) => {
        const key = `${new Date().getTime()}${email}`
        if(name !== '' && email !== '') {
            console.log('add recipent', name, email, key)
            dispatch(addSignee({key, name, email}))
            setDisplayName('')
            setEmail('')
        }
    }

    const prepare = () => {
        if(assignees.length > 0) {
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
                <div className="assign-add-document">
                    <h1>Add Document</h1>
                    <div style={{borderBottom: 'solid 1px #000'}}>
                        <input class="form-control form-control-lg" id="formFileLg" type="file" multiple />
                    </div>
                </div>
                <div className="assign-add-recipent">
                    <h1>Add Recipent</h1>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label class="form-check-label" for="flexCheckDefault">
                            I am the only signer
                        </label>
                    </div>

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
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <div className="assign-add-message">
                    <h1>Add Message</h1>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Title</span>
                        <input type="text" class="form-control" placeholder="Enter the title of document" aria-label="title" aria-describedby="basic-addon1" />
                    </div>
                    <div class="input-group">
                        <span class="input-group-text">Email message</span>
                        <textarea class="form-control" aria-label="message"></textarea>
                    </div>
                </div>
                <div className="button-group">
                    <button type="button" class="btn btn-danger">Discard</button>
                    <button type="button" class="btn btn-warning">Save to Draft</button>
                    <button type="button" class="btn btn-success" onClick={prepare}>Next</button>
                </div>

            <div class="toast-container position-fixed bottom-0 end-0 p-3">
                <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                    <img src="..." class="rounded me-2" alt="..." />
                    <strong class="me-auto">Alert</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        Please add at least one recipent
                    </div>
                </div>
            </div>

            <Toast show={showToast} text="Please add at least one recipent" />

            </div>
        </div>
    )
}

export default Assign