import React from 'react';
import './styles/LoginSignupButtons.css'; // CSS for styling

const LoginSignupButtons = () => {
  return (
    <div className="login-signup-buttons">
      <hr className="divider" />
      <button className="signin-button">Sign In</button>
      <div className="or-text">or</div>
      <button className="signup-button">Sign Up</button>
    </div>
  );
}

export default LoginSignupButtons;
