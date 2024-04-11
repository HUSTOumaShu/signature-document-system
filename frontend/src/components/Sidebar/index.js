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
            <a href="#" className="item">
                <BiHome fontSize='1.4rem' />
                Dashboard
            </a>
            <a href="#" className="item">
                <IoCreateOutline fontSize='1.4rem' />
                Create Document
            </a>
            <a href="#" className="item">
                <CgFileDocument fontSize='1.4rem' />
                Manage Document
            </a>
            <a href="#" className="item">
                <CgTemplate fontSize='1.4rem' />
                Manage Templates
            </a>
            <a href="#" className="item">
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