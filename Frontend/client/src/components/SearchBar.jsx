 
 
import React , {useState} from 'react'
import { Box, TextField , Button } from '@mui/material';

export default function SearchBar({ query,setQuery, handleSearch }) {

    // const [query,setQuery] = useState('');

    // const handleInputChange = (event) => {
    //     setQuery(event.target.value);
    // }

    // const handleSubmit = (event) => {

    //     event.preventDefault();

    //     if(query.trim()){
    //         onSearch(query);
    //     }
        
    //     setQuery('');
    // }
  return (
      <Box
      component="form"
      onSubmit={handleSearch}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        marginBottom: 4,
      }}
      >
        <TextField
            variant="outlined"

            label="Search for a recipe..."
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />

        <Button 
        type='submit'
        variant='contained'
        color='primary'
        sx={{height: '56px', padding: '0 30px'}}
        >
            Search
        </Button>
      </Box>
  )
}
