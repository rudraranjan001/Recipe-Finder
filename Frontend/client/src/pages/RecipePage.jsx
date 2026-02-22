
import React from 'react'
import { useContext , useState , useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../services/recipeService';
import Loader from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import { addFavorite } from '../services/favoriteService';
import { Container , Grid , Box , Typography , Button , Stack , Alert } from '@mui/material';
import LoadingSpinner from '../components/LoadingSpinner';

export default function RecipePage() {
  //We use the useParams to get the ID from the URL
  const { recipeId } = useParams();

  //Initialize state for the recipe details. We start with `null` because we don't have a recipe yet.
  const [recipe,setRecipe] = useState(null);
  const [ loading , setLoading ] = useState(true);
  const {user} = useContext(AuthContext);//Consume the AuthContext to get the user status

  const [feedback , setFeedback] = useState({ message: '', type: ''});

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

  const handleSaveToFavorites = async() => {
    setFeedback({ message: '',type: ''});

    try{
      const response = await addFavorite(recipe.idMeal);
      setFeedback({ message: response.message || 'Saved to favorites!.',type: 'success'});
    }catch(err){
      setFeedback({ message: err.message || 'Failed to save favorite.', type: 'error' });
    }
  };

  

  //Data Transformation logic
  //Creating the clean array of ingredients from the raw recipe object
//   const ingredients = [];
//   if(recipe){
//     for(let i = 1;i<= 20;i++){
//       const ingredient = recipe[`strIngredient${i}`];
//       const measure = recipe[`strMeasure${i}`];
    

//     if(ingredient){
//       ingredients.push({ ingredient , measure });
//     }
//     else{
//       break;
//     }
//   }
//  }
  
  if(loading){
    return <LoadingSpinner />

  }

  if(!recipe){
    // return <div className="text-center text-2xl mt-16 text-gray-500">Recipe not found. </div>
    return <Typography>Recipe not found.</Typography>
  }

  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (recipe[`strIngredient${i}`]) {
        ingredients.push(
          `${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`
        );
      }
    }
    return ingredients;
  };

  return (
  //   <div className='max-w-[960px] mx-auto my-8 p-6 bg-white rounded-xl shadow-lg'>

  //       <h1 className='text-center mb-8 text-4xl text-gray-800'>
  //         {recipe.strMeal}
  //         </h1>

  //       <div className="flex flex-wrap gap-8 mb-8">

  //         <div className="flex-1 min-w-[300px]">

  //           <img src = {recipe.strMealThumb} alt={recipe.strMeal} className='w-full h-auto rounded-xl shadow-md' />

  //         </div>
          
  //         {/* --- HIGHLIGHT: Add the button and feedback message with conditional rendering --- */}
  //     {/* This is the core of our conditional UI. The button will only be rendered
  //         if the `user` object exists (i.e., the user is logged in). */}
  //     {user && (
  //       <div className="my-6 text-center">
  //         <button onClick={handleSaveToFavorites} className="px-6 py-3 text-[1.1rem] font-semibold text-white bg-[#f0a500] border-0 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#d89400] hover:-translate-y-0.5">
  //           Save to Favorites
  //         </button>
  //       </div>
  //     )}

  //     {/* This element will render our success or error message. */}
  //     {feedback.message && (
  //       <p className={`text-center p-3 my-4 rounded-lg font-medium border ${
  //           feedback.type === "success"
  //             ? "bg-[#d4edda] text-[#155724] border-[#c3e6cb]"
  //             : "bg-[#f8d7da] text-[#721c24] border-[#f5c6cb]"
  //           }`}>
  //         {feedback.message}
  //       </p>
  //     )}

  //         <div className="flex-1 min-w-[300px]">

  //           <h2 className="text-2xl text-gray-700 border-b-2 border-orange-400 pb-2 mb-4">Ingredients</h2>

  //           <ul className="list-none p-0">
  //             {ingredients.map((item,index) =>(
  //               <li key = {index}
  //                  className="bg-gray-50 border-l-4 border-orange-400 px-4 py-3 mb-2 rounded-r-md"
  //               >
  //                 <strong>
  //                   {item.ingredient}
  //                   </strong> - {item.measure}
  //               </li>
  //             ))}
  //           </ul>
  //         </div>
  //       </div>

  //       <div className="mt-8">
  //         <h2 className="text-[1.75rem] font-semibold text-[#444] border-b-2 border-[#f0a500] pb-2 mb-4">Instructions</h2>
  //         {recipe?.strInstructions
  //           ?.split('\n')
  //           .map((line, index) =>
  //   line.trim() ? <p key={index} className="leading-[1.8] text-[1.1rem] mb-4 text-[#555]">{line}</p> : null
  // )}

  //       </div>


  //   </div>


   <Container sx={{ py: 4 }}>
      {/* --- HIGHLIGHT: The main responsive layout using Grid --- */}
      <Grid container spacing={4} alignItems="flex-start">
        {/* Left Column: Image */}
        <Grid item xs={12} md={5}>
          {/* We use Box with component="img" for better styling control. */}
          <Box
            component="img"
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            sx={{
              width: '100%',
              borderRadius: 2, // Corresponds to theme.shape.borderRadius * 2
              boxShadow: 3, // Applies a theme-based shadow
            }}
          />
        </Grid>

        {/* Right Column: Details */}
        <Grid item xs={12} md={7}>
          {/* Stack is perfect for arranging items vertically with consistent spacing. */}
          <Stack spacing={2}>
            <Typography variant="h3" component="h1">
              {recipe.strMeal}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Category: {recipe.strCategory} | Area: {recipe.strArea}
            </Typography>

            {/* Conditionally render the save button */}
            {user && (
              <Button variant="contained" onClick={handleSaveToFavorites} sx={{ alignSelf: 'flex-start' }}>
                Save to Favorites
              </Button>
            )}

            {/* Display feedback alert */}
            {feedback.message && (
              <Alert severity={feedback.type}>{feedback.message}</Alert>
            )}

            <Box>
              <Typography variant="h5" component="h2" gutterBottom>
                Ingredients
              </Typography>
              {getIngredients().map((ing, index) => (
                <Typography key={index} variant="body1" component="p">
                  - {ing}
                </Typography>
              ))}
            </Box>

            <Box>
              <Typography variant="h5" component="h2" gutterBottom>
                Instructions
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {recipe.strInstructions}
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};
// useParams hook to make your RecipePage component "URL-aware.
