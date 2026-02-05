 
 
import React , {useState} from 'react'

export default function SearchBar() {

    const [query,setQuery] = useState('');

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    }

    const handleSubmit = (event) => {

        event.preventDefault();

        console.log('Searching for: ',query);
        
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
