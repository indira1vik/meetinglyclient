import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../css/Login.css'

function Login() {
    const [empid, setEmpid] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();
    const handleSignup = () => {
        navigate('/signup');
    }
    const handleCredentials = () => {
        if (empid === "" || pass === "") {
            alert("Please fill the form...");
        } else {
            Axios.post('https://meetinglybackendwebsite.onrender.com/checkLogin', {
                empid: empid,
                password: pass
            }).then((response) => {
                if (response.data === "Success") {
                    navigate('/home', { state: { empid } });
                } else if (response.data === "Wrong") {
                    alert("Wrong Credentials");
                } else if (response.data === "Error") {
                    alert("Error...");
                }
            }).catch((err) => {
                alert("Error");
            })
        }
    }
    return (
        <div className='login-screen'>
            <div className='login-field'>
                <div className='website-title'>Meetingly</div>
                <div className='login-title'>Login</div>
                <div className='login-form'>
                    <input
                        placeholder='Employee ID'
                        type='text'
                        id='empid'
                        name='empid'
                        onChange={(event) => {
                            setEmpid(event.target.value);
                        }}
                    />
                    <input
                        placeholder='Password'
                        type='password'
                        id='password'
                        name='password'
                        onChange={(event) => {
                            setPass(event.target.value);
                        }}
                    />
                    <button className='loginbtn' onClick={handleCredentials}>Login</button>
                    <button className='signupbtn' onClick={handleSignup}>New employee? Click here</button>
                </div>
            </div>
        </div>
    )
}

export default Login