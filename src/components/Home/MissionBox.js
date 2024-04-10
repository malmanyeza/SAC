import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './styles/MissionBox.css'; // CSS for styling

const MissionBox = () => {
  const [displayText, setDisplayText] = useState('');
  const [showButton, setShowButton] = useState(false);
  const missionText = 'Whhere art meets the culture!';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i === missionText.length - 1) {
        setDisplayText((prevText) => prevText + missionText[i]);
        clearInterval(interval);
        setShowButton(true);
      } else {
        setDisplayText((prevText) => prevText + missionText[i]);
        i++;
      }
    }, 100); // Adjust the speed of text display here (in milliseconds)

    return () => {
      clearInterval(interval);
    };
  }, [missionText]);

  return (
    <div className="mission-box">
      <div className="mission-text">{displayText}</div>
      {showButton && (
        <Link to="/catalogue" className="view-all-btn">
          View Products
        </Link>
      )}
    </div>
  );
};

export default MissionBox;
