import React from 'react'
import { useEffect } from 'react'
import { searchRecipe } from './services/recipeService'

function App() {

  useEffect (() =>{
    const fetchInitialRecipes = async () => {
      console.log('Fetching initial data...');;

      const recipe = await searchRecipe('pasta');

      console.log('Fetched Recipes :',recipe);
      
      
    };

    fetchInitialRecipes();
  },[]);

  return (
    <div>
      <h1>
        Recipe Finder
      </h1>
      <p>Open the developer console to see the fetch recipe data</p>
    </div>
  )
}

export default App