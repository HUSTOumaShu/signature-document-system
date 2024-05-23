import { useSelector } from "react-redux"
import { getDeletedDocument } from "../../app/document"
import DocumentList from "../../components/DocumentList"
import Header from "../../components/Header/Header"
import SideBar from "../../components/Sidebar"
import './index.css'
import { useEffect, useState } from "react"

const DeletedPage = () => {
    const user = useSelector(state => state.data.user.user)
    const [documents, setDocuments] = useState([])
    const [show, setShow] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function getDocs() {
            const docs = await getDeletedDocument(user.email)
            setDocuments(docs)
            setShow(false)
            setIsLoading(false)
        }
        setTimeout(getDocs, 1000)
    }, [user.email])

    return (
        <div className="document-page">
            <SideBar />
            <div className="document-content">
                <Header title="Document" />
                {isLoading ? (
                    <div className="loader-container">
                        <div className="loader"></div>
                    </div>
                ) : (
                    <DocumentList docType="Delete" documents={documents} />
                )}
            </div>
        </div>
    )
}

export default DeletedPage