import { initializeApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCK9klYs4C_akROANhZBpdL8COE0mei9tI",
    authDomain: "signature-document-manag-97ab2.firebaseapp.com",
    projectId: "signature-document-manag-97ab2",
    storageBucket: "signature-document-manag-97ab2.appspot.com",
    messagingSenderId: "1084476154479",
    appId: "1:1084476154479:web:cd6e8943c862052ac5a39a",
};

export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase)
export const filestore = getFirestore(firebase)
export const storage = getStorage(firebase)

export const generateUserDocument = async (user, additionalData) => {
    if(!user) return;
    const userRef = filestore.doc(`users/${user.uid}`)
    const snapshot = await userRef.get();
    if(!snapshot.exists) {
        const {email, displayName, photoURL} = user;
        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                ...additionalData
            })
        } catch(error) {
            console.log(error)
        }
    }
    return getUserDocument(user.uid)
}

export const getUserDocument = async uid => {
    if(!uid) return;
    try {
        const userDocument = await filestore.doc(`users/${uid}`).get()
        return {
            uid,
            ...userDocument.data()
        }
    } catch(error) {
        console.log(error)
    }
}