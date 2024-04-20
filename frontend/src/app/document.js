import { addDoc, collection, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { filestore } from "../firebase/firebase";
import { mergeAnnotations } from "./documentStorage";

export const addDocumentToSign = async (uid, email, docRef, emails) => {
    if(!uid) return;
    const signed = false;
    const xfdf = [];
    const signedBy = [];
    const requestedTime = new Date()
    const signedTime = '';
    try {
        const docRef = await addDoc(collection(filestore, 'documentsToSign'), {
            uid,
            email,
            docRef,
            emails,
            signed,
            xfdf,
            signedBy,
            signed,
            requestedTime,
            signedTime
        });
        console.log('Document written with ID: ', docRef.id);
    } catch(e) {
        console.error('Error adding document: ', e);
    }
}

export const updateDocumentToSign = async (docId, email, xfdfSign) => {
    const documentRef = collection(filestore, 'documentsToSign', docId);
    const docSnap = await getDoc(documentRef);
    if(docSnap.exists()) {
        const {signedBy, emails, xfdf, docRef} = docSnap.data();
        if(!signedBy.includes(email)) {
            const signedByArray = [...signedBy, email];
            const xfdfArary = [...xfdf, xfdfSign];
            await updateDoc(documentRef, {
                signedBy: signedByArray,
                xfdf: xfdfArary
            });
        }

        if(signedBy.length === emails.length) {
            const time = new Date()
            await updateDoc(documentRef, {
                signed: true,
                signedTime: time
            });

            mergeAnnotations(docRef, xfdf)
        }
    } else  {
        console.log('No such document');
    }
}

export const searchDocumentToSign = async (email) => {
    const documentRef = collection(filestore, 'documentsToSign');
    const query = query(
        documentRef, 
        where('email', 'array-contains', email),
        where('signed', '==', false)
    );

    const querySigned = query(
        documentRef,
        where('signedBy', 'array-contains', email),
    )

    const docIds = []
    const docIdSigned = []

    await getDocs(querySigned).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            docIdSigned.push({docId: doc.id});
        });
    })
    .catch((error) => {
        console.log('Error getting documents: ', error);
    });

    await getDocs(query).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const {docRef, emails, requestedTime} = doc.data();
            docIds.push({docId: doc.id, docRef, emails, requestedTime});
        });
    })
    .catch((error) => {
        console.log('Error getting documents: ', error);
    });
    
    return docIds;
}

export const searchDocumentsSigned = async (email) => {
    const documentRef = collection(filestore, 'documentsToSign');
    const docIds = []
    const query = query(
        documentRef,
        where('email', '==', email),
        where('signed', '==', true)
    );

    await getDocs(query)
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const {docRef, emails, signedTime} = doc.data();
            docIds.push({docId: doc.id, docRef, emails, signedTime});
        });
    })
    .catch((error) => {
        console.log('Error getting documents: ', error);
    });

    return docIds;
}