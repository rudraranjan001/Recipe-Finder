require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db')
const colors = require('colors')
const cors = require('cors');

connectDB();
const app = express();
app.use(cors());

app.use(express.json());

//Routes
app.use('/api/users',require('./routes/userRoutes'));
//userRoutes handle the request comes to api/users


const port = process.env.PORT || 5002;

app.get('/',(req,res) =>{

    res.send('Api is running');
})

app.post('/post',(req,res) => {

    res.send("done!");
})

app.listen(port,() => console.log(`Server running on port ${port}`.yellow.bold));