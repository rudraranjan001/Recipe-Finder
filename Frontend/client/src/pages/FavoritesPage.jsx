import React from 'react'
import { useState , useEffect } from 'react'
import { getFavorites } from '../services/favoriteService'

export default function FavoritesPage() {

  const [favoriteIds , setFavoriteIds] = useState([]);

  const [loading , setLoading ] = useState(null);

  const [error,setError] = useState(null);

  useEffect (() => {
    
    const fetchFavoriteIds = async () => {
      try{
        
        setError(null);
        setLoading(true);

        const ids = await getFavorites();
        
        setFavoriteIds(ids);

      }catch(err){

          setError(err.message || `An error occured while fetching your favorites.`)

      }finally{
        setLoading(false);
      }
    };
    fetchFavoriteIds();

  },[])

  if(loading){
    return <div className="text-center mt-16 text-[1.2rem] text-[#555]">Loading your favorite recipes....</div>
  }

  if(error){
    return <div className="text-[#721c24] bg-[#f8d7da] p-4 rounded-lg max-w-[500px] my-16 mx-auto text-center text-[1.2rem]">{error}</div>
  }

  return (
    <div className="max-w-[1200px] mx-auto p-8 text-center">
        <h1 className='mb-4 text-[2.5rem] text-[#333]'>
            My Favorite Recipes
            
        </h1>
        {favoriteIds.length === 0 ? (
            <p className='text-[1.1rem] text-[#666]'> You have'nt saved any favorite recipe yet. Start exploring!</p>
        ) : (
          <div>
            <p className='text-[1.1rem] text-[#666]'>You have {favoriteIds.length} favorite recipes.</p>
              <div className="mt-8 p-4 bg-[#f1f1f1] rounded-lg text-left">
                <h3>(For Debugging) Your Favorite Recipe IDs :</h3>
                <ul>
                  {favoriteIds.map(id => <li key = {id}>{id}</li>)}
                </ul>
              </div>
          </div>
        )}
        
    </div>
  )
}
