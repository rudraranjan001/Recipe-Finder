
import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../services/recipeService';
import Loader from '../components/Loader';


export default function RecipePage() {
  //We use the useParams to get the ID from the URL
  const { recipeId } = useParams();

  //Initialize state for the recipe details. We start with `null` because we don't have a recipe yet.
  const [recipe,setRecipe] = useState(null);
  const [ loading , setLoading ] = useState(true);


  // console.log("URL Params : ",recipeId);
  
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try{
        setLoading(true); //ensure loading is true at the start of the fetch
        const data = await getRecipeById(recipeId);
        // console.log("API Data:", data);
        if(data.meals){
          setRecipe(data.meals[0]);
        }
        else{
          setRecipe(data);
        }
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
  },[recipeId ])

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
    return <Loader />

  }

  if(!recipe){
    return <div className="text-center text-2xl mt-16 text-gray-500">Recipe not found. </div>
  }

  return (
    <div className='max-w-[960px] mx-auto my-8 p-6 bg-white rounded-xl shadow-lg'>

        <h1 className='text-center mb-8 text-4xl text-gray-800'>
          {recipe.strMeal}
          </h1>

        <div className="flex flex-wrap gap-8 mb-8">

          <div className="flex-1 min-w-[300px]">

            <img src = {recipe.strMealThumb} alt={recipe.strMeal} className='w-full h-auto rounded-xl shadow-md' />

          </div>
          
          <div className="flex-1 min-w-[300px]">

            <h2 className="text-2xl text-gray-700 border-b-2 border-orange-400 pb-2 mb-4">Ingredients</h2>

            <ul className="list-none p-0">
              {ingredients.map((item,index) =>(
                <li key = {index}
                   className="bg-gray-50 border-l-4 border-orange-400 px-4 py-3 mb-2 rounded-r-md"
                >
                  <strong>
                    {item.ingredient}
                    </strong> - {item.measure}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-[1.75rem] font-semibold text-[#444] border-b-2 border-[#f0a500] pb-2 mb-4">Instructions</h2>
          {recipe?.strInstructions
            ?.split('\n')
            .map((line, index) =>
    line.trim() ? <p key={index} className="leading-[1.8] text-[1.1rem] mb-4 text-[#555]">{line}</p> : null
  )}

        </div>


    </div>

  );
};
// useParams hook to make your RecipePage component "URL-aware.
