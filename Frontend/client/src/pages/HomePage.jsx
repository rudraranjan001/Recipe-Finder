import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
//This is the page where all the user search for the recipes
import { searchRecipe } from '../services/recipeService';

const HomePage = () => {

    const [recipes,setRecipes] = useState([]);

    const handleSearch = async(query) => {
        console.log(`Searching for recipe with query :${query}`);

        const results = await searchRecipe(query);
        setRecipes(results);  
    };

    console.log('Current recipes in state :',recipes);
    
    return (
        <div>
            <h1>Recipe Home Page</h1>
            <p>Search for your favourite recipes here!</p>
            <SearchBar onSearch = {handleSearch}/>
        </div>
    );
};

export default HomePage;