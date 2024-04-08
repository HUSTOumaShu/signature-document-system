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
