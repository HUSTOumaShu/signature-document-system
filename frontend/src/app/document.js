import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { filestore } from "../firebase/firebase";

// Add a new document with a generated id.
export const addDocument = async (uid, email, title, message, reference, emails) => {
    if(!uid) return;
    const signed = false;
    const xfdf = [];
    const signedBy = [];
    const requestedTime = new Date()
    const signedTime = '';
    
    const isVoided = false;
    const reason = '';
    const voidedTime = '';
    const voidedBy = '';

    const isDeleted = false;
    const deletedTime = '';

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
            signedTime: signedTime,

            isVoided: isVoided,
            reason: reason,
            voidedTime: voidedTime,
            voidedBy: voidedBy,

            isDeleted: isDeleted,
            deletedTime: deletedTime
        });
        console.log('Document written with ID: ', docRef.id);
    } catch(e) {
        console.error('Error adding document: ', e);
    }
}

// Get a document by docId
export const getInboxDocument = async (email) => {
    const documentRef = collection(filestore, 'documentsToSign');
    const queryDoc = query(
        documentRef,
        where('emails', 'array-contains', email),
        where('isDeleted', '==', false),
    );

    const documents = [];

    await getDocs(queryDoc).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const {email, reference, title, emails, requestedTime, signed, signedTime, isVoided, reason, voidedTime, voidedBy, isDeleted, deletedTime} = doc.data();
            documents.push({docId: doc.id, email, title, reference, emails, requestedTime, signed, signedTime, isVoided, reason, voidedTime, voidedBy, isDeleted, deletedTime});
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
        where('isDeleted', '==', false),
    );

    await getDocs(queryDoc)
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const {email, reference, title, emails, requestedTime, signed, signedTime, isVoided, reason, voidedTime, voidedBy, isDeleted, deletedTime} = doc.data();
            documents.push({docId: doc.id, email, title, reference, emails, requestedTime, signed, signedTime, isVoided, reason, voidedTime, voidedBy, isDeleted, deletedTime});
        });
    })
    .catch((error) => {
        console.log('Error getting documents: ', error);
    });

    return documents;
}

export const getDeletedDocument = async (email) => {
    const documentRef = collection(filestore, 'documentsToSign');
    const documents = []
    const queryDoc = query(
        documentRef,
        where('email', '==', email),
        where('isDeleted', '==', true),
    );

    await getDocs(queryDoc)
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const {email, reference, title, emails, requestedTime, signed, signedTime, isVoided, reason, voidedTime, voidedBy, isDeleted, deletedTime} = doc.data();
            documents.push({docId: doc.id, email, title, reference, emails, requestedTime, signed, signedTime, isVoided, reason, voidedTime, voidedBy, isDeleted, deletedTime});
        });
    })
    .catch((error) => {
        console.log('Error getting documents: ', error);
    });
    return documents;
}

// Update a document signed by a user
export const updateDocument = async (docId, email, xfdfSign) => {
    const documentRef = doc(filestore, 'documentsToSign', docId);
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
        }
        if(signedBy.length + 1 === emails.length) {
            const time = new Date()
            await updateDoc(documentRef, {
                signed: true,
                signedTime: time
            });
        }
        
    } else  {
        console.log('No such document');
    }
}

export const deleteDocument = async (docId) => {
    const documentRef = doc(filestore, 'documentsToSign', docId);
    await updateDoc(documentRef, {
        isDeleted: true,
        deletedTime: new Date()
    });
}

export const restoreDocument = async (docId) => {
    const documentRef = doc(filestore, 'documentsToSign', docId);
    await updateDoc(documentRef, {
        isDeleted: false,
        deletedTime: ''
    });
}

export const voidDocument = async (docId, email, reason) => {
    const documentRef = doc(filestore, 'documentsToSign', docId);
    await updateDoc(documentRef, {
        isVoided: true,
        reason: reason,
        voidedTime: new Date(),
        voidedBy: email,
    });
}