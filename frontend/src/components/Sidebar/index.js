import { BiHome } from 'react-icons/bi';
import { IoCreateOutline } from 'react-icons/io5';
import { CgFileDocument, CgTemplate } from 'react-icons/cg';
import { AiOutlineUser } from 'react-icons/ai';
import { GrCertificate } from 'react-icons/gr';
import { FiSettings } from 'react-icons/fi';
import { FcDocument } from 'react-icons/fc';
import './index.css';

const SideBar = () => {
    return <div className="sideBar">
        <div className="logo">
            <FcDocument fontSize='4rem' />
            <h2>eDocument</h2>
        </div>

        <div className="menu--list">
            <a href="/" className="item">
                <BiHome fontSize='1.4rem' />
                Dashboard
            </a>
            <a href="/prepare" className="item">
                <IoCreateOutline fontSize='1.4rem' />
                Create Document
            </a>

            <div class="dropdown">
                <a class="btn dropdown-toggle item" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <CgFileDocument fontSize='1.4rem' />
                    Manage Documents
                </a>

                <ul class="dropdown-menu">
                    <li><a class="dropdown-item item" href="/document/inbox">Inbox</a></li>
                    <li><a class="dropdown-item item" href="/document/sent">Sent</a></li>
                    <li><a class="dropdown-item item" href="/document/draft">Draft</a></li>
                    <li><a class="dropdown-item item" href="/document/deleted">Deleted</a></li>
                </ul>
            </div>
            
            <a href="#" className="item">
                <CgTemplate fontSize='1.4rem' />
                Manage Templates
            </a>
            <a href="/users" className="item">
                <AiOutlineUser fontSize='1.4rem' />
                Manage Users
            </a>
            <a href="#" className="item">
                <GrCertificate fontSize='1.4rem' />
                Manage Certificates
            </a>
            <a href="#" className="item">
                <FiSettings fontSize='1.4rem' />
                Settings
            </a>
        </div>
    </div>
}

export default SideBar;