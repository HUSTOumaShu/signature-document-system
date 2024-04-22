import DocumentList from "../../components/DocumentList"
import Header from "../../components/Header/Header"
import SideBar from "../../components/Sidebar"
import './index.css'

const documents = [
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

const InboxPage = () => {
    return (
        <div className="document-page">
            <SideBar />
            <div className="document-content">
                <Header title="Document" />
                <DocumentList docType="Inbox" documents={documents} />
            </div>
        </div>
    )
}

export default InboxPage