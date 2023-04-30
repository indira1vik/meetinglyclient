import React, { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../css/Signup.css'

function Signup() {

    const navigate = useNavigate();
    const [empid, setEmpid] = useState("");
    const [fname, setFname] = useState("");
    const [email, setEmail] = useState("");
    const [uname, setUname] = useState("");
    const [phone, setPhone] = useState("");
    const [pass, setPass] = useState("");
    const [pos, setPos] = useState("");

    const handleSignup = () => {
        Axios.post('https://meetinglybackendwebsite.onrender.com/addEmployee', {
            empid: empid,
            name: fname,
            email: email,
            username: uname,
            phone: phone,
            password: pass,
            position: pos
        }).then((response) => {
            if (response.data === "Success") {
                navigate('/home', { state: { empid } });
            } else if (response.data === "Error") {
                alert("Fill the form...");
            }
        }).catch(() => {
            alert("Incorrect Form Submission!");
        });
    }
    return (
        <div className='signup-screen'>
            <div className='signup-field'>
                <div className='website-title'>Meetingly</div>
                <div className='signup-title'>Signup</div>
                <div className='signup-form'>
                    <input
                        placeholder='Employee ID'
                        type='text'
                        id='empid'
                        name='empid'
                        onChange={(e) => {
                            setEmpid(e.target.value);
                        }}
                    />
                    <input
                        placeholder='Full Name'
                        type='text'
                        id='name'
                        name='name'
                        onChange={(e) => {
                            setFname(e.target.value);
                        }}
                    />
                    <input
                        placeholder='Position'
                        type='text'
                        id='position'
                        name='position'
                        onChange={(e) => {
                            setPos(e.target.value);
                        }}
                    />
                    <input
                        placeholder='Email ID'
                        type='text'
                        id='email'
                        name='email'
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <input
                        placeholder='Phone No.'
                        type='text'
                        id='phone'
                        name='phone'
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }}
                    />
                    <input
                        placeholder='Username'
                        type='text'
                        id='username'
                        name='username'
                        onChange={(e) => {
                            setUname(e.target.value);
                        }}
                    />
                    
                    <input
                        placeholder='Password'
                        type='password'
                        id='password'
                        name='password'
                        onChange={(e) => {
                            setPass(e.target.value);
                        }}
                    />
                    <button className='signupbutton' onClick={handleSignup}>Signup</button>
                </div>
            </div>
        </div>
    )
}

export default Signup