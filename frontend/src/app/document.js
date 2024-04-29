import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { filestore } from "../firebase/firebase";
import { mergeAnnotations } from "./documentStorage";

export const addDocument = async (uid, email, title, message, reference, emails) => {
    if(!uid) return;
    const signed = false;
    const xfdf = [];
    const signedBy = [];
    const requestedTime = new Date()
    const signedTime = '';
    try {
        const docRef = await addDoc(collection(filestore, 'documentsToSign'), {
            uid: uid,
            email: email,
            title: title,
            message: message,
            reference: reference,
            emails: emails,
            signed: signed,
            xfdf: xfdf,
            signedBy: signedBy,
            signed: signed,
            requestedTime: requestedTime,
            signedTime: signedTime
        });
        console.log('Document written with ID: ', docRef.id);
    } catch(e) {
        console.error('Error adding document: ', e);
    }
}

export const updateDocument = async (docId, email, xfdfSign) => {
    const documentRef = doc(filestore, 'documentsToSign', docId);
    console.log('documentRef: ', documentRef)
    const docSnap = await getDoc(documentRef);
    if(docSnap.exists()) {
        const {signedBy, emails, xfdf, reference} = docSnap.data();
        if(!signedBy.includes(email)) {
            const signedByArray = [...signedBy, email];
            const xfdfArary = [...xfdf, xfdfSign];
            await updateDoc(documentRef, {
                signedBy: signedByArray,
                xfdf: xfdfArary
            });
            if(signedBy.length === emails.length) {
                const time = new Date()
                await updateDoc(documentRef, {
                    signed: true,
                    signedTime: time
                });
                mergeAnnotations(reference, xfdf)
            }
        }
        
    } else  {
        console.log('No such document');
    }
}

export const getInboxDocument = async (email) => {
    const documentRef = collection(filestore, 'documentsToSign');
    const queryDoc = query(
        documentRef,
        where('emails', 'array-contains', email),
    );

    const documents = [];

    await getDocs(queryDoc).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const {email, reference, title, emails, requestedTime, signed, signedTime} = doc.data();
            documents.push({docId: doc.id, email, title, reference, emails, requestedTime, signed, signedTime});
        });
    })
    .catch((error) => {
        console.log('Error getting documents: ', error);
    });
    
    return documents;
}

export const getSentDocument = async (email) => {
    const documentRef = collection(filestore, 'documentsToSign');
    const documents = []
    const queryDoc = query(
        documentRef,
        where('email', '==', email),
    );

    await getDocs(queryDoc)
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const {email, reference, title, emails, requestedTime, signed, signedTime} = doc.data();
            documents.push({docId: doc.id, email, title, reference, emails, requestedTime, signed, signedTime});
        });
    })
    .catch((error) => {
        console.log('Error getting documents: ', error);
    });

    return documents;
}