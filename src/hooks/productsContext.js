import React, { createContext, useState, useContext , useEffect} from 'react';
import { getFirestore, doc, setDoc,collection, updateDoc,addDoc, getDoc, deleteDoc, onSnapshot,getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from '../firebase.js';
import { set } from 'firebase/database';


// Create the ProductsContext
const ProductsContext = createContext();

// Create the ProductsProvider component
const ProductsProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(0)
  const [productsToBeApproved,setProductsToBeApproved] = useState([])
  const [approvalInProgress, setApprovalInProgress] = useState(false);
  const [disapprovalInProgress, setDisapprovalInProgress] = useState(false);
  const [viewApprovedProducts, setViewApprovedProducts] = useState(false);
  const [uploadInProgress, setUploadInProgress] = useState(false)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [products,setProducts] = useState([])
  const [isRatingsModalOpen, setIsRatingsModalOpen] = useState(false)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [ratings, setRatings] = useState([]);
  const [isPaymentModalOpen,setIsPaymentModalOpen] = useState(false)
  
  const [averageRating, setAverageRating] = useState(0);
  

  const selectCategory = (category) => {
    setSelectedCategory(category);
  };

  ///This is the code that gets ratings from firebase
  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const db = getFirestore(app);
        const ratingsCollectionRef = collection(db, 'ratings');
  
        // Use onSnapshot to listen for real-time updates
        const unsubscribe = onSnapshot(ratingsCollectionRef, (querySnapshot) => {
          let totalRating = 0;
          let totalRatings = 0;
          const fetchedRatings = [];
  
          querySnapshot.forEach((doc) => {
            const ratingData = doc.data();
            const rating = ratingData.rating;
            
            if (!isNaN(rating) && rating >= 0 && rating <= 5) {
              totalRating += rating;
              totalRatings++;
              fetchedRatings.push({
                id: doc.id,
                ...ratingData
              });
            }
          });
  
          let newAverageRating = 0;
          if (totalRatings > 0) {
            newAverageRating = totalRating / totalRatings;
          }
  
          setAverageRating(newAverageRating);
          setRatings(fetchedRatings);
        });
  
        // Return a cleanup function to unsubscribe from the snapshot listener
        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error('Error calculating average rating:', error.message);
        setAverageRating(0);
        setRatings([]);
      }
    };
  
    fetchAverageRating();
  }, []); 
   // Empty dependency array means it will run only once when the component mounts



  // Load approved artifacts from Firestore when the component mounts
  useEffect(() => {
    const db = getFirestore(app);
    const artifactsCollectionRef = collection(db, 'approvedArtifacts');
  
    const unsubscribe = onSnapshot(artifactsCollectionRef, (snapshot) => {
      const artifactsList = [];
      snapshot.forEach((doc) => {
        const artifactData = doc.data();
        artifactsList.push({
          id: doc.id,
          ...artifactData,
        });
      });
      setProducts(artifactsList);
    });
  
    return () => unsubscribe(); // Unsubscribe when the component unmounts
  
  }, []); // Empty dependency array means it will only run once when the component mounts
  


   // Load unapproved artifacts from Firestore and listen for real-time changes
  useEffect(() => {
    const db = getFirestore(app);
    const artifactsCollectionRef = collection(db, 'toBeApprovedArtifacts');

    const unsubscribe = onSnapshot(artifactsCollectionRef, (snapshot) => {
      const artifactsList = [];
      snapshot.forEach((doc) => {
        const artifactData = doc.data();
        artifactsList.push({
          id: doc.id,
          ...artifactData,
        });
      });
      setProductsToBeApproved(artifactsList);
    });

    return () => {
      // Unsubscribe from the snapshot listener when the component unmounts
      unsubscribe();
    };
  }, []); // Empty dependency array means it will only run once when the component mounts



   // Function to upload artifact to Firebase
   const uploadArtifactToFirebase = async (artifactData, userData) => {
    console.log('Here is the user data', userData)
    console.log('Here is the artifact data', artifactData)
    setUploadInProgress(true)
    try {
      // Upload image to Firebase Storage
      const storage = getStorage(app);
      const imageRef = ref(storage, `artifacts/${userData.uid}/${artifactData.productName}`);
      await uploadBytes(imageRef, artifactData.productImage);
  
      // Get download URL for the uploaded image
      const imageUrl = await getDownloadURL(imageRef);

      console.log('Here is the image url', imageUrl)
  
      // Add artifact data to Firestore under collection 'artifacts'
      const db = getFirestore(app);
      const artifactsCollectionRef = collection(db, 'toBeApprovedArtifacts');
      const artifactWithId =  {
        name: artifactData.productName,
        price: artifactData.productPrice,
        category: artifactData.category,
        description: artifactData.productDescription,
        imageUrl: imageUrl,
        artisanName: artifactData.artisanName,
        artisanImage: artifactData.artisanImage,
        artisanUid: artifactData.artisanUid,
        id:null
      };

      const newArtifactRef = await addDoc(artifactsCollectionRef, artifactWithId);

      // Get the ID of the added document
      const newArtifactId = newArtifactRef.id;

      // Update the artifact in Firestore with its ID
      await updateDoc(doc(artifactsCollectionRef, newArtifactId), {
        id: newArtifactId,
      });
  
      console.log('Artifact uploaded successfully with ID:', newArtifactRef.id);
  
      // Show an alert for successful upload
      window.alert('Artifact uploaded successfully!');
      setUploadInProgress(false)
      setUploadModalOpen(false)
    } catch (error) {
      console.error('Error uploading artifact:', error.message);
      // Show an alert for upload error
      window.alert('Error uploading artifact. Please try again.');
      setUploadInProgress(false)
      setUploadModalOpen(false)
    }
  };

  

  const approveProduct = async (productId) => {
    console.log('Approving product with ID:', productId);
    setApprovalInProgress(true)
    try {
      const db = getFirestore(app);
  
      // Get the product to be approved
      const artifactRef = doc(db, 'toBeApprovedArtifacts', productId);
      const artifactSnapshot = await getDoc(artifactRef);
  
      if (!artifactSnapshot.exists()) {
        console.error('Artifact to approve not found');
        return;
      }
  
      const artifactData = artifactSnapshot.data();
  
      // Add the artifact to the 'approvedArtifacts' collection
      const approvedArtifactsRef = collection(db, 'approvedArtifacts');
      await setDoc(doc(approvedArtifactsRef, productId), artifactData);
  
      // Delete the artifact from 'toBeApprovedArtifacts'
      await deleteDoc(artifactRef);
  
      console.log('Artifact approved and moved to approvedArtifacts');
  
      // Optional: Fetch updated products from Firestore and update local state
      const updatedProductsToBeApproved = productsToBeApproved.filter((product) => product.id !== productId);
      setProductsToBeApproved(updatedProductsToBeApproved);
      setApprovalInProgress(false)
    } catch (error) {
      console.error('Error approving artifact:', error.message);
      // Show an alert for approval error
      window.alert('Error approving artifact. Please try again.');
      setApprovalInProgress(false)
    }
  };



  const disapproveProduct = async (productId) => {
    setDisapprovalInProgress(true)
    try {
      const db = getFirestore(app);
  
      // Delete the artifact from 'toBeApprovedArtifacts'
      const artifactRef = doc(db, 'toBeApprovedArtifacts', productId);
      await deleteDoc(artifactRef);
  
      console.log('Artifact disapproved and removed from toBeApprovedArtifacts');
  
      // Optional: Fetch updated products from Firestore and update local state
      const updatedProductsToBeApproved = productsToBeApproved.filter((product) => product.id !== productId);
      setProductsToBeApproved(updatedProductsToBeApproved);
      setDisapprovalInProgress(false)
    } catch (error) {
      console.error('Error disapproving artifact:', error.message);
      // Show an alert for disapproval error
      window.alert('Error disapproving artifact. Please try again.');
      setDisapprovalInProgress(false)
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const db = getFirestore(app);
  
      // Get the reference to the product document
      const productRef = doc(db, 'approvedArtifacts', productId);
  
      // Check if the product exists
      const productSnapshot = await getDoc(productRef);
      if (!productSnapshot.exists()) {
        console.error('Product not found.');
        return;
      }
  
      // Delete the product document
      await deleteDoc(productRef);
      console.log('Product deleted successfully.');
  
      // Optional: Fetch updated products from Firestore and update local state
      const updatedProducts = products.filter((product) => product.id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error.message);
      // Show an alert for deletion error
      window.alert('Error deleting product. Please try again.');
    }
  };



  const submitRating = async (raterEmail, rating, comment = "") => {
    try {
      const db = getFirestore(app);
  
      // Create a new document in the "ratings" collection
      const ratingsCollectionRef = collection(db, 'ratings');
      const newRatingDocRef = await addDoc(ratingsCollectionRef, {
        raterEmail: raterEmail,
        rating: rating,
        comment: comment
      });
  
      console.log('Rating submitted successfully with ID:', newRatingDocRef.id);
      
      // Show an alert or do something else on successful submission
      setIsRatingsModalOpen(false)
      window.alert('Rating submitted successfully!');
    } catch (error) {
      console.error('Error submitting rating:', error.message);
      // Show an alert for submission error
      window.alert('Error submitting rating. Please try again.');
    }
  };
  
  
  

  return (
    <ProductsContext.Provider value={{ 
      selectedCategory,
      selectCategory,
      setNumberOfItemsInCart,
      numberOfItemsInCart,
      products,
      setProducts,
      uploadArtifactToFirebase,
      productsToBeApproved,
      approveProduct,
      disapproveProduct,
      disapprovalInProgress,
      approvalInProgress,
      viewApprovedProducts,
      setViewApprovedProducts,
      deleteProduct, // Include the deleteProduct function
      uploadInProgress,
      setUploadInProgress,
      setUploadModalOpen,
      uploadModalOpen,
      submitRating,
      setIsRatingsModalOpen,
      isRatingsModalOpen,
      setIsReviewModalOpen,
      isReviewModalOpen,
      ratings,
      isPaymentModalOpen,
      setIsPaymentModalOpen
    }}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsProvider, ProductsContext };
