import React from 'react';
import './styles/ScrollUpFloatingButton.css'; // CSS for styling
import { IoIosArrowUp } from 'react-icons/io'; // Import IoIosArrowUp icon

const ScrollUpFloatingButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="floating-btn" onClick={scrollToTop}>
      <a href="#" className="arrow-up-link">
        <IoIosArrowUp className="arrow-up-icon" style={{ fontSize: "20px", margin: "auto" }} />
      </a>
    </div>
  );
}

export default ScrollUpFloatingButton;
