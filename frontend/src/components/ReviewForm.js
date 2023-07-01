// import React, { useState } from 'react';
// import axios from 'axios';

// const ReviewForm = () => {
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState('');

//   const handleStarClick = (value) => {
//     setRating(value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const reviewData = { rating, comment };

//     try {
//       const response = await axios.post('/reviews', reviewData);
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }

//     setRating(0);
//     setComment('');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         {[1, 2, 3, 4, 5].map((value) => (
//           <span
//             key={value}
//             onClick={() => handleStarClick(value)}
//             style={{ cursor: 'pointer' }}
//           >
//             {value <= rating ? '★' : '☆'}
//           </span>
//         ))}
//       </div>
//       <textarea
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//         placeholder="Enter your review"
//       ></textarea>
//       <button type="submit">Submit Review</button>
//     </form>
//   );
// };

// export default ReviewForm;


import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = { rating, comment };

    try {
      const response = await axios.post('http://localhost:8080/reviews', reviewData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    setRating(0);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            onClick={() => handleStarClick(value)}
            style={{ cursor: 'pointer' }}
          >
            {value <= rating ? '★' : '☆'}
          </span>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Enter your review"
      ></textarea>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;