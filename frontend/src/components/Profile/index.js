import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { loginUser } from '../../app/features/userSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.data.user.user);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(loginUser())
        signOut(auth)
        navigate('/login')
    }

    return (
        <div class="nav-item dropdown profile">
            <a class="nav-link dropdown-toggle user_info" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <span><strong>{user?.displayName}</strong></span>
                <span>{user?.email}</span>
            </a>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Profile</a></li>
                <li><a class="dropdown-item" href="#">Settings</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li><button class="dropdown-item" onClick={handleLogout}>Sign Out</button></li>
            </ul>
        </div>
    )
}

export default Profile