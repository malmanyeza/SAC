import React, { useState, useRef, useContext, useEffect } from 'react';
import './styles/UploadContentModal.css'; // CSS for styling
import { UserDataContext } from '../../hooks/userDataContext';
import { ProductsContext } from '../../hooks/productsContext';
import { RiLoader4Line } from 'react-icons/ri'; // Loader icon from React Icons

const UploadContentModal = ({ onClose }) => {
  const { userData } = useContext(UserDataContext);
  const { uploadArtifactToFirebase, uploadInProgress, setUploadModalOpen, uploadModalOpen } = useContext(ProductsContext);

  useEffect(() => {
    if (!uploadInProgress&& !uploadModalOpen) {
      onClose();
    }
  }, [uploadInProgress, onClose]);

  const [formData, setFormData] = useState({
    productName: '',
    productPrice: '',
    productDescription: '',
    productImage: null, // Store the selected image
    artisanName: userData.name, // Add uploaderName
    artisanImage: userData.profileImageUrl, // Add uploaderImage URL
    artisanUid: userData.uid, // Add uploaderUid
    category: '', // Category selection
  });

  const imageInputRef = useRef(null);
  const [formErrors, setFormErrors] = useState({
    productName: '',
    productPrice: '',
    productDescription: '',
    category: '',
    image: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Perform validation on change
    validateInput(name, value);
  };

  // Handler for image file selection
  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];

    // Validate image file
    if (!validateImage(imageFile)) {
      setFormErrors({
        ...formErrors,
        image: 'Invalid image format or size. Please select a valid image (jpg, jpeg, png) less than 5MB.',
      });
      setFormData({
        ...formData,
        productImage: null,
      });
      return;
    }


    setFormData({
      ...formData,
      productImage: imageFile,
    });
  };
  
  const handleSquareClick = () => {
    // Trigger the file input when square is clicked
    imageInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check for any remaining errors before submission
    if (isFormValid()) {
      // Call the uploadArtifactToFirebase function from context
      uploadArtifactToFirebase(formData, userData);
    } else {
      console.log('Form contains errors. Please correct them.');
    }
  };

  const validateInput = (name, value) => {
    let error = '';
    switch (name) {
      case 'productName':
        error = value.length < 2 ? 'Product Name must be at least 2 characters long' : '';
        break;
      case 'productPrice':
        error = isNaN(value) || value <= 0 ? 'Product Price must be a positive number' : '';
        break;
      case 'productDescription':
        error = value.length < 10 ? 'Product Description must be at least 10 characters long' : '';
        break;
      case 'category':
        error = value === '' ? 'Please select a Category' : '';
        break;
      default:
        break;
    }

    setFormErrors({
      ...formErrors,
      [name]: error,
    });
  };

  const validateImage = (image) => {
    if (!image) return false;
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(image.type)) {
      return false;
    }

    if (image.size > maxSize) {
      return false;
    }

    return true;
  };

  const isFormValid = () => {
    for (let key in formErrors) {
      if (formErrors[key]) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className="upload-content-modal">
      <div className="upload-content-modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <div className="upload-content-square" onClick={handleSquareClick}>
          {formData.productImage ? (
            <img src={URL.createObjectURL(formData.productImage)} alt="Product" className="uploaded-image" />
          ) : (
            <span className="upload-icon">+</span>
          )}
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="image-input"
            style={{ display: 'none' }}
            required // Add required attribute for validation
          />
        </div>
        {formErrors.image && <div className="error">{formErrors.image}</div>}
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
          {formErrors.productName && <div className="error">{formErrors.productName}</div>}
          <input
            type="number"
            placeholder="Product Price"
            name="productPrice"
            value={formData.productPrice}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          {formErrors.productPrice && <div className="error">{formErrors.productPrice}</div>}
          <textarea
            placeholder="Product Description"
            name="productDescription"
            value={formData.productDescription}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          {formErrors.productDescription && <div className="error">{formErrors.productDescription}</div>}
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="select-field"
            required
          >
            <option value="">Select Category</option>
            <option value="Weavery">Weavery</option>
            <option value="Pottery">Pottery</option>
          </select>
          {formErrors.category && <div className="error">{formErrors.category}</div>}
          <button type="submit" className="upload-button" disabled={!isFormValid()} onClick={handleSubmit}>
            {uploadInProgress ? (
              <RiLoader4Line className="upload-spinner" />
            ) : (
              'Upload Content'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadContentModal;
