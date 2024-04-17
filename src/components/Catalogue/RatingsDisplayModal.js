import React, { useState, useEffect, useContext } from 'react';
import { ProductsContext } from '../../hooks/productsContext';
import './styles/RatingsDisplayModal.css'; // Your CSS for styling

const RatingsDisplayModal = ({ showModal, setShowModal }) => {
  const { ratings , setIsReviewModalOpen} = useContext(ProductsContext);
  const [averageRating, setAverageRating] = useState(6.7);

  // Calculate average rating when ratings change
  useEffect(() => {
    if (ratings.length === 0) {
      setAverageRating(0);
      return;
    }

    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    const average = totalRating / ratings.length;
    setAverageRating(average);
  }, [ratings]);

  // Function to render star icons based on rating
  const renderStars = (rating) => {
    const filledStars = Array.from({ length: rating }, (_, index) => index + 1);
    const emptyStars = Array.from({ length: 5 - rating }, (_, index) => index + rating + 1);

    return (
      <>
        {filledStars.map((star) => (
          <span key={star} className="display-star-filled">&#9733;</span>
        ))}
        {emptyStars.map((star) => (
          <span key={star} className="display-star-empty">&#9733;</span>
        ))}
      </>
    );
  };

  return (
    <div className={showModal ? "display-ratings-modal active" : "display-ratings-modal"}>
      <div className="display-ratings-modal-content">
        <div className="display-ratings-modal-header">
          <h2>Average Rating: {averageRating.toFixed(1)}</h2>
          <button className="display-close-btn" onClick={() => setIsReviewModalOpen(false)}>Close</button>
        </div>
        <div className="display-ratings-list">
          {ratings.map((rating, index) => (
            <div key={index} className="display-rating-item">
              <div className="display-rater-email">{rating.raterEmail}</div>
              <div className="display-rating-stars">{renderStars(rating.rating)}</div>
              <div className="display-rating-comment">{rating.comment}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingsDisplayModal;
