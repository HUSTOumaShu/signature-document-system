import { createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup, 
    sendPasswordResetEmail,
    signOut,
    updatePassword,
    updateProfile,
    updateEmail,
    sendEmailVerification
} from 'firebase/auth'
import { auth } from '../firebase/firebase';

// Login, signup, and logout functions
export const signup = async (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage)
        })
}

export const loginWithEmailAndPassword = async (email, password) => {
    console.log(email, password, auth)
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage)
        })
}

export const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken
            const user = result.user
            console.log(user, token)
            console.log(auth)
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(error.message)
        })
}

export const signout = async () => {
    signOut(auth).then(() => console.log('Signed out successfully'))
    .catch((error) => {
        console.error(error)
    })
}

export const resetPassword = async (email) => {
    sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log('Password reset email sent')
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage)
        })
}

export const update_password = async (password) => {
    updatePassword(auth.currentUser, password)
        .then(() => {
            console.log('Password updated successfully')
        })
        .catch((error) => {
            console.error(error)
        }
    )
}

// User profile functions
export const getUserProfile = async () => {
    const user = auth.currentUser
    if(user !== null) {
        const data = {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
        }
        return data;
    }
}

export const update_profile = async (name, photoURL) => {
    updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL
    }).then(() => {
        console.log('Profile updated successfully')
    }).catch((error) => {
        console.error(error)
    })
}

export const update_email = async (email) => {
    updateEmail(auth.currentUser, email)
        .then(() => {
            console.log('Email updated successfully')
        })
        .catch((error) => {
            console.error(error)
        })
}

export const sendVerification = async () => {
    sendEmailVerification(auth.currentUser)
        .then(() => {
            console.log('Email verification sent')
        })
        .catch((error) => {
            console.error(error)
        })
}