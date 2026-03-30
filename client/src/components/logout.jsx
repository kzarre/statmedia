import { Navigate } from 'react-router-dom';
import { useUser } from '../context/User';
import { useEffect } from 'react';

const Logout = () => {
    const {isLogged, setIsLogged} = useUser();

    useEffect(() => {
        localStorage.removeItem('token');
        setIsLogged(false);
    },[]);
    
    return <Navigate to='/login' replace/>
}

export default Logout;