import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../components/Api';
import styles from './Post.module.css';

const Post = () => {
    const [title, setTitle] = useState("");
    const [post, setPost] = useState("");
    const [totalPolls, setTotalPolls] = useState(2);
    const [pollData, setPollData] = useState([]);
    const [privacy, setPrivacy] = useState(0);
    const [error, setError] = useState(false);
    const [posted, setPosted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            title: title,
            description: post,
            privacy: privacy,
            options: pollData
        }
        try{
            const res = await api.post("/post", data);
            setPosted(true);
            setError(false);
        }catch(err){
            console.error("Kuch ho gya", err);
            setError(true);
            setPosted(false);
        }
    }

    const handleDropDown = (e) => {
        const value = e.target.value;
        setTotalPolls(value);
    }
    const handlePrivacy = (e) => {
        const value = e.target.value;
        setPrivacy(value);
    }

    useEffect(() => {
        setPollData(prev => {
            const newArray = [...prev];

            while (newArray.length < totalPolls) newArray.push("");
            while (newArray.length > totalPolls) newArray.pop();
            
            return newArray;
        });
    }, [totalPolls]);

    const handlePollData = (index, value) => {
        const newArray = [...pollData];
        newArray[index] = value;
        setPollData(newArray);
    }
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Create New Post</h1>

            <form onSubmit={handleSubmit} className={styles.formGroup}>
                {error && <div className={`${styles.statusMsg} styles.error`}>Error hui gaya</div>}
                {posted && <div className={`${styles.statusMsg} styles.success`}>POSTED!</div>}

                <label className={styles.label}>Headline</label>
                <input className={styles.inputField} type='text' placeholder='Title pls!' onChange={(e) => setTitle(e.target.value)}></input>
                
                <label className={styles.label}>Description</label>
                <textarea className={styles.textArea} placeholder='What are we voting on today?' onChange={(e) => setPost(e.target.value)}></textarea>
                
                <div style={{display: 'flex', gap: '20px'}}>
                    <div style={{flex: 1}}>
                        <label className={styles.label}>No. of Options</label>
                        <select className={styles.selectField} style={{width: '100%'}} onChange={handleDropDown}>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        </select>
                    </div>

                    <div style={{flex: 1}}>
                        <label className={styles.label}>Privacy</label>
                        <select className={styles.selectField} style={{width: '100%'}} onChange={handlePrivacy}>
                        <option value="0">Private</option>
                        <option value="1">Global</option>
                        <option value="2">University</option>
                        </select>
                    </div>
                </div>

                <div className={styles.pollSection}>
                    <label className={styles.label}>Poll Choices</label>
                    {Array.from({length: totalPolls}).map((_,i) => (
                        <input key={i} className={`${styles.inputField} styles.optionInput`} value={pollData[i] || ""} type='text'  placeholder={"Option " + (i+1)} onChange={(e) => handlePollData(i, e.target.value)}/>
                    ))}
                </div>

                <button className={styles.submitBtn} type='submit'>Post</button>
            </form>
        </div>
    )
}

export default Post;