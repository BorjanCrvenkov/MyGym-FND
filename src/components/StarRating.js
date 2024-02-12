import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const StarRating = ({ value, color = '#decd80' }) => {
    const stars = [];
    const starStyle = {
        marginRight: '5px',
        fontSize: '20px',
    };

    const fullStars = Math.floor(value);
    const hasHalfStar = value - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
        stars.push(
            <FaStar key={i} color={color} style={starStyle} />
        );
    }

    if (hasHalfStar) {
        stars.push(
            <FaStarHalfAlt key={fullStars} color={color} style={starStyle} />
        );
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
        stars.push(
            <FaStar key={fullStars + i + 1} color="#e4e5e9" style={starStyle} />
        );
    }

    return (
        <div>
            {stars}
        </div>
    );
};

export default StarRating;
