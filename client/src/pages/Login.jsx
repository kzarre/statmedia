import React, {useState, useEffect} from 'react';
import axios from 'axios';
import api from '../components/Api';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/User';
import styles from './Login.module.css';

const Login = () => {
    const {setIsLogged} = useUser();
    const navigate = useNavigate();
    const [formdata, setFormdata] = useState({user: '', password: ''});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const BASE_URL = 'http://localhost:5000';

    const checkToken = async () => {
        const token = localStorage.getItem('token');
        if (token){
            try{
                await api.get('auth/verify');
                setIsLogged(true);
                navigate('/home');
            }catch(err){
                setIsLogged(false);
            }
        }
    }

    useEffect(() => {checkToken()}, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const {data} = await axios.post(`${BASE_URL}/auth/login`, formdata);
            localStorage.setItem('token', data.token);
            setIsLogged(true);
            navigate('/home');
            setError(false);
        }catch(err){
            setIsLogged(false);
            console.error(err);
            setError(true);
        }finally{
            setLoading(false);
        }
    }


    return (
        <div className={styles.pageWrapper}>
            <div className={styles.card}>
                <h1 className={styles.title}>Welcome Back</h1>
                <p className={styles.subtitle}>Enter your details to access your account</p>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Username or Email</label>
                        <input 
                            className={styles.input}
                            type='text' 
                            placeholder='Enter your identifier' 
                            required
                            onChange={(e) => setFormdata({ ...formdata, user: e.target.value })} 
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Password</label>
                        <input 
                            className={styles.input}
                            type='password' 
                            placeholder='••••••••' 
                            required
                            onChange={(e) => setFormdata({ ...formdata, password: e.target.value })} 
                        />
                    </div>

                    {error && <div className={styles.errorMsg}>Invalid credentials. Please try again.</div>}

                    <button className={styles.submitBtn} type='submit' disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className={styles.footerText}>
                    Don't have an account? <Link to="/signup" className={styles.link}>Sign Up</Link>
                </p>
            </div>
        </div>
    )
}

export default Login;