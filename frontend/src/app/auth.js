import { 
    deleteUser, 
    updateProfile, 
    onAuthStateChanged, 
    signOut, 
    AuthErrorCodes,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup,
    GoogleAuthProvider, 
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { generateUserDocument } from "./document";

export const userDelete = () => {
    deleteUser(auth.currentUser)
    .then(() => {
        alert("User deleted successfully!")
    })
    .catch((error) => {
        console.log(error)
    })
}

export const profileUpdate = (displayName) => {
    updateProfile(auth.currentUser, {
        displayName,
    })
    .then(() => {
        alert("Profile updated successfully!")
    })
    .catch((error) => {
        console.log(error)
    })
}

export const handleAuthState = (setAuth) => {
    onAuthStateChanged(auth, (user) => {
        if(user) {
            setAuth(true)
        } else {
            setAuth(false)
            console.log(user)
        }
    })
}

export const logout = () => {
    signOut(auth)
}

export const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        generateUserDocument(userCredential.user)
        generateUserDocument(userCredential.user, {displayName: "New User"})
        console.log(userCredential.user)
    })
    .catch((error) => {
        if(error.code === AuthErrorCodes.INVALID_PASSWORD ||
            error.code === AuthErrorCodes.USER_DELETED) {
            alert("Invalid email or password!")
        } else {
            console.log(error.code)
            alert(error.code)
        }
    })
}

export const signIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log(userCredential.user)
    })
    .catch((error) => { 
        console.log(error.code)
        alert(error.code)
    })
}

export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const user = credential.user
        console.log(user)
    })
    .catch((error) => {
        console.log(error.code)
        alert(error.code)
    })
}