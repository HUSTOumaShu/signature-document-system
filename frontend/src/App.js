import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Login from './components/Login/Login';
import ViewDocument from './components/ViewDocument';
import Signup from './components/Signup/Signup';
import Header from './components/Header';
import Welcome from './components/Welcome'

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
                </Routes>
            </Router>
        </div>
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
    )
}

export default App;
