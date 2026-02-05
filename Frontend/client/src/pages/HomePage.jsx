import React from 'react';
import SearchBar from '../components/SearchBar';
//This is the page where all the user search for the recipes


const HomePage = () => {
    return (
        <div>
            <h1>Recipe Home Page</h1>
            <p>Search for your favourite recipes here!</p>
            <SearchBar />
        </div>
    );
};

export default HomePage;