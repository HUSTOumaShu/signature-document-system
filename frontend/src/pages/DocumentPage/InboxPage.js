import React, { useEffect, useState } from "react"
import DocumentList from "../../components/DocumentList"
import Header from "../../components/Header/Header"
import SideBar from "../../components/Sidebar"
import './index.css'
import { useDispatch, useSelector } from "react-redux"
import { getInboxDocument } from "../../app/document"

const InboxPage = () => {
    const user = useSelector(state => state.data.user.user)
    const [documents, setDocuments] = useState([])
    const [show, setShow] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function getDocs() {
            const docs = await getInboxDocument(user.email)
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
                    <DocumentList docType="Inbox" documents={documents} />
                )}
            </div>
        </div>
    )
}

export default InboxPage