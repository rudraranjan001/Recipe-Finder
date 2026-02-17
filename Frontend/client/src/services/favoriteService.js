import axios from 'axios'
import { AuthProvider } from '../context/AuthContext';

const API_URL = `${import.meta.env.VITE_BACKEND_API_URL}/api/favorites`;

export const addFavorite = async ( recipeId ) => {
    const token = localStorage.getItem('token');

    if(!token){
        throw new Error('You must be logged in to add a favorite')
    }

    const config = {
        headers : {
            Authorization: `Bearer ${token}`,
        },
    };

    const body = { recipeId };

    try{
        const response = await axios.post(API_URL,body,config);
        return response.data;
    }
    catch(error){
        throw error.response.data || new Error(`An unknown error occured.`);
    }

}

export const getFavorites = async () => {
    const token = localStorage.getItem('token');
    if(!token){
        throw new Error('Authentication token not found.')
    }

    const config = {
        headers : {
            Authorization: `Bearer ${token}`,
        },
    };

    try{
        const response = await axios.get(API_URL , config);

        return response.data;
    }
    catch(error){
        throw error.response.data || new Error('Failed to fetch favorites.')
    }
}

export const removeFavorite = async (recipeId) => {
    const token = localStorage.getItem('token');
    
    if(!token){
        throw new Error('Authentication token not found');
    }
    const config = {
        headers : {
            Authorization: `Bearer ${token}`,
        },
    };

    try{
        const response = await axios.delete(`${API_URL}/${recipeId}`,config);

        return response.data;
    }
    catch(error){
        throw error.response.data || new Error('Failed to remove favorite Recipe')
    }
}