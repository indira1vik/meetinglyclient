import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Login() {
    const [uname, setUname] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();
    const handleSignup = () => {
        navigate('/signup');
    }
    const handleCredentials = () => {
        // Axios.post('http://localhost:3001/',{})
    }
    return (
        <div>
            <h2>Login</h2>
            <div>
                <input
                    placeholder='Username'
                    type='text'
                    id='username'
                    name='username'
                    onChange={(event)=>{
                        setUname(event.target.value);
                    }}
                />
                <input
                    placeholder='Password'
                    type='text'
                    id='password'
                    name='password'
                    onChange={(event)=>{
                        setPass(event.target.value);
                    }}
                />
                <button onClick={handleCredentials}>Login</button>
                <button onClick={handleSignup}>New employee? click here</button>
            </div>
        </div>
    )
}

export default Login