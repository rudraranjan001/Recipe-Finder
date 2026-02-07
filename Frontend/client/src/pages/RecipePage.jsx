
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
        const data = await getRecipeById(recipeId);
        setRecipe(data);
      }
      catch(error){
          console.error('Failed to fetch recipe details',error);
          
      }
      finally{

        //This `finally` block ensures that loading is set to false after the
        // fetch attempt is complete, whether it succeeded or failed.
        setLoading(false);
      }
    };
    fetchRecipeDetails();//calling async function
  },[recipeId])

  //Data Transformation logic
  //Creating the clean array of ingredients from the raw recipe object
  const ingredients = [];
  if(recipe){
    for(let i = 1;i<= 20;i++){
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
    

    if(ingredient){
      ingredients.push({ ingredient , measure });
    }
    else{
      break;
    }
  }
 }
  
  if(loading){
    return<div className="loading-message">Loading recipe...</div>

  }

  if(!recipe){
    return <div className="error-message">Recipe not found. </div>
  }

  return (
    <div className='recipe-page'>
        <h1 className='recipe-page-title'>{recipe.strMeal}</h1>
        <div className="recipe-layout">
          <div className="recipe-image-container">
            <img src = {recipe.strMealThumb} alt={recipe.strMeal} className='recipe-page-image' />
          </div>
          
          <div className="recipe-info-container">
            <h2>Ingredients</h2>
            <ul className="ingredient-list">
              {ingredients.map((item,index) =>(
                <li key = {index}>
                  <strong>{item.ingredient}</strong> - {item.measure}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="recipe-instruction">
          <h2>Instructions</h2>
          {recipe.strInstructions.Split('\n').map((line,index)=>(
            line.trim() && <p key = {index}>{line}</p>
          ))}
        </div>


    </div>

  );
};
// useParams hook to make your RecipePage component "URL-aware.
