 
 
import React , {useState} from 'react'

export default function SearchBar({ onSearch }) {

    const [query,setQuery] = useState('');

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    }

    const handleSubmit = (event) => {

        event.preventDefault();

        if(query.trim()){
            onSearch(query);
        }
        
        setQuery('');
    }
  return (
     <form onSubmit={handleSubmit} >
        <input  type = "text" placeholder='Search for a recipe'
        value = {query}

        onChange={handleInputChange}
        />
        <button type='submit'>Search</button>
     </form>
    
  )
}
