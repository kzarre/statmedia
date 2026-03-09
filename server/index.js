const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const {Pool} = require('pg')

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

app.use(cors());
app.use(express.json());

const PORT = 5000;
app.listen(PORT, ()=> {console.log(`Server is listening on port ${PORT}`)});