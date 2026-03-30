import { useContext, useState, useEffect, createContext } from "react";
import api from "../components/Api";

const User = createContext();

export const UserData = ({children}) => {
    const [isLogged, setIsLogged] = useState(false);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const verify = async () => {
            const token  = localStorage.getItem('token');
            if (token){
                try{
                    const res = await api.get('/auth/verify');
                    // console.log(res.data);
                    setIsLogged(true);
                    setUsername(res.data.username);
                    setUserId(res.data.userId);
                }catch(err){
                    localStorage.removeItem('token');
                    setIsLogged(false);
                }
            }
            setLoading(false);
        }
        verify();
    },[]);

    return (
        <User.Provider value={{
            userId,
            isLogged,
            setIsLogged,
            username,
            loading
        }}>
            {children}
        </User.Provider>
    )
}

export const useUser = () => useContext(User);