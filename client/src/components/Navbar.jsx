import {useState} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import {useUser} from "../context/User";
import styles from './Navbar.module.css';

const Navbar = () => {
    const {isLogged} = useUser();
    return (
    
        <nav className={styles.navbar}>
            <Link to="/" className={styles.logo}>
                STATS<span>media</span>
            </Link>
            <div className={styles.navLinks}>
            {isLogged ? (
                    <>
                        <Link to="/" className={styles.link}>Home</Link>
                        <Link to="/post" className={styles.link}>Create Poll</Link>
                        <Link to="/profile" className={styles.link}>Profile</Link>
                        {/* <button onClick={logout} className={styles.logoutBtn}> Logout </button> */}
                        <Link to="/logout" className={styles.link}>Logout</Link>
                    </>
                ) : (
                    <>
                        <Link to="/login" className={styles.link}>Login</Link>
                        <Link to="/signup" className={`${styles.link} styles.authBtn`}>
                            Signup
                        </Link>
                    </>
                )}
            </div>
        </nav>)
}

export default Navbar;