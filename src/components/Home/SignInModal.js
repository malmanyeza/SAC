import React, { useState } from 'react';
import './styles/SignInModal.css'; // CSS for styling

const SignInModal = ({ setShowModal }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log(formData);
    // Close the modal after submitting
    setShowModal(false);
  };

  return (
    <div className="signIn-modal">
      <div className="signIn-modal-content">
        <div className="signIn-modal-header">
          <h2>Sign In</h2>
          <button className="signIn-close-button" onClick={() => setShowModal(false)}>×</button>
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
            <button type="submit" className="modal-signin-button">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInModal;
