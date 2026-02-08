import axios from 'axios';

//This line securely get the api that is stored in .env.local.file
const API_URL = import.meta.env.VITE_RECIPE_API_URL;


//Creating new instance of axios with a custom configuration
const recipeApi = axios.create({

    //'baseURL' is a core setting that tells axios to add to begining this URL
    baseURL : API_URL,
})

// @param {string} query - the search term 
// @returns {Promise<Array>} a promise that resolve to an array of meal objects.
//Returns an empty array if no meals are found or if an error occurs

export const searchRecipe = async (query) => {
    try{
        // const response = await recipeApi.get(`/search.php?s=${query}`)
        // console.log(API_URL);
        
        const response = await recipeApi.get(`/search.php?s=${query}`)


        return response.data.meals || []; // this check if the response.data.meals is not empty return it if it is return empty array
    }
    catch(error){
        console.error('Error fetching recipes :',error);
        
        return [];
    }
}

export const getRecipeById = async (id) => {
    try{
        const response = await recipeApi.get(`/lookup.php?i=${id}`);
        
        return response.data.meals ? response.data.meals[0] : null;
    }
    catch(error){
        console.error(`Error fetching recipe by ID ${id}`);
        return null;
        
    }
}

export default recipeApi;