import React, { useState, useContext } from 'react';
import './styles/SignInModal.css'; // CSS for styling
import { UserDataContext } from '../../hooks/userDataContext';

const SignInModal = () => {
  const { loginWithEmailAndPassword, setIsLoginInProcess, isLoginInBackground } = useContext(UserDataContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email or password is empty
    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    // Call the signInWithEmailAndPassword function
    loginWithEmailAndPassword(formData.email, formData.password);
  };

  return (
    <div className="signIn-modal">
      <div className="signIn-modal-content">
        <div className="signIn-modal-header">
          <h2>Sign In</h2>
          <button className="signIn-close-button" onClick={() => setIsLoginInProcess(false)}>×</button>
        </div>
        <div className="signIn-modal-body">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input-field"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="input-field"
            />
            {error && <div className="error-message">{error}</div>}
            <button
              type="submit"
              className={`modal-signin-button ${isLoginInBackground ? 'inactive' : ''}`}
              disabled={isLoginInBackground}
            >
              {isLoginInBackground ? <div className="spinner"></div> : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
