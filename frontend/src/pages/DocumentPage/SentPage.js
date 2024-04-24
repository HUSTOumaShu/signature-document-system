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
    const [show, setShow] = useState(true)

    useEffect(() => {
        async function getDocs() {
            const sentDocs = await getSentDocument(user.email)
            setDocuments(sentDocs)
            setShow(false)
        }
        setTimeout(getDocs, 1000)
    }, [user.email])

    console.log(documents)

    return (
        <div className="document-page">
            <SideBar />
            <div className="document-content">
                <Header title="Document" />
                <DocumentList docType="Sent" documents={documents} />
            </div>
        </div>
    )
}

export default SentPage