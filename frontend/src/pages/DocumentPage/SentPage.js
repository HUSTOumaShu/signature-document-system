import { useDispatch, useSelector } from "react-redux"
import DocumentList from "../../components/DocumentList"
import Header from "../../components/Header/Header"
import SideBar from "../../components/Sidebar"
import './index.css'
import { useEffect, useState } from "react"
import { getSentDocument } from "../../app/document"

const SentPage = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.data.user.user)
    const [documents, setDocuments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [show, setShow] = useState(true)

    useEffect(() => {
        async function getDocs() {
            const sentDocs = await getSentDocument(user.email)
            setDocuments(sentDocs)
            setShow(false)
            setIsLoading(false)
        }
        setTimeout(getDocs, 1000)
    }, [user.email])

    console.log(documents)

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
                    <DocumentList docType="Sent" documents={documents} />
                )}
            </div>
        </div>
    )
}

export default SentPage