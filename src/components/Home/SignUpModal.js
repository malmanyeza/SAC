import React, { useState } from 'react';
import './styles/SignUpModal.css';

const SignUpModal = ({ setShowModal }) => {
  const [isCustomer, setIsCustomer] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    about: '',
  });

  const handleCustomerClick = () => {
    setIsCustomer(true);
  };

  const handleArtisanClick = () => {
    setIsCustomer(false);
  };

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
  };

  return (
    <div className="signInSignUp-modal">
      <div className="signInSignUp-modal-content">
        <div className="signInSignUp-modal-header">
          <h2>{isCustomer ? 'Sign Up as a Customer' : 'Sign Up as an Artisan'}</h2>
          <button className="signInSignUp-close-button" onClick={() => setShowModal(false)}>×</button>
        </div>
        <div className="signInSignUp-modal-body">
          {isCustomer ? (
            <div>
              <button
                className={`modal-switch-button ${isCustomer ? 'selected' : ''}`}
                onClick={handleCustomerClick}
              >
                I'm a Customer
              </button>
              <button
                className={`modal-switch-button ${!isCustomer ? 'selected' : ''}`}
                onClick={handleArtisanClick}
              >
                I'm an Artisan
              </button>
              <hr />
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Surname"
                  name="surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                  className="input-field"
                />
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
                <button type="submit" className="modal-signup-button">Sign Up</button>
              </form>
            </div>
          ) : (
            <div>
              <button
                className={`modal-switch-button ${isCustomer ? 'selected' : ''}`}
                onClick={handleCustomerClick}
              >
                I'm a Customer
              </button>
              <button
                className={`modal-switch-button ${!isCustomer ? 'selected' : ''}`}
                onClick={handleArtisanClick}
              >
                I'm an Artisan
              </button>
              <hr />
              <div className="upload-container">
                <div className="upload-square">
                  <span>+</span>
                </div>
                <p>Upload your image</p>
              </div>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Surname"
                  name="surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                  className="input-field"
                />
                <textarea
                  placeholder="About Myself"
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  className="input-field"
                />
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
                <button type="submit" className="modal-signup-button">Sign Up</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUpModal;
