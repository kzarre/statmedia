import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Signup.module.css';

const BASE_URL = 'http://localhost:5000';

const Signup = () => {
    const navigate = useNavigate();
    const [formdata, setFormdata] = useState({fullname: '', username: '', email: '', password: ''});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            setError(false);
            const {data} = await axios.post(`${BASE_URL}/auth/signup`, formdata);
            navigate('/login');
        }catch(err){
            console.error(err);
            setError(true);
        }finally{
            setLoading(false);
        }
    }
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.card}>
                <h1 className={styles.title}>Join STATSmedia</h1>
                <p className={styles.subtitle}>Create your account to start polling</p>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Full Name</label>
                        <input 
                            className={styles.input}
                            type='text' 
                            placeholder='Bhagat Singh' 
                            required
                            onChange={(e) => setFormdata({ ...formdata, fullname: e.target.value })} 
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Username</label>
                        <input 
                            className={styles.input}
                            type='text' 
                            placeholder='manoj123' 
                            required
                            onChange={(e) => setFormdata({ ...formdata, username: e.target.value })} 
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Email Address</label>
                        <input 
                            className={styles.input}
                            type='email' 
                            placeholder='name@domain.com' 
                            required
                            onChange={(e) => setFormdata({ ...formdata, email: e.target.value })} 
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

                    {error && <div className={styles.errorMsg}>Oops! Something went wrong. Try again.</div>}

                    <button className={styles.submitBtn} type='submit' disabled={loading}>
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <p className={styles.footerText}>
                    Already have an account? <Link to="/login" className={styles.link}>Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup;