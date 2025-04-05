import { StarIcon } from 'lucide-react'
import React from 'react'

const Star = ({rating, handleRatingChange}) => {
  return (
   [1,2,3,4,5].map((star)=>{
    return(
        <button
        onClick={handleRatingChange ? ()=>handleRatingChange(star): null} className={`p-2 rounded-full transition-colors flex ${star <= rating?"text-yellow-500 " :" text-black   "}`
        }>
        <StarIcon className={`w-5 h-5 ${star<=rating ? "fill-yellow-300":"fill-white"}`}></StarIcon>
    </button>
    )
    
   })
  )
}

export default Star