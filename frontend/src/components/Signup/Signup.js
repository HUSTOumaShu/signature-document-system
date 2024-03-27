import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/signup', {
                email,
                password,
            });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="signup">
            <h1>Signup</h1>
            <form>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button>Signup</button>
            </form>
            <Link to="/">Already have an account?</Link>
        </div>
    );
}
