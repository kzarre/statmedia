const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const {Pool} = require('pg')
const auth = require('./routes/Auth')
const user = require('./routes/user')
const feed = require('./routes/feed')
require('dotenv').config()

const app = express();

const JWT_SECRET = process.env.JWT_SECRET;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false}
})

pool.connect((err, client, release) => {
    if (err) return console.error('Error acquiring Client', err.stack);
    console.log('Successfully connected to the database');
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

app.use(cors());
app.use(express.json());



app.use('/auth', auth);
app.use('', user);
app.use('/feed', feed);


const PORT = 5000;
app.listen(PORT, ()=> {console.log(`Server is listening on port ${PORT}`)});