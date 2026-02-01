// it build the  resgisterUser Controller

const e = require('express');
const User = require('../models/User');

const jwt = require('jsonwebtoken');

const generateToken = (id) => {{

    return jwt.sign({ id },process.env.JWT_SECRET,{ //jwt.sign create a token

        expiresIn:'30d', // this means token will valid for 30days
    });
}};

const registerUser = async (req,res) =>{
    try{
        const {name , email, password} = req.body;
        
        if(!name || !email || !password){
            res.status(400);//bad request
            throw new Error('Please add all fields');
        }

        const userExists = await User.findOne({ email });

        if(userExists){
            res.status(400);

            throw new Error('User Already exists');
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if(user){

            res.status(201).json({
                _id : user.id,
                name : user.name,
                email : user.email,
                token : generateToken(user._id),
            });
        }
        else{
            res.status(400);
            throw new Error('Invalid user data');
        }
    }
    catch(error){

        res.status(res.statusCode || 500).json({message : error.message })
    }
}

module.exports = {
    registerUser,
}