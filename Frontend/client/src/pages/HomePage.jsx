import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
//This is the page where all the user search for the recipes
import { searchRecipe } from '../services/recipeService';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';


const HomePage = () => {

    const [recipes,setRecipes] = useState([]);
    const [search,setSearch] = useState(false);
    const [ isLoading,setIsLoading ] = useState(false);

    const handleSearch = async(query) => {

        setIsLoading(true);
        setSearch(true);

        try{
            const results = await searchRecipe(query);
            setRecipes(results);

        }
        catch(error){
            console.error("Search failed :",error);

            setRecipes([]);
            
        }
        finally{
            setIsLoading(false)
        }

    };

    // console.log('Current recipes in state :',recipes);
    
    return (
        <div className="max-w-[1200px] mx-auto p-8 text-center">
            <h1>Recipe Home Page</h1>
            <p>Search for your favourite recipes here!</p>

            <SearchBar onSearch = {handleSearch}/>

            {isLoading ? (
                <Loader />
            ):(
                <>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8 mt-8 text-left">
                {
                    recipes.map(recipe =>(

                        <RecipeCard key = {recipe.idMeal} recipe = {recipe} />
                    ))
                }
                    </div>
                    {/* Adding a user friendly msg for when no result are found */}
                    {search && recipes.length === 0 &&  (
                        <p className="mt-8 text-[1.2rem] text-[#666]">
                        No recipes found. Please try a different search term!
                      </p>
      
                    )}
                </>
            )}
            
        </div>
        
    );
};

export default HomePage;