import SideBar from "../../components/Sidebar"
import { AiFillDelete } from 'react-icons/ai'
import './index.css'

const PrepareDocument = () => {

    const addRepicent = () => {
        const recipent = `
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Name" aria-label="Name" />
                <span class="input-group-text">@</span>
                <input type="email" class="form-control" placeholder="Email" aria-label="Email" />
                <button className='btn btn-outline-danger' title='Delete'>
                    Delete
                </button>
            </div>
        `
        document.getElementsByClassName('prepare-add-recipent')[0].innerHTML += recipent    
    }

    return (
        <div className="prepare-page">
            <SideBar />
            <div className="prepare-content">
                <div className="prepare-add-document">
                    <h1>Add Document</h1>
                    <div style={{borderBottom: 'solid 1px #000'}}>
                        <input class="form-control form-control-lg" id="formFileLg" type="file" multiple />
                    </div>
                </div>
                <div className="prepare-add-recipent">
                    <h1>Add Recipent</h1>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label class="form-check-label" for="flexCheckDefault">
                            I am the only signer
                        </label>
                    </div>

                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Name" aria-label="Name" />
                        <span class="input-group-text">@</span>
                        <input type="email" class="form-control" placeholder="Email" aria-label="Email" />
                        <button className='btn btn-outline-danger' title='Delete'>
                            <AiFillDelete />
                        </button>
                    </div>
                </div>

                <button type="button" class="btn btn-primary btn-add-recipent" onClick={addRepicent}>Add recipent</button>
                
                <div className="prepare-add-message">
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
                    <button type="button" class="btn btn-success">Next</button>
                </div>
            </div>
        </div>
    )
}

export default PrepareDocument