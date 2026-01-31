require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db')
const colors = require('colors')
const cors = require(cors);

connectDB();
const app = express();
app.use(cors());

const port = env.PORT || 5002;

app.get('/',(req,res) =>{

    res.send('Api is running');
})

app.post('/post',(req,res) => {

    res.send("done!");
})

app.listen(port,() => console.log(`Server running on port ${port}`.yellow.bold));