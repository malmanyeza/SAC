import React, { useContext, useState } from 'react';
import './styles/RatingsModal.css'; // Your CSS for styling
import { ProductsContext } from '../../hooks/productsContext';
import { UserDataContext } from '../../hooks/userDataContext';

const RatingsModal = () => {
  const [rating, setRating] = useState(0); // Initial rating state
  const [comment, setComment] = useState(''); // Initial comment state

  const {submitRating, setIsRatingsModalOpen, isRatingsModalOpen} = useContext(ProductsContext)
  const {userData} = useContext(UserDataContext)

  // Function to handle clicking on a star
  const handleStarClick = (clickedRating) => {
    setRating(clickedRating);
  };

  // Function to handle submitting the rating
  const handleSubmit = () => {
    submitRating(userData.email,rating,comment)
  };

  return (
    <div className={isRatingsModalOpen ? "ratings-modal-wrapper active" : "ratings-modal-wrapper"}>
      <div className="ratings-modal">
        <div className="ratings-modal-header">
          <h2>Rate Your Experience</h2>
          <button className="ratings-close-btn" onClick={() => setIsRatingsModalOpen(false)}>Close</button>
        </div>
        <div className="ratings-modal-body">
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= rating ? 'star selected' : 'star'}
                onClick={() => handleStarClick(star)}
              >
                &#9733; {/* Unicode for star symbol */}
              </span>
            ))}
          </div>
          <div className="comment-box">
            <h3>Optional</h3>
            <textarea
              placeholder="Enter your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="ratings-modal-footer">
          <button className="ratings-submit-button" onClick={handleSubmit}>Submit Rating</button>
        </div>
      </div>
    </div>
  );
}

export default RatingsModal;
