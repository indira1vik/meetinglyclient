import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Login() {
    const [empid, setEmpid] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();
    const handleSignup = () => {
        navigate('/signup');
    }
    const handleCredentials = () => {
        Axios.post('http://localhost:3001/checkLogin',{
            empid:empid,
            password:pass
        }).then((response)=>{
            if (response.data === "Success"){
                alert("Login Successful...");
                navigate('/home',{state:{empid}});
            } else if (response.data === "Wrong") {
                alert("Wrong Credentials");
            } else if (response.data === "Error") {
                alert("Error...");
            }
        }).catch((err)=>{
            alert("Error");
        })
    }
    return (
        <div>
            <h2>Login</h2>
            <div>
                <input
                    placeholder='Employee ID'
                    type='text'
                    id='empid'
                    name='empid'
                    onChange={(event)=>{
                        setEmpid(event.target.value);
                    }}
                />
                <br></br>
                <input
                    placeholder='Password'
                    type='text'
                    id='password'
                    name='password'
                    onChange={(event)=>{
                        setPass(event.target.value);
                    }}
                />
                <br></br>
                <button onClick={handleCredentials}>Login</button>
                <br></br>
                <button onClick={handleSignup}>New employee? click here</button>
            </div>
        </div>
    )
}

export default Login