const express = require('express');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const getFavorites = (req,res) =>{
    res.send('GET / api/favorites route - This will fetch all the favorite recipes for the logged-in user.')
};

const addFavorite = (req,res) =>{
    res.send(`POST /api/Favorites route - This will add a Favorite for user ${req,user.name}.`)
}

const removeFavorite = (req,res)  => {
    const { recipeId }  = req.params;
    res.send(`DELETE /api/favorites/${recipeId} route - This will remove a favorite.`)
}

router.route('/')
    .get(protect,getFavorites)
    .post(protect,addFavorite);

router.route('/.recipeId')
    .delete(protect , removeFavorite);
//Export the router so it can be imported and used in our main `server.js` file.
module.exports = router;