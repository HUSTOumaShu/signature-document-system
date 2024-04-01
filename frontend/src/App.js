import './App.css';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
>>>>>>> e50faff93e123e936baff432203054297e20637c
import Login from './components/Login/Login';
import ViewDocument from './components/ViewDocument';
import Signup from './components/Signup/Signup';
import Header from './components/Header';
import Welcome from './components/Welcome'
<<<<<<< HEAD
import PasswordReset from './components/PasswordReset/PasswordReset';

import { handleAuthState } from './app/auth';
import { generateUserDocument } from './app/document';
import { auth } from './firebase/firebase';

function PrivateRoute({authenticated, children}) {
    return authenticated ? children : <Navigate to="/login" />
}
function PublicRoute({authenticated, children}) {
    return !authenticated ? children : <Navigate to="/" />
}

function App() {
    const [authenticated, setAuthenticated] = useState(false);
    
    useEffect(() => {
        handleAuthState(setAuthenticated)
        const user = generateUserDocument(auth.currentUser)
        return () => {}
    }, [])

    return (
        <div className='App'>
            <Header />
            <Router>
                <Routes>
                    <Route path='/' exact element={
                        <PrivateRoute authenticated={authenticated}>
                            <Welcome />
                        </PrivateRoute>
                    } />
                    <Route path='/login' element={
                        <PublicRoute authenticated={authenticated}>
                            <Login />
                        </PublicRoute>
                    } />
                    <Route path='/signup' element={
                        <PublicRoute authenticated={authenticated}>
                            <Signup />
                        </PublicRoute>
                    } />
                    <Route path='/forgot-password' element={
                        <PublicRoute authenticated={authenticated}>
                            <PasswordReset />
                        </PublicRoute>
                    } />
                    <Route authenticated={authenticated} path='/*' element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    } />
=======

import {setUser, selectUser} from './firebase/firebaseSlice'
import { auth } from './firebase/firebase';

function App() {
    const user = auth.currentUser;
    const dispatch = useDispatch();

    useEffect(() => {
        auth.onAuthStateChanged(userAuth => {
            if(userAuth) {
                const user = auth.currentUser;
                const {uid, email} = user;
                dispatch(setUser({uid, email}));
            }
        });
    }, [dispatch])

    console.log("user", user)
    return (user !== null) ? (
        <div className="App">
            <Router>
                <Routes>
                    <Route path='/' element={<Welcome />} />
                    <Route path="/view" element={<ViewDocument />} />
>>>>>>> e50faff93e123e936baff432203054297e20637c
                </Routes>
            </Router>    
        </div>
<<<<<<< HEAD
=======
    ) : (
        <div>
            <Header />
            <Router>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </Router>
        </div>        
>>>>>>> e50faff93e123e936baff432203054297e20637c
    )
}

export default App;
