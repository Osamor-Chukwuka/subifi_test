import React, { useEffect, useState } from 'react';
import { FaStarHalfAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import "../styles/styles.css";

export default function Rating({ rating }) {
    // Ensure rating is within the valid range (0 to 5)
    const safeRating = Math.max(0, Math.min(rating, 5));

    const fullStars = Math.floor(safeRating); // Get the whole number part
    const hasHalfStar = safeRating % 1 !== 0; // Check if there's a decimal
    const totalStars = 5; // Maximum stars
    
    return (
        <div>
            <div className='flex items-center space-x-1 mt-2 text-yellow-500'>
                {/* Full Stars */}
                {[...Array(fullStars)].map((_, i) => (
                    <FaStar key={i} />
                ))}

                {/* Half Star (if there's any decimal) */}
                {hasHalfStar && <FaStarHalfAlt key="half" />}

                {/* Empty Stars (to fill up to 5 stars) */}
                {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
                    <FaRegStar key={`empty-${i}`} />
                ))}
            </div>
            <p className='text-gray-500 text-sm text-center'>({rating})</p>
        </div>
    )
}