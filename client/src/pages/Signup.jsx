import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:5000';

const Signup = () => {
    const navigate = useNavigate();
    const [formdata, setFormdata] = useState({fullname: '', username: '', email: '', password: ''});
    const [error, setError] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setError(false);
            const {data} = axios.post(`${BASE_URL}/signup`, formdata);
            navigate('/login');
        }catch(err){
            console.error(err);
            setError(true);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Full Name' onChange={(e) => {setFormdata({...formdata, fullname: e.target.value})}}/>
            <input type='text' placeholder='Username' onChange={(e) => {setFormdata({...formdata, username: e.target.value})}}/>
            
            <input type='text' placeholder='Email' onChange={(e) => {setFormdata({...formdata, email: e.target.value})}}/>
            <input type='password' placeholder='password' onChange={(e) => {setFormdata({...formdata, password: e.target.value})}}/>
            <button type='submit'>Signup</button>
            {error ? <p>An Error Occured</p>: ""}
        </form>
    )
}

export default Signup;