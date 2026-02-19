import React from 'react'
import { Link } from 'react-router-dom';
import {
  Card , 
  CardActionArea ,
  CardMedia ,
  CardContent ,
  Typography 
} from '@mui/material';


function RecipeCard({recipe}) {
    const {idMeal,strMeal , strMealThumb} = recipe;
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

    <CardActionArea 
      component= {Link}
      to={`/recipe/${recipe.idMeal}`}
      sx={{ flexGrow: 1}}
      >

        <CardMedia
          component="img"
          height="200"
          image={recipe.strMealThumb}
          alt={recipe.strMeal}
        />

        <CardContent>

          <Typography gutterBottom variant='h6' component="div" >
            {recipe.strMeal}
          </Typography>

        </CardContent>

      </CardActionArea>

    </Card>
    // <Link to = {`/recipe/${idMeal}`} className='block no-underline text-inherit'> 
    //   <div className='flex flex-col overflow-hidden bg-white border border-[#e0e0e0] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-200 ease-in-out cursor-pointer hover:-translate-y-[5px] hover:shadow-[0_8px_16px_rgba(0,0,0,0.12)]'>
    //       <img src={strMealThumb} alt = {strMeal} className='w-full h-[200px] object-cover' />

    //       <div className="p-4">
    //           <h3 className="m-0 text-xl font-semibold text-[#333]">{strMeal}</h3>
    //       </div>
    //   </div>
    // </Link>
  )
}

export default RecipeCard;