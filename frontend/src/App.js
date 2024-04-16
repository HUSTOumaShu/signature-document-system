import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '@popperjs/core/dist/umd/popper.min.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './pages/Login';
import ViewDocument from './components/ViewDocument/ViewDocument';	
import Signup from './pages/Signup';
import PasswordReset from './pages/PasswordReset/PasswordReset';
import { auth } from './firebase/firebase';
import HomePage from './pages/HomePage';
import DocumentPage from './pages/DocumentPage/InboxPage';
import InboxPage from './pages/DocumentPage/InboxPage';
import SentPage from './pages/DocumentPage/SentPage';
import DraftPage from './pages/DocumentPage/DraftPage';
import DeletedPage from './pages/DocumentPage/DeletedPage';
import PrepareDocument from './pages/PrepareDocument';
import UserPage from './pages/UserPage';
import {useDispatch, useSelector} from 'react-redux';
import { loginUser, setLoading } from './app/features/userSlice';

function App() {
    const user = useSelector(state => state.data.user)
    const dispatch = useDispatch()

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                dispatch(loginUser(
                    {
                        email: authUser.email,
                        uid: authUser.uid,
                        displayName: authUser.displayName,
                        photoURL: authUser.photoURL
                    }
                ))
                dispatch(setLoading(false))
            } else {
                console.log('User is logged out')
            }
        })
    }, [auth, dispatch])

    console.log(user)

    return user ? (
        <div className='app'>
            <Router>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/document' element={<DocumentPage />} />
                    <Route path='/document/inbox' element={<InboxPage />} />
                    <Route path='/document/sent' element={<SentPage />} />
                    <Route path='/document/draft' element={<DraftPage />} />
                    <Route path='/document/deleted' element={<DeletedPage />} />
                    <Route path='/prepare' element={<PrepareDocument />} />
                    <Route path='/viewDocument' element={<ViewDocument />} />
                    <Route path='users' element={<UserPage />} />
                    <Route path='/view-document' element={<ViewDocument />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                </Routes>
            </Router>
        </div>
    ) : (
        <div className='app'>
            <Router>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/password-reset' element={<PasswordReset />} />
                    <Route path='/*' element={<Login />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;
