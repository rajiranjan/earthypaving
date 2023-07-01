import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.map((review) => (
        <div key={review._id}>
          <div>Rating: {review.rating}</div>
          <div>Comment: {review.comment}</div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
