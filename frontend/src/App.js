import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import '@popperjs/core/dist/umd/popper.min.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { auth } from './firebase/firebase';
import {useDispatch, useSelector} from 'react-redux';
import { loginUser, setLoading } from './app/features/userSlice';
import { privateRoutes, publicRoutes } from './routes';

function App() {
    const user = useSelector(state => state.data.user.user)
    const isLoading = useSelector(state => state.data.user.isLoading)
    const dispatch = useDispatch()

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                dispatch(loginUser(
                    {
                        email: authUser.email,
                        uid: authUser.uid,
                        displayName: authUser.displayName,
                    }
                ))
                dispatch(setLoading(false))
            } else {
                console.log('User is logged out')
            }
        })
    }, [])

    console.log(user, isLoading)

    return (
        <div className='app'>
            {isLoading ? (
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            ) : user ? (
                <Router>
                    <Routes>
                        {publicRoutes.map((route, index) => (
                            <Route key={index} path={route.path} element={route.element} />
                        ))}
                    </Routes>
                </Router>
            ) : (
                <Router>
                    <Routes>
                        {privateRoutes.map((route, index) => (
                            <Route key={index} path={route.path} element={route.element} />
                        ))}
                    </Routes>
                </Router>
            )}
        </div>
    )
}

export default App;
