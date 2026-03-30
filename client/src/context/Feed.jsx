import { useContext, useState, useEffect, createContext } from "react";
import api from "../components/Api";
import { useUser } from "./User";

const Feed = createContext();

export const FeedData = ({children}) => {
    const {isLogged} = useUser();
    const [totalLocalFeed, setTotalLocalFeed] = useState(null);
    const [localFeed, setLocalFeed] = useState([]);
    const [totalGlobalFeed, setTotalGlobalFeed] = useState(null);
    const [globalFeed, setGlobalFeed] = useState([]);

    const fetchGlobal = async () => {
        try{
            const result = await api.get('/feed/global');
            setGlobalFeed(result.data.rows);
            setTotalGlobalFeed(result.data.rowCount);
        }catch(err){
            console.error(err);
        }
    }

    useEffect(() => {fetchGlobal()}, []);
    useEffect(() => {if (isLogged) fetchGlobal()}, [isLogged]);
    

    return (
        <Feed.Provider value={{
            totalGlobalFeed,
            globalFeed,
            setGlobalFeed,
            totalLocalFeed,
            localFeed,
            setLocalFeed
        }}>{children}</Feed.Provider>
    )
}

export const useFeed = () => useContext(Feed);