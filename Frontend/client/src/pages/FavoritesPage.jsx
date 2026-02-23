import React from 'react'
import { useState , useEffect } from 'react'
import { getFavorites,removeFavorite } from '../services/favoriteService'
import { getRecipeById } from '../services/recipeService';
import RecipeCard from '../components/RecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorComponent from '../components/ErrorComponent';
import { Container , Grid , Typography, Button } from '@mui/material';


export default function FavoritesPage() {

  const [favoriteRecipes , setFavoriteRecipes] = useState([]);

  const [loading , setLoading ] = useState(null);

  const [error,setError] = useState(null);

  useEffect (() => {
    
    const fetchFavorites = async () => {
      try{
        setLoading(true);
        setError(null);
        

        const ids = await getFavorites();
        if(ids.length === 0){
          setFavoriteRecipes([]);
          setLoading(false);

          return;
        }
        
        const recipePromises = ids.map((id) => getRecipeById(id));
        const recipes = await Promise.all(recipePromises);
        

        //Use `Promise.all` to wait for All the individual recipe fetches to complete.
        //This is incredibly efficient as it runs the request in parallel

        //Update our state with the final array of full recipe objects.
        setFavoriteRecipes(recipes);

      }catch(err){

          setError(err.message || `An error occured while fetching your favorites.`)

      }finally{
        setLoading(false);
      }
    };
    fetchFavorites();

  },[])

  const handleRemoveFavorite = async (recipeId) => {
    try{
      await removeFavorite(recipeId);
      setFavoriteRecipes((prevRecipes) => 
        prevRecipes.filter((recipe) => recipe.idMeal !== recipeId)
      );
    }catch(err){
      console.error('Failed to remove favorite :',err);
      alert(err.message || 'Could not remove favorite. Please try again later.')
      
    }
  }

  if(loading){
    return <LoadingSpinner />
  }

  if(error){
    return (
      <Container sx={{ py: 4 }}>
        <ErrorComponent message={error} />
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        My Favorite Recipes
      </Typography>
      
      {favoriteRecipes.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ mt: 4 }}>
          You haven't saved any favorite recipes yet. Start exploring!
        </Typography>
      ) : (
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {favoriteRecipes.map(recipe => (
            <Grid item key={recipe.idMeal} xs={12} sm={6} md={4} lg={3}>
              <div className="favorite-card-container"> {/* This can be a Box if you remove the CSS */}
                <RecipeCard recipe={recipe} />
                <Button 
                  onClick={() => handleRemoveFavorite(recipe.idMeal)}
                  className="remove-button"
                  fullWidth
                  variant="contained"
                  color="error"
                  sx={{ mt: -1, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                >
                  Remove
                </Button>
              </div>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}
