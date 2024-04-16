import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../app/auth';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'gestalt';
import './index.css';

const Profile = () => {
    const user = useSelector(state => state.data.user.user);
    const navigate = useNavigate();
    console.log(user)

    return (
        <div className='profile'>
            <div className='profile__header'>
                <Avatar src={user?.photoURL} name={user?.displayName} size='md' />
                <div className='displayName'>{user?.displayName}</div>
            </div>
            <button onClick={() => {
                signout();
                navigate('/login');
            }
            } type="button" class="btn btn-secondary">Sign Out</button>
        </div>
    )
}

export default Profile