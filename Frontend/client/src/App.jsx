// import  from 'react'
import React ,{ useEffect,useState } from 'react'
import { searchRecipe } from './services/recipeService'
import { Routes,Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';

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
      <Navbar /> {/* Render the navbar here,so its always visible*/}

      <main>
       <Routes>
          <Route path = "/" element = {<HomePage />} >
          </Route>

          <Route path='/recipe/:recipeId' element = {<RecipePage />} />
          {/* The colon (:) in front of recipeId is special. It tells react-router-dom that this part of the path is a parameter */}

          {/* Add the new routes for login and register */}
          
          <Route path = "/login" element= {<LoginPage />}/>

          <Route path = "/register" element = {<RegisterPage />} />

       </Routes>
      </main>
    </div>
  )
}

export default App