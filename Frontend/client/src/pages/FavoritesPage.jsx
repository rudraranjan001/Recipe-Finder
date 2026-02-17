import React from 'react'
import { useState , useEffect } from 'react'
import { getFavorites } from '../services/favoriteService'
import { getRecipeById } from '../services/recipeService';
import RecipeCard from '../components/RecipeCard';


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
          setFavoriteIds(ids);
          return;
        }
        
        const recipePromises = await Promise.all(recipePromises);
        //Use `Promise.all` to wait for All the individual recipe fetches to complete.
        //This is incredibly efficient as it runs the request in parallel

        setFavoriteRecipes(recipes);

      }catch(err){

          setError(err.message || `An error occured while fetching your favorites.`)

      }finally{
        setLoading(false);
      }
    };
    fetchFavorites();

  },[])

  if(loading){
    return <div className="text-center mt-16 text-[1.2rem] text-[#555]">Loading your favorite recipes....</div>
  }

  if(error){
    return <div className="text-[#721c24] bg-[#f8d7da] p-4 rounded-lg max-w-[500px] my-16 mx-auto text-center text-[1.2rem]">{error}</div>
  }

  return (
    <div className="max-w-[1200px] mx-auto p-8 text-center">
        <h1 className='mb-4 text-[2.5rem] text-[#333]'>
            My Favorite Recipes
            
        </h1>
        {favoriteRecipes.length === 0 ? (
            <p className='text-[1.1rem] text-[#666]'> You have'nt saved any favorite recipe yet. Start exploring!</p>
        ) : (
           
              <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8 py-8">
                {favoriteRecipes.map(recipe => (
                  <RecipeCard key = {recipe.idMeal} recipe = {recipe} />
                ))}
              </div>
        )}
        
    </div>
  )
}
