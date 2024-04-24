import React, { useEffect, useState } from "react"
import DocumentList from "../../components/DocumentList"
import Header from "../../components/Header/Header"
import SideBar from "../../components/Sidebar"
import './index.css'
import { useDispatch, useSelector } from "react-redux"
import { getInboxDocument } from "../../app/document"

const InboxPage = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.data.user.user)
    const [documents, setDocuments] = useState([])
    const [show, setShow] = useState(true)

    useEffect(() => {
        async function getDocs() {
            const docsToSign = await getInboxDocument(user.email)
            setDocuments(docsToSign)
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
                <DocumentList docType="Inbox" documents={documents} />
            </div>
        </div>
    )
}

export default InboxPage