import React, { useState,useEffect } from 'react';
import SearchBar from '../components/SearchBar';
//This is the page where all the user search for the recipes
import { searchRecipe } from '../services/recipeService';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';
import { Container , Grid , Typography , Box } from '@mui/material';

const HomePage = () => {

    const [query,setQuery] = useState('');
    const [recipes,setRecipes] = useState([]);
    const [searched,setSearched] = useState(false);
    const [ loading,setLoading ] = useState(false);

    const handleSearch = async (e) => {

        // setIsLoading(true);
        // setSearch(true);
        if (e) e.preventDefault();
        if (!query.trim()) return;
        
        setLoading(true);
        const results = await searchRecipe(query.trim());
        setRecipes(results || []);
        setSearched(true);
        setLoading(false);

        // try{
        //     const results = await searchRecipe(query);
        //     setRecipes(results);

        // }
        // catch(error){
        //     console.error("Search failed :",error);

        //     setRecipes([]);
            
        // }
        // finally{
        //     setIsLoading(false)
        // }

    };

    // console.log('Current recipes in state :',recipes);
    
    return (
        // <div className="max-w-[1200px] mx-auto p-8 text-center">
        //     <h1>Recipe Home Page</h1>
        //     <p>Search for your favourite recipes here!</p>

        //     <SearchBar onSearch = {handleSearch}/>

        //     {isLoading ? (
        //         <Loader />
        //     ):(
        //         <>
        //                 <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8 mt-8 text-left">
        //         {
        //             recipes.map(recipe =>(

        //                 <RecipeCard key = {recipe.idMeal} recipe = {recipe} />
        //             ))
        //         }
        //             </div>
        //             {/* Adding a user friendly msg for when no result are found */}
        //             {search && recipes.length === 0 &&  (
        //                 <p className="mt-8 text-[1.2rem] text-[#666]">
        //                 No recipes found. Please try a different search term!
        //               </p>
      
        //             )}
        //         </>
        //     )}
            
        // </div>
        <Container sx = {{ py: 4}}>{/*py is padding on y-axis */ }
            <Typography variant='h3' component="h1" align="center" gutterBottom>
                RecipeFinder
            </Typography>
            <Typography variant='h6' align='center' color="text.secondary" paragraph>
                Discover your next favourite meal.Search for any recipe you can imagine!
            </Typography>

            <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} />

            <Grid container spacing={4} sx={{mt:4}}>
                {loading ? (
                    <Box sx = {{display: 'flex',justifyContent: 'center', width:'100%'}}>
                        <Typography>Loading...</Typography>
                    </Box>
                ):(
                    recipes.map((recipe) => (
                        <Grid item key={recipe.idMeal} xs={12} sm={6} md={4} lg={3}>
                            <RecipeCard recipe={recipe} />
                        </Grid>
                    ))
                )}
            </Grid>
            
                {searched && !loading && recipes.length === 0 &&(
                    <Typography align="center" sx={{ mt: 4}}>
                        No recipes found for "{query}".Please try another 
                    </Typography>
                )}
            
        </Container>
        
    );
};

export default HomePage;
