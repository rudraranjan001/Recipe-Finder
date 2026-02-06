import React from 'react'

function RecipeCard({recipe}) {
    const {strMeal , strMealThumb} = recipe;
  return (
    <div className='flex flex-col overflow-hidden bg-white border border-[#e0e0e0] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-200 ease-in-out cursor-pointer hover:-translate-y-[5px] hover:shadow-[0_8px_16px_rgba(0,0,0,0.12)]'>
        <img src={strMealThumb} alt = {strMeal} className='w-full h-[200px] object-cover' />

        <div className="p-4">
            <h3 className="m-0 text-xl font-semibold text-[#333]">{strMeal}</h3>
        </div>
    </div>
  )
}

export default RecipeCard