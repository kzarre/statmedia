import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom"
import api from "./Api";
import { useUser } from "../context/User";

const ProtectedRoute = ({children}) => {
    const {isLogged, setIsLogged} = useUser();
    const token = localStorage.getItem('token');
    const [isAuth, setIsAuth] = useState(null);

    if (isLogged===null) return <div>loading...</div>
    if(!isLogged) return <Navigate to='/login' replace/>
    return children;   
}

export default ProtectedRoute;