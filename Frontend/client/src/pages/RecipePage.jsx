
import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../services/recipeService';

export default function RecipePage() {
  //We use the useParams to get the ID from the URL
  const { recipeId } = useParams();

  //Initialize state for the recipe details. We start with `null` because we don't have a recipe yet.
  const [recipe,setRecipe] = useState(null);
  const [ loading , setLoading ] = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try{
        setLoading(true); //ensure loading is true at the start of the fetch
        setRecipe(data);
      }
      catch(error){

      }
      finally{

        //This `finally` block ensures that loading is set to false after the
        // fetch attempt is complete, whether it succeeded or failed.
        setLoading(false);
      }
    }
  })
  return (
    <div>
        <h1>Recipe Detail Page</h1>
        <p>Details for  recipe ID :<strong>{ recipeId }</strong></p>
    </div>

  );
};
// useParams hook to make your RecipePage component "URL-aware.
