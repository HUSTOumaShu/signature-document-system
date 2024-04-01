import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './components/Login/Login';
import ViewDocument from './components/ViewDocument';
import Signup from './components/Signup/Signup';
import Header from './components/Header';
import Welcome from './components/Welcome'
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
                </Routes>
            </Router>    
        </div>
    )
}

export default App;
