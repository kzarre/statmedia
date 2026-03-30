import React from 'react';
import { useState } from 'react';
import './PostCard.css';
import api from './Api';
import { useUser } from '../context/User';

const PostCard = ({ post, onRemove }) => {
    const {userId, username} = useUser();
    const [isDeleting, setIsDeleting] = useState(false);
    // Converts "2026-03-23T07:01:25.792Z" into "Mar 23, 2026"
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const handleVote = (optionIndex) => {
        console.log(`User voted for option ${optionIndex}: ${post.options[optionIndex]}`);
        // Next step: api.post('/votes', { postId: post.id, optionIndex })
    };

    const deletePost = async () => {
        if (!window.confirm("Are you sure you want to delete this Satta?")) return;
        setIsDeleting(true);
        try{
            await api.put(`/delete/${post.id}`);
            onRemove(post.id);
        }catch(err){    
            console.error(err);
            setIsDeleting(false);
        }
    }

    return (
        <div className="post-card">
            <div className="post-header">
                <div className="user-meta">
                    <span className="username">User #{post.user_id}</span>
                    <span className="timestamp">• {formatDate(post.created_at)}</span>
                    {(post.user_id==userId) ? <button className="delete" onClick={deletePost}> {isDeleting ? "..." : "DELETE"} </button> : ""}
                </div>
                <span className="privacy-tag">{post.privacy}</span>
            </div>

            <div className="post-content">
                <h2 className="post-title">{post.title}</h2>
                <p className="post-description">{post.description}</p>
            </div>

            <div className="poll-section">
                {post.options.map((option, index) => (
                    <button 
                        key={index} 
                        className="poll-button"
                        onClick={() => handleVote(index)}
                    >
                        {option}
                    </button>
                ))}
            </div>

            <div className="post-footer">
                <span>0 votes</span>
                <span>Share</span>
            </div>
        </div>
    );
};

export default PostCard;