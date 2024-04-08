import { doc, getDoc, setDoc } from "firebase/firestore";
import { filestore } from "../firebase/firebase";
import axios from "axios";

// User information
export const getUser = async (uid) => {
    axios.get(`http://localhost:4000/users?uid=${uid}`)
    .then((res) => {
        return res.data
    })
    .catch((error) => {
        console.log(error)
    })
}

export const addUser = async (data) => {
    axios.post('http://localhost:4000/users/store', data)
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error)
    })
}