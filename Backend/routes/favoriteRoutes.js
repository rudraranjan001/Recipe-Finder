const express = require('express');

const { protect } = require('../middleware/authMiddleware');

const User = require('../models/User');
const asyncHandler = require('express-async-handler');

const router = express.Router();

const getFavorites = (req,res) =>{
    res.send('GET / api/favorites route - This will fetch all the favorite recipes for the logged-in user.')
};

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

const removeFavorite = (req,res)  => {
    const { recipeId }  = req.params;
    res.send(`DELETE /api/favorites/${recipeId} route`)
}

router.route('/')
    .get(protect,getFavorites)
    .post(protect,addFavorite);

router.route('/.recipeId')
    .delete(protect , removeFavorite);
    
//Export the router so it can be imported and used in our main `server.js` file.
module.exports = router;