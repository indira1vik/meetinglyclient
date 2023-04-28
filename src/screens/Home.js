import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import EmpList from '../components/EmpList'

function Home() {
    const [listEmps,setListemps] = useState([]);
    useEffect(()=>{
        Axios.get('http://localhost:3001/listEmployees')
        .then((response)=>{
            setListemps(response.data);
        })
        .catch(()=>{
            console.log("Error in retrieving...");
        })
    },[]);
    const USER_NAME = "John";
    return (
        <div>
            <h2>Welcome, {USER_NAME}</h2>
            <EmpList list={listEmps}/>
        </div>
    )
}

export default Home