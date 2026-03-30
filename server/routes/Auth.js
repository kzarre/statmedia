const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {Pool} = require('pg');
require('dotenv').config();
const {authenticateToken, pool} = require('../components/needs');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_SECRET = JWT_SECRET;


function checkEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


router.get('/verify', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if(!token) res.status(401).json({error: "AUTHENTICATION DENIED: NO TOKEN"});

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({error: "Invalid or expired token"});
        return res.status(200).json({message: "TOKEN AUTHENTICATED", userId: decoded.userId, username: decoded.username});
    })
})



router.post('/signup', async (req, res) => {
    const {fullname, username, email, password} = req.body;
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = pool.query('INSERT INTO users (fullname, email, username, password_hash) VALUES ($1, $2, $3, $4)', [fullname, email, username, hashedPassword]);

        res.status(201).json({message: "User Registered"});
    }catch(err){
        console.error(err);
        res.status(500).json({error: "Username already exists or something went wrong"});
    }
})



router.post('/login', async (req, res) => {
    
    const {user, password} = req.body;
    try{
        let returned_query;
        if (checkEmail(user)) { returned_query = await pool.query('SELECT * FROM users WHERE email= $1', [user]);}
        else { returned_query = await pool.query('SELECT * FROM users WHERE username= $1', [user]);}
        const user_data = returned_query.rows[0];

        if(!user_data){
            return res.status(401).json({error: "Invalid Credentials"});
        }
        const result = await bcrypt.compare(password, user_data.password_hash);

        if (!result){
            return res.status(401).json({error: "Wrong Credentials"});
        }
        
        const token = jwt.sign(
            {userId: user_data.id, username: user_data.username}, JWT_SECRET, {expiresIn: '1h'}
        );
        
        
        res.json({message: "Access Granted", token, userId: user_data.id, username: user_data.username});

    }catch(err){
        console.error(err);
        res.status(500).json({error: "Server Error"});
    }
})


module.exports = router;