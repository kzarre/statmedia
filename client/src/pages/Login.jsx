import React, {useState, useEffect} from 'react';

const Login = () => {
    const [formdata, setFormdata] = useState({user: '', password: ''});
    const [error, setError] = useState(false);
    
    const checkToken = () => {
        const token = localStorage.getItem('JWT_token');
        console.log(token);
    }
    
    
    useEffect(() => {checkToken()}, []);
    
    const handleSubmit = async (e) => {
        try{
            setError(false);
        }catch(err){
            console.error(err);
            setError(true);
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Email or Username' onChange={(e) => {setFormdata({...formdata, user:e.target.value})}}/>
            <input type='password' placeholder='password' onChange={(e) => {setFormdata({...formdata, password:e.target.value})}}/>
            <button type='submit'>Login</button>
            {error ? <p>ERROR OCCURRED</p>: ""}
        </form>
    )
}

export default Login;