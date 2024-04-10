import React, { useState } from 'react';
import './styles/UploadContentModal.css'; // CSS for styling

const UploadContentModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    productName: '',
    productPrice: '',
    productDescription: '',
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
    // Perform form submission logic here
    console.log('Form data:', formData);
    onClose(); // Close the modal after form submission
  };

  return (
    <div className="upload-content-modal">
      <div className="upload-content-modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <div className="upload-content-square">
          <span>+</span>
        </div>
        <form onSubmit={handleSubmit} className="upload-form">
          <input
            type="text"
            placeholder="Product Name"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          <input
            type='number'
            placeholder="Product Price"
            name="productPrice"
            value={formData.productPrice}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          <textarea
            placeholder="Product Description"
            name="productDescription"
            value={formData.productDescription}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          <button type="submit" className="upload-button">Upload Content</button>
        </form>
      </div>
    </div>
  );
}

export default UploadContentModal;
