const express = require('express');

const { protect } = require('../middleware/authMiddleware');

const User = require('../models/User');
const asyncHandler = require('express-async-handler');

const router = express.Router();

//Why we use asyncHandler?
//We wrap our controller in 'asyncHandler for clean , centralized error management.
//No request input: the only input  it needs is the req.user object, which is conveniently provided by our middleware
const getFavorites = asyncHandler(async(req,res) =>{
    // res.send('GET /api/favorites route - This will fetch all the favorite recipes for the logged-in user.')
    const user = await User.findById(req.user._id);

    if(user){
        res.status(200).json(user.favorites);
    }
    else{
        res.status(401);
        throw new Error('User not found');
    }
});

const addFavorite = asyncHandler(async(req,res) =>{
    const { recipeId } = req.body;

    if(!recipeId){
        res.status(400);
        throw new Error('Recipe ID is required');
    }
    const user = await User.findById(req.user._id);

    if(user){
        if(user.favorites.includes(recipeId)){
            res.status(400);
            throw new Error('Recipe is already in favorites');
        }
    

        user.favorites.push(recipeId);
        await user.save();

        res.status(201).json({
            message: 'Recipe added to favorite successfully',
            favorites: user.favorites,
        });
    }
    else{
        res.status(404);
        throw new Error('User not found');
    }
})

const removeFavorite = asyncHandler(async(req,res)  => {
    const { recipeId }  = req.params;

    //Use 1findByIdAndUpdate` to find the user and modify their doc in one step
    //The first argument is the ID of the document to find which we get from our protect middleware
    const updateUser = await User.findByIdAndUpdate(
        req.user._id,
        //The second argument is the update operation.
        //`$pull` is a Mongoose operator that removes from an existing array
        // Here, we tell it to pull the `recipeId` from the `favorites` array
        {
            $pull: { favorites: recipeId },
        },
        {
            //The third argument is an options object
            //`new : true` tells Mongoose to return the modified document "after " the update
            new : true,
        }
    );
    if(updateUser){
        res.status(200).json({
            message : 'Recipe removed from favorite successfully',
            favorites : updateUser.favorites,
        });
    }
    else{
        res.status(404);
        throw new Error('User not found');
    }

    // res.send(`DELETE /api/favorites/${recipeId} route`)
});

router.route('/')
    .get(protect,getFavorites)
    .post(protect,addFavorite);

router.route('/:recipeId')
    .delete(protect , removeFavorite);
    
//Export the router so it can be imported and used in our main `server.js` file.
module.exports = router;