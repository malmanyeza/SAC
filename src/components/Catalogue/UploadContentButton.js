import React, { useContext, useState } from 'react';
import './styles/UploadContentButton.css'; // CSS for styling
import { RiAddCircleLine } from 'react-icons/ri'; // Icon from react-icons library
import UploadContentModal from './UploadContentModal'; // Import the modal
import { ProductsContext } from '../../hooks/productsContext';

const UploadContentButton = () => {
  const [showModal, setShowModal] = useState(false);
  const {setUploadInProgress,setUploadModalOpen} = useContext(ProductsContext);

  const handlePress = () => {
    setUploadModalOpen(true)
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button className="upload-content-button" onClick={handlePress}>
        <RiAddCircleLine size={32} color="#ccc" />
      </button>
      {showModal && <UploadContentModal onClose={handleCloseModal} />}
    </>
  );
}

export default UploadContentButton;
