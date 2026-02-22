// import  from 'react'
import React ,{ useEffect,useState } from 'react'
import { searchRecipe } from './services/recipeService'
import { Routes,Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
import FavoritesPage from './pages/FavoritesPage';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import { Box } from '@mui/material';
import NotFoundPage from './pages/NotFoundPage';

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
     <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
     
      <Navbar /> {/* Render the navbar here,so its always visible*/}

      <main style = {{flexGrow: 1}}>
       <Routes>
          <Route path = "/" element = {<HomePage />} >
          </Route>

          <Route path='/recipe/:recipeId' element = {<RecipePage />} />
          {/* The colon (:) in front of recipeId is special. It tells react-router-dom that this part of the path is a parameter */}

          {/* Add the new routes for login and register */}
          
          <Route path = "/login" element= {<LoginPage />}/>

          <Route path = "/register" element = {<RegisterPage />} />

          {/* Highlight:Add the new protected route */}
          {/* This route is for the /favorites path
                The `element` is wrapped with our ProtectedRoute component */}
          <Route 
            path='/favorites'
            element = {
              <ProtectedRoute>
                {/* The FavoritePage is passed as a child for ProtectedRoute. */}
                <FavoritesPage />
              </ProtectedRoute>
            }
            />
            <Route path= "*" element= {<NotFoundPage />} />
       </Routes>
      </main>
      <Footer />
    </Box>
  )
}

export default App