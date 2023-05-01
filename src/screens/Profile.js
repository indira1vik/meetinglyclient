import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Axios from 'axios'
import '../css/Profile.css'

function Profile() {
    const location = useLocation();
    const empid = location.state.empid;

    const [user, setUser] = useState([]);
    const [busyList, setbusyList] = useState([]);

    const [isEdit, setIsedit] = useState(false);
    const [isBusy, setIsbusy] = useState(false);
    const [uname, setUname] = useState("");
    const [pass, setPass] = useState("");

    const [offstart, setOffstart] = useState("");
    const [offend, setOffend] = useState("");

    useEffect(() => {
        Axios.post('https://meetinglybackendwebsite.onrender.com/listBusy', {
            empid: empid
        })
            .then((res) => {
                setbusyList(res.data);
            })
            .catch((err) => {
                alert("No Off-hours found...");
            })
    }, [empid]);

    useEffect(() => {
        Axios.post('https://meetinglybackendwebsite.onrender.com/employeeDetails', {
            empid: empid
        })
            .then((response) => {
                setUser(response.data);
            })
            .catch(() => {
                alert("Error in retrieving...");
            })
    }, [empid]);

    const handleEdit = () => {
        setIsedit(!isEdit);
    }

    const handleOffBtn = () => {
        setIsbusy(!isBusy);
    }

    const handleBusy = () => {
        if (offstart.length !== 5 || offend.length !== 5) {
            alert("Please give time in HH:MM format");
        } else {
            Axios.post('https://meetinglybackendwebsite.onrender.com/addBusy', {
                empid: empid,
                offstart: offstart,
                offend: offend
            })
                .then((response) => {
                    if (response.data === "Success") {
                        alert("Added Busy hours...");
                        setIsbusy(!isBusy);
                    } else {
                        alert("Error adding...");
                    }
                })
                .catch((err) => {
                    alert("Error in Updating...");
                })
        }
    }

    const handleUpdate = () => {
        Axios.post('https://meetinglybackendwebsite.onrender.com/updateProfile', {
            empid: empid,
            uname: uname,
            pass: pass,
            oldUname: user.username
        })
            .then((response) => {
                if (response.data === "Success") {
                    alert("Profile updated...");
                    setIsedit(!isEdit);
                } else {
                    alert("Error updating...");
                }
            })
            .catch(() => {
                alert("Error in retrieving...");
            })
    }

    const handleDeleteBusy = (start, end) => {
        Axios.post('https://meetinglybackendwebsite.onrender.com/deleteBusy', {
            empid: empid,
            off_start: start,
            off_end: end
        }).then((res) => {
            if (res.data === "Success") {
                alert("Deleted...");
            } else if (res.data === "Error") {
                alert("Cannot delete...");
            }
        })
            .catch((err) => {
                alert("Error in Updating...");
            })
    }

    return (
        <div className='full-flex'>
            <div className='prof-container'>
                <div className='add-meeting stretch-con'>
                    <button className='loginbtn sch' onClick={handleEdit}>Edit Profile</button>
                    {
                        isEdit ?
                            <div className='schedule-form prof-form'>
                                <ul>
                                    <li>Empid : {user.empid}</li>
                                    <li><input
                                        placeholder='Username'
                                        type='text'
                                        id='username'
                                        name='username'
                                        onChange={(event) => {
                                            setUname(event.target.value);
                                        }}
                                    />
                                        <br></br>
                                    </li>
                                    <li>Email : {user.email}</li>
                                    <li>Phone : {user.phone}</li>
                                    <li>Position : {user.position}</li>
                                    <li>
                                        <input
                                            placeholder='Password'
                                            type='text'
                                            id='password'
                                            name='password'
                                            onChange={(event) => {
                                                setPass(event.target.value);
                                            }}
                                        />
                                        <br></br>
                                    </li>
                                </ul>
                                <button onClick={handleUpdate}>Save</button>
                            </div>
                            :
                            <div className='prof-form'>
                                <ul>
                                    <li>Empid : {user.empid}</li>
                                    <li>Username : {user.username}</li>
                                    <li>Email : {user.email}</li>
                                    <li>Phone : {user.phone}</li>
                                    <li>Position : {user.position}</li>
                                    <li>Password : {user.password}</li>
                                </ul>
                            </div>
                    }
                </div>
            </div>
            <div className='busy-container'>
                <div className='add-meeting' style={{ width: '100%' }}>
                    <div className='sub-topic'>Your busy time</div>
                    {
                        busyList.map((each) => {
                            return (
                                <div key={each._id} style={{ alignItems: 'center', marginBottom: '2vh', display:'flex'}}>
                                    <div>
                                        <span style={{ fontSize: '3vh' }}>{each.off_start}</span>-<span style={{ fontSize: '3vh' }}>{each.off_end}</span>
                                    </div>
                                    <button className='loginbtn rem-btn' onClick={event => handleDeleteBusy(each.off_start, each.off_end)}>Remove</button>
                                </div>
                            )
                        })
                    }
                    <button className='loginbtn sch' onClick={handleOffBtn}>Add Off-hours</button>

                </div>
                {
                    isBusy ?
                        <div className='login-form add-busy'>
                            <input
                                placeholder='Off hours starting'
                                type='text'
                                id='offstart'
                                name='offstart'
                                onChange={(event) => {
                                    setOffstart(event.target.value);
                                }}
                            />
                            <br></br>
                            <input
                                placeholder='Off hours ending'
                                type='text'
                                id='offend'
                                name='offend'
                                onChange={(event) => {
                                    setOffend(event.target.value);
                                }}
                            />
                            <br></br>
                            <button className='loginbtn' onClick={handleBusy}>Add +</button>
                        </div>
                        :
                        null
                }
            </div>


        </div>
    )
}

export default Profile