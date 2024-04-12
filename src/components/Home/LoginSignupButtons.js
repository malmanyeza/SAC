import React, { useState, useContext } from 'react';
import './styles/LoginSignupButtons.css'; // CSS for styling
import SignInModal from './SignInModal'; // Import the SignInModal component
import SignUpModal from './SignUpModal'; // Import the SignUpModal component
import { UserDataContext } from '../../hooks/userDataContext';

const LoginSignupButtons = () => {

  const {  setIsLoginInProcess, setIsSignUpInProcess, isLoginInProcess,isSignUpInProcess } = useContext(UserDataContext);

  const handleSignInClick = () => {
    setIsLoginInProcess(true);
  };

  const handleSignUpClick = () => {
    setIsSignUpInProcess(true);
  };

  return (
    <div className="login-signup-buttons">
      <hr className="divider" />
      <button className="signin-button" onClick={handleSignInClick}>Sign In</button>
      <div className="or-text">or</div>
      <button className="signup-button" onClick={handleSignUpClick}>Sign Up</button>
      {isLoginInProcess && <SignInModal  />}
      {isSignUpInProcess && <SignUpModal  />}
    </div>
  );
}

export default LoginSignupButtons;
