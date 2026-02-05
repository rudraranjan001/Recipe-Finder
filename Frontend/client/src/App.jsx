// import  from 'react'
import React ,{ useEffect,useState } from 'react'
import { searchRecipe } from './services/recipeService'
import { Routes,Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';


function App() {

  useEffect (() =>{
    const fetchInitialRecipes = async () => {
      console.log('Fetching initial data...');;

      const recipe = await searchRecipe("Chicken");

      console.log('Fetched Recipes :',recipe);
      
      
    };

    fetchInitialRecipes();
  },[]);

  return (
    <div>
       <Routes>
        <Route path = "/" element = {<HomePage />} >
        </Route>

        <Route path='/recipe/:recipeId' element = {<RecipePage />} />
        
       </Routes>
    </div>
  )
}

export default App