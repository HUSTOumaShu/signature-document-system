import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Profile() {

    const location = useLocation();


    return (
        <div className="profile">
            <h1>Home</h1>
            <h1>Hello {location.state.id}</h1>
        </div>
    );
}

export default Profile;
