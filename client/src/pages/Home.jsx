import React, {useState, useEffect} from 'react';
import { useFeed } from '../context/Feed';
import PostCard from '../components/PostCard';
import { useUser } from '../context/User';
import { Navigate } from 'react-router-dom';

const Home = () => {
    const {globalFeed, totalGlobalFeed, setGlobalFeed} = useFeed();
    
    const {isLogged} = useUser();

    if (!isLogged) return <Navigate to="/login"/>

    const handleRemovePost = (postId) => {
       
        setGlobalFeed(prev => prev.filter(p => p.id !== postId));
    };

    return(
        <div>
            {globalFeed.map((post) => <PostCard key={post.id} post={post} onRemove={handleRemovePost}/>)}
        </div>
        
    )
}

export default Home;