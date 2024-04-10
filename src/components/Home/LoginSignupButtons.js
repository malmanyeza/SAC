import React, { useState } from 'react';
import './styles/LoginSignupButtons.css'; // CSS for styling
import SignInModal from './SignInModal'; // Import the SignInModal component
import SignUpModal from './SignUpModal'; // Import the SignUpModal component

const LoginSignupButtons = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleSignInClick = () => {
    setShowSignInModal(true);
  };

  const handleSignUpClick = () => {
    setShowSignUpModal(true);
  };

  return (
    <div className="login-signup-buttons">
      <hr className="divider" />
      <button className="signin-button" onClick={handleSignInClick}>Sign In</button>
      <div className="or-text">or</div>
      <button className="signup-button" onClick={handleSignUpClick}>Sign Up</button>
      {showSignInModal && <SignInModal setShowModal={setShowSignInModal} />}
      {showSignUpModal && <SignUpModal setShowModal={setShowSignUpModal} />}
    </div>
  );
}

export default LoginSignupButtons;
