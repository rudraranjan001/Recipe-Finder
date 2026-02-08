import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_API_URL + '/api/users';

export const register = async (userData) => {
    try{

        //Why we use axios post?
        //Because we create new resources
        //the first argument is the full URL endpoint,We construct it by appending '/register' to our base API_URL.
        const response = await axios.post(`${API_URL}/register`,userData);

        return response.data;
    }
    catch(error){
        console.error('Registration failed :',error.response.data);
        throw error.response.data;
        
    }
}

export const login = async (useData) =>{
    try{
        const response = await axios.post(`${API_URL}/login`,userData);
        return response.data;
    }catch(error){
        console.error('Login failed :',error.response.data);
        throw error.response.data;
        
        
    }
}