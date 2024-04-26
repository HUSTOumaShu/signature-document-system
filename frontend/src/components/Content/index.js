import { useSelector } from "react-redux";
import Card from "../Card";
import DocumentList from "../DocumentList";
import Header from "../Header/Header";
import "./index.css";
import { useEffect, useState } from "react";
import { getInboxDocument, getSentDocument } from "../../app/document";

const Content = () => {
    const user = useSelector(state => state.data.user.user)
    const [isLoading, setLoading] = useState(true)

    const [inboxDoc, setInboxDoc] = useState([])
    const [sentDoc, setSentDoc] = useState([])

    useEffect(() => {
        async function getDocs() {
            const inboxDoc = await getInboxDocument(user.email)
            setInboxDoc(inboxDoc)
            const sentDoc = await getSentDocument(user.email)
            setSentDoc(sentDoc)
            setLoading(false)
        }
        setTimeout(getDocs, 1000)
    }, [user.email])

    const requiredDoc = inboxDoc.filter(doc => !doc.signed)
    const waitingDoc = sentDoc.filter(doc => !doc.signed)
    const completedDoc = sentDoc.filter(doc => doc.signed).concat(inboxDoc.filter(doc => doc.signed))
    return (
        <div className="content">
            <Header title="Dashboard" />
            {isLoading ? (
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            ) : (
                <>
                    <Card cards = {
                        [
                            {
                                title: 'Required',
                                count: requiredDoc.length,
                            },
                            {
                                title: 'Waiting',
                                count: waitingDoc.length,
                            },
                            {
                                title: 'Completed',
                                count: completedDoc.length,
                            },
                        ]
                    } />
                    <DocumentList docType="Need to sign" documents={requiredDoc} />
                </>
            )}
        </div>
    )
}

export default Content;