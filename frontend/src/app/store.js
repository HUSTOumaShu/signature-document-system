import {configureStore} from '@reduxjs/toolkit';
import firebaseReducer from '../firebase/firebaseSlice';

export default configureStore({
    reducer: {
        firebase: firebaseReducer,
    }
})