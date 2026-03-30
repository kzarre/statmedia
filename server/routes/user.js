const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {Pool} = require('pg');
require('dotenv').config();
const {authenticateToken, pool} = require('../components/needs');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_SECRET = JWT_SECRET;

router.post('/post', authenticateToken, async (req,res) => {
    const query = `
    INSERT INTO posts (user_id, title, description, options, privacy) 
    VALUES ($1, $2, $3, $4, $5) RETURNING *
    `;
    const {title, description, privacy, options} = req.body;
    const userId = req.user.userId;
    let priv;
    if (privacy===0) priv = "private";
    else if (privacy===1) priv = "global";
    else priv = "university";
    const values = [userId, title, description, options, priv];
    try{
        const result = await pool.query(query, values);
        return res.status(200).json({message: "POSTED!"});
    }catch(err){
        console.error("Post me panga" , err);
        return res.status(500);
    }
})

router.put('/delete/:id', authenticateToken, async (req, res) => {
    try{

        const postId = req.params.id;
        const userId = req.user.userId;
        // console.log(req);

        const query = "UPDATE posts SET deleted_at = NOW() WHERE id=$1 AND user_id=$2 RETURNING *"

        const result = await pool.query(query, [postId, userId]);

        if (result.rowCount==0){
            return res.status(403).json({message: "Action not Authorized or post not found"});
        }

        res.json({message: "Post archieved successfully"});
    }catch(err){
        console.error(err);
        res.status(500).json({error: "Server Error"});
    }
});

module.exports = router;