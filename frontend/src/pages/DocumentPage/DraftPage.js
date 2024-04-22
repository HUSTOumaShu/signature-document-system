import DocumentList from "../../components/DocumentList"
import Header from "../../components/Header/Header"
import SideBar from "../../components/Sidebar"
import './index.css'

const DraftPage = () => {
    return (
        <div className="document-page">
            <SideBar />
            <div className="document-content">
                <Header title="Document" />
                <DocumentList docType="Draft" documents={null} />
            </div>
        </div>
    )
}

export default DraftPage