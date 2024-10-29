import React from 'react'
import MealDetailsSection from '../components/MealDetails/MealDetailsSection'
import MealDetailsSection2 from '../components/MealDetails/MealDetailsSection2'

const MealDetails = () => {
  return (
    <div className='flex flex-col gap-6 min-h-screen'>
      <h1 className='text-xl font-semibold'>Meal Details</h1>
      <MealDetailsSection2/>
    </div>
  )
}

export default MealDetails
