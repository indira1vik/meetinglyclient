import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import '../css/Home.css'

function Home() {

    // INITIALIZATIONS
    const [title, setTitle] = useState("");
    const [agenda, setAgenda] = useState("");
    const [meetstart, setMeetstart] = useState("");
    const [meetend, setMeetend] = useState("");
    const [guest, setGuest] = useState("");
    const [listMeets, setListmeets] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    const empid = location.state.empid;
    const [isDisplay, setIsdisplay] = useState(false);
    const [user, setUser] = useState([]);
    const [gBusyList, setGbusylist] = useState([]);

    // FUNCTIONS
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
    }, [empid, user.username]);

    useEffect(() => {
        Axios.post('https://meetinglybackendwebsite.onrender.com/listMeetings', {
            empid: empid,
            guest: user.username
        })
            .then((res) => {
                setListmeets(res.data);
            })
            .catch(() => {
                alert("Error in retrieving...");
            })
    }, [empid, user]);

    const handleProfileClick = () => {
        navigate('/profile', { state: { empid } });
    }

    const isDisjoint = (t1, t2) => {
        if ((t1[1] <= t2[0]) || (t2[1] <= t1[0])) {
            return true;
        }
        return false;
    }

    const handleMeetingSchedule = () => {
        if (meetstart.length !== 5 || meetend.length !== 5) {
            alert("Please give time in HH:MM format (24 hrs format)");
        } else {
            let FLAG = 0;
            if (meetstart >= meetend) {
                alert("Starting time should be lesser");
            } else {
                const meet_time = [];
                meet_time.push(meetstart);
                meet_time.push(meetend);
                const busy_arr = [];
                gBusyList.forEach((ele) => {
                    const temp = [];
                    temp.push(ele.off_start);
                    temp.push(ele.off_end);
                    busy_arr.push(temp);
                })
                busy_arr.sort();
                for (let i = 0; i < busy_arr.length; i++) {
                    if (isDisjoint(busy_arr[i], meet_time) !== true) {
                        alert("Cannot schedule meeting...");
                        FLAG = 1;
                    }
                }
                if (FLAG === 0) {
                    Axios.post('https://meetinglybackendwebsite.onrender.com/addMeetings', {
                        title: title,
                        agenda: agenda,
                        created_by: empid,
                        guest: guest,
                        meetstart: meetstart,
                        meetend: meetend
                    })
                        .then((response) => {
                            if (response.data === "Success") {
                                alert("Scheduled a meetings...");
                            } else if (response.data === "Error") {
                                alert("Meeting time and Guest cannot be Empty...");
                            } else {
                                alert("Incorrect form submission...");
                            }
                        })
                }
            }

        }

    }

    const handleScheduleClick = () => {
        setIsdisplay(!isDisplay);
    }

    const arr = [];
    listMeets.forEach((meets) => {
        meets.forEach((each) => {
            arr.push(each);
        })
    })

    const displ = arr.map((ele) => {
        return (
            <div key={ele._id} className='each-meet'>
                <div style={{ fontSize: '3vh', fontWeight: 'bold' }}>{ele.title}</div>
                <div style={{ fontSize: '2.5vh' }}>Agenda: {ele.agenda}</div>
                <div style={{ display: 'flex', gap: '3vh' }}>
                    <div style={{ fontSize: '2.5vh' }}>Created by : {ele.created_by}</div>
                    <div style={{ fontSize: '2.5vh' }}>Guest : {ele.guest}</div>
                </div>
                <div style={{ fontSize: '2.5vh' }}>From {ele.meet_start} to {ele.meet_end}</div>
            </div>
        )
    })

    const handleLogout = () => {
        navigate('/');
    }

    const checkGuestUser = (cg) => {
        Axios.post('https://meetinglybackendwebsite.onrender.com/checkGuest', {
            cg: cg
        })
            .then((res) => {
                if (res.data !== "Error") {
                    setGbusylist(res.data);
                } else {
                    alert("User not Found...");
                }
            })
            .catch(err => {
                alert("Error in retrieving...");
            })
    }

    const handleOffCheck = () => {
        if (guest !== "") {
            checkGuestUser(guest);
        } else {
            alert("Enter guest username...");
        }
    }

    return (
        <div>
            {/* design */}
            <div className='full-screen'>
                <div className='navbar'>
                    <div className='home-website-title'>Meetingly</div>
                    <div className='left-menu'>
                        <button className='profile-btn' onClick={handleProfileClick}><img alt='Profile' src={require('../images/prof-icon.png')} className='icon' /></button>
                        <button className='logout-btn' onClick={handleLogout}><img alt='Logout' src={require('../images/log-icon.png')} className='icon' /></button>
                    </div>
                </div>
                <div className='container'>
                    <div className='intro'>Welcome {user.name},</div>
                    <div style={{ display: 'flex' ,justifyContent:'space-between'}}>
                        <div className='meetings'>
                            <div className='sub-topic'>Upcoming Meetings</div>
                            <div>{displ}</div>
                        </div>
                        <div className='add-meeting'>
                            <button className='loginbtn sch' onClick={handleScheduleClick}>Schedule Meeting +</button>
                            {
                                isDisplay ?
                                    <div className='schedule-form'>
                                        <input
                                            placeholder='Title'
                                            type='text'
                                            id='title'
                                            name='title'
                                            onChange={(e) => {
                                                setTitle(e.target.value);
                                            }}
                                        />
                                        <br></br>
                                        <input
                                            placeholder='Agenda'
                                            type='text'
                                            id='agenda'
                                            name='agenda'
                                            onChange={(e) => {
                                                setAgenda(e.target.value);
                                            }}
                                        />
                                        <br></br>
                                        <input
                                            placeholder='Guest'
                                            type='text'
                                            id='guest'
                                            name='guest'
                                            onChange={(e) => {
                                                setGuest(e.target.value);
                                            }}
                                        />
                                        <button onClick={handleOffCheck}>Check Guest's Busy Hours</button>
                                        <div style={{padding:'2vh'}}>
                                            {
                                                gBusyList.map((each) => {
                                                    return (
                                                        <div key={each._id} style={{textAlign:'center',padding:'1vh'}}>
                                                            <span style={{fontSize:'3vh'}}>{each.off_start}</span>-<span style={{fontSize:'3vh'}}>{each.off_end}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <input
                                            placeholder='Meet starting time'
                                            type='text'
                                            id='meetstart'
                                            name='meetstart'
                                            onChange={(e) => {
                                                setMeetstart(e.target.value);
                                            }}
                                        />
                                        <br></br>
                                        <input
                                            placeholder='Meet end time'
                                            type='text'
                                            id='meetend'
                                            name='meetend'
                                            onChange={(e) => {
                                                setMeetend(e.target.value);
                                            }}
                                        />
                                        <br></br>
                                        <button onClick={handleMeetingSchedule}>Add</button>
                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* design */}

        </div>
    )
}

export default Home