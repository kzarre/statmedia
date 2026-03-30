const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {Pool} = require('pg');
require('dotenv').config();
const {authenticateToken, pool} = require('../components/needs');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_SECRET = JWT_SECRET;

router.get('/global', authenticateToken, async (req,res) => {
    const query = 'SELECT * FROM posts WHERE privacy != \'private\' AND deleted_at IS NULL ORDER BY created_at DESC LIMIT 10';
    try{
        const result = await pool.query(query);
        // const posts = result.rows;
        res.status(200).json({rowCount: result.rowCount, rows:result.rows})
    }catch(err){
        console.error(err);
        res.status(500).json({error: err});
    }
})



module.exports = router;