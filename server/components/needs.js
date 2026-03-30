const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {Pool} = require('pg');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_SECRET = JWT_SECRET;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false}
})

pool.connect((err, client, release) => {
    if (err){
        return console.error('Error acquiring Client', err.stack);
    }
    console.log("Connected to database");
})

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) res.status(401).json({error: "Access Denied: no token"});

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({error: "Error verifing token"});

        req.user = user;
        next();
    })
}

module.exports = {
    pool,
    authenticateToken,
    JWT_SECRET,
}