import React, { useState, useContext } from 'react';
import './styles/SignUpModal.css';
import { UserDataContext } from '../../hooks/userDataContext';


const SignUpModal = ({ setShowModal }) => {
  const { userData, setUserData, signUpWithEmailAndPassword, setIsSignUpInProcess, isSignUpInBackground } = useContext(UserDataContext);
  const [isCustomer, setIsCustomer] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    about: '',
    profileImage: null,
  });

  const [errors, setErrors] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
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

    // Reset the error message for the field being edited
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({
      ...formData,
      profileImage: imageFile,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
  
    // Perform validation
    let valid = true;
    const newErrors = {};
  
    if (isCustomer) {
      // Only validate email and password for customer signup
      if (formData.email.trim() === '') {
        newErrors.email = 'Email is required';
        valid = false;
      } else if (!isValidEmail(formData.email)) {
        newErrors.email = 'Invalid email format';
        valid = false;
      }
  
      if (formData.password.trim() === '') {
        newErrors.password = 'Password is required';
        valid = false;
      }
    } else {
      // Validate all fields for artisan signup
      if (formData.name.trim() === '') {
        newErrors.name = 'Name is required';
        valid = false;
      }
  
      if (formData.surname.trim() === '') {
        newErrors.surname = 'Surname is required';
        valid = false;
      }
  
      if (formData.email.trim() === '') {
        newErrors.email = 'Email is required';
        valid = false;
      } else if (!isValidEmail(formData.email)) {
        newErrors.email = 'Invalid email format';
        valid = false;
      }
  
      if (formData.password.trim() === '') {
        newErrors.password = 'Password is required';
        valid = false;
      }
    }
  
    if (!valid) {
      setErrors(newErrors);
      return;
    }
  
    const newUser = {
      ...formData,
      userType: isCustomer ? 'customer' : 'artisan',
    };
  
    // Update the userData context state with the new user details
    setUserData(newUser);
  
    // Call signUpWithEmailAndPassword from the context
    signUpWithEmailAndPassword(newUser.email, newUser.password, newUser);
  
  
    // Clear the form data
    setFormData({
      name: '',
      surname: '',
      email: '',
      password: '',
      about: '',
      profileImage: null,
    });
  };
  

  // Function to validate email format
  const isValidEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="signInSignUp-modal">
      <div className="signInSignUp-modal-content">
        <div className="signInSignUp-modal-header">
          <h2>{isCustomer ? 'Sign Up as a Customer' : 'Sign Up as an Artisan'}</h2>
          <button className="signInSignUp-close-button" onClick={() => setIsSignUpInProcess(false)}>×</button>
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
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field"
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input-field"
                />
                {errors.password && <p className="error-message">{errors.password}</p>}
                <button type="submit" className={`modal-signup-button ${isSignUpInBackground ? 'inactive' : ''}`} disabled={isSignUpInBackground}>
                  {isSignUpInBackground ? <div className="spinner"></div> : 'Sign Up'}
                </button>
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
                {/* Input field for profile image */}
                <label htmlFor="profileImage" className="upload-square">
                  {formData.profileImage ? (
                    <img
                      src={URL.createObjectURL(formData.profileImage)}
                      alt="Profile"
                      style={{ width: '100%', height: '100%', borderRadius: '20px', objectFit: 'cover' }}
                    />
                  ) : (
                    <span>+</span>
                  )}
                  <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </label>
                {!formData.profileImage && <p>Upload your image</p>}
              </div>
              <form onSubmit={handleSubmit}>
                {/* Input fields for artisan */}
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-field"
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
                <input
                  type="text"
                  placeholder="Surname"
                  name="surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                  className="input-field"
                />
                {errors.surname && <p className="error-message">{errors.surname}</p>}
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
                {errors.email && <p className="error-message">{errors.email}</p>}
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input-field"
                />
                {errors.password && <p className="error-message">{errors.password}</p>}
                <button type="submit" className={`modal-signup-button ${isSignUpInBackground ? 'inactive' : ''}`} disabled={isSignUpInBackground}>
                  {isSignUpInBackground ? <div className="spinner"></div> : 'Sign Up'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
