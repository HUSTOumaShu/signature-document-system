import DocumentList from "../../components/DocumentList"
import Header from "../../components/Header/Header"
import SideBar from "../../components/Sidebar"
import './index.css'

const InboxPage = () => {
    return (
        <div className="document-page">
            <SideBar />
            <div className="document-content">
                <Header title="Document" />
                <DocumentList docType="Inbox" />
            </div>
        </div>
    )
}

export default InboxPage