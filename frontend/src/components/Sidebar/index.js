import { BiHome } from 'react-icons/bi';
import { IoCreateOutline } from 'react-icons/io5';
import { CgFileDocument, CgTemplate } from 'react-icons/cg';
import { AiOutlineUser } from 'react-icons/ai';
import { GrCertificate } from 'react-icons/gr';
import { FcDocument } from 'react-icons/fc';
import { FaInbox } from 'react-icons/fa';
import { BsFillSendFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import './index.css';

const SideBar = () => {

    const activePage = window.location.pathname;
    document.querySelectorAll('a').forEach((link) => {
        if(link.href.includes(activePage)) {
            link.classList.add('active-item')
        }
    })

    return <div className="sideBar">
        <div className="logo">
            <FcDocument fontSize='4rem' />
            <h2>eDocument</h2>
        </div>

        <div className="menu--list">
            <a href="/" className="item" id='home'>
                <BiHome fontSize='1.4rem' />
                Dashboard
            </a>
            <a href="/assign" className="item">
                <IoCreateOutline fontSize='1.4rem' />
                Create Document
            </a>

            <div class="accordion" id="accordionPanelsStayOpenExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                        <button class="accordion-button item" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        <CgFileDocument fontSize='1.4rem' />
                        Manage Documents
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        <div class="accordion-body">
                            <a href="/document/inbox" className="item">
                                <FaInbox fontSize='1.4rem' />
                                Inbox
                            </a>
                            <a href="/document/sent" className="item">
                                <BsFillSendFill fontSize='1.4rem' />
                                Sent
                            </a>
                            <a href="/document/delete" className="item">
                                <MdDelete fontSize='1.4rem' />
                                Deleted
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
}

export default SideBar;