import { ref, set, get, runTransaction } from "firebase/storage";
import { storage } from "../firebase/firebase";

export const generateUserDocument = async (user, additionalData) => {
    if(!user) return;
    const userRef = ref(storage, "users/${user.uid}");
    try {
        await storage.runTransaction(async (transaction) => {
            const snapshot = await get(userRef);
            if(!snapshot.exists()) {
                const {email, displayName, photoURL} = user;
                await set(userRef, {
                    displayName,
                    email,
                    photoURL,
                    ...additionalData
                })
            }
        })
    } catch(error) {
        console.error("Error creating user document", error)
    }
    return getUserDocument(user.uid)
}

export const getUserDocument = async (uid) => {
    if(!uid) return null;
    try {
        const userDocument = await ref(storage, `users/${uid}`).get();
        return {
            uid,
            ...userDocument.data()
        }
    } catch(error) {
        console.error("Error fetching user", error)
    }
}