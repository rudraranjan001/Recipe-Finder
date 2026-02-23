require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db')
const colors = require('colors')
const cors = require('cors');
// const { notFound, errorHandler } = require('./middleware/errorMiddleware'); // Assuming you have this

const userRoutes = require('./routes/userRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');

connectDB();
const app = express();
app.use(cors());
    
app.use(express.json());

//Routes
app.use('/api/users',userRoutes);
app.use('/api/favorites', favoriteRoutes);
//userRoutes handle the request comes to api/users

// app.use(notFound);
// app.use(errorHandler);

const port = process.env.PORT || 5002;

app.get('/',(req,res) =>{

    res.send('Api is running');
})

app.post('/post',(req,res) => {

    res.send("done!");
})


app.listen(port);