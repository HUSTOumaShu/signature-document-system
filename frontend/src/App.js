import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '@popperjs/core/dist/umd/popper.min.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './pages/Login';
import ViewDocument from './components/ViewDocument/ViewDocument';	
import Signup from './pages/Signup';
import PasswordReset from './pages/PasswordReset/PasswordReset';
import { auth } from './firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import HomePage from './pages/HomePage';
import DocumentPage from './pages/DocumentPage';

// function PrivateRoute({authenticated, children}) {
//     return authenticated ? children : <Navigate to="/login" />
// }
// function PublicRoute({authenticated, children}) {
//     return !authenticated ? children : <Navigate to="/" />
// }

// function PrivateRoute(authenticated, component){
//     return (
//         <Route
//             render = {authenticated ? component : <Navigate to="/login" />}
//         />
//     )
// }

function PublicRoute({authenticated, component}) {
    return authenticated ? <Navigate to="/" /> : component
}
function PrivateRoute({authenticated, component}) {
    return !authenticated ? <Navigate to="/login" /> : component
}

function App() {
    const [authenticated, setAuthenticated] = useState(true); 
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setAuthenticated(true)
            } else {
                setAuthenticated(false)
            }
        })
        return () => {}
    }, [])
    console.log(authenticated)

    return authenticated ? (
        <div className='App'>
            <Router>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/document' element={<DocumentPage />} />
                </Routes>
            </Router>
        </div>
    ) : (
        <div className='App'>
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
    //  (
    //     <div className='App'>
    //         <Router>
    //             <Routes>
    //                 <Route path="/login" element={<Login />} />
    //                 <Route path="/signup" element={<Signup />} />
    //                 <Route path="/password-reset" element={<PasswordReset />} />
    //                 <Route path="/*" element={<Login />} />
    //             </Routes>
    //         </Router>
    //     </div>
    // )
    
}

export default App;
