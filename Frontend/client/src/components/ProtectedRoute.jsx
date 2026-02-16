import React from 'react'
import { Navigate , useLocation } from 'react-router-dom'
//It is for navigation and tracking the location
import { useAuth } from '../context/AuthContext'
//Import our custom `useAuth` hook to access the authentication context
// This hook provide us with the `user` and `loading` state.


export default function ProtectedRoute({ children }) {

    const { user, loading } = useAuth();

    const location = useLocation();

    if(loading){
        return <div>Loading...</div>
    }

    if(!user){
        return <Navigate to="/login" replace state = {{ from : location }}/>

    }

  return  children;
  
}
