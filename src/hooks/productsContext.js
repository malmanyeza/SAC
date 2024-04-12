import React, { createContext, useState, useContext , useEffect} from 'react';
import { getFirestore, doc, setDoc,collection, getDocs,addDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from '../firebase.js';


// Create the ProductsContext
const ProductsContext = createContext();

// Create the ProductsProvider component
const ProductsProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(0)
  const [productsToBeApproved,setProductsToBeApproved] = useState([])
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Product 1',
      price: '$10',
      image: require('../assets/images/circularTswanda.jpeg'),
      category: 'Pottery',
      isInCart: false,
      description: 'This is a beautiful pottery product.',
      artisanName: 'Artisan 1',
      artisanImage: require('../assets/images/stool.jpg'),
    },
    {
      id: 2,
      name: 'Product 2',
      price: '$15',
      image: require('../assets/images/family.jpg'),
      category: 'Woodwork',
      isInCart: false,
      description: 'A lovely woodwork creation for your home. aljfoar oi aoireaoe faoiea odi aoejf foaoeifjaoief aoiea oiaiefa oe afeoi aoieai iaeoi fa iefwao ief ojeaoiwo aoieawoef ao ieaojeaiejaef',
      artisanName: 'Artisan 2',
      artisanImage: require('../assets/images/stool.jpg'),
    },
    {
      id: 3,
      name: 'Product 3',
      price: '$20',
      image: require('../assets/images/stool.jpg'),
      category: 'Beadwork',
      isInCart: false,
      description: 'Exquisite beadwork perfect for any occasion.',
      artisanName: 'Artisan 3',
      artisanImage: require('../assets/images/stool.jpg'),
    },
    {
      id: 4,
      name: 'Wala wala',
      price: '$10',
      image: require('../assets/images/chirongo.jpg'),
      category: 'Metalwork',
      isInCart: false,
      description: 'Unique metalwork design.',
      artisanName:'Artisan 4',
      artisanImage: require('../assets/images/stool.jpg'),
    },
    {
      id: 5,
      name: 'Flores',
      price: '$15',
      image: require('../assets/images/3tswanda.jpg'),
      category: 'Textiles',
      isInCart: false,
      description: 'Beautiful textile artistry for your space.',
      artisanName: 'Artisan 5',
      artisanImage: require('../assets/images/stool.jpg'),
    },
    {
      id: 6,
      name: 'Real',
      price: '$20',
      image: require('../assets/images/2tswanda.jpg'),
      category: 'Paintings',
      isInCart: false,
      description: 'Captivating painting that tells a story.',
      artisanName: 'Artisan 6',
      artisanImage: require('../assets/images/stool.jpg'),
    },
    // Add more products as needed
  ]);
  

  const selectCategory = (category) => {
    setSelectedCategory(category);
  };


  // // Load approved artifacts from Firestore when the component mounts
  // useEffect(() => {
  //   const fetchApprovedArtifacts = async () => {
  //     try {
  //       const db = getFirestore(app);
  //       const artifactsCollectionRef = collection(db, 'approvedArtifacts');
  //       const artifactsSnapshot = await getDocs(artifactsCollectionRef);
  //       const artifactsList = [];
  //       artifactsSnapshot.forEach((doc) => {
  //         const artifactData = doc.data();
  //         artifactsList.push({
  //           id: doc.id,
  //           ...artifactData,
  //         });
  //       });
  //       setProducts(artifactsList);
  //     } catch (error) {
  //       console.error('Error fetching approved artifacts:', error.message);
  //     }
  //   };

  //   fetchApprovedArtifacts();
  // }, []); // Empty dependency array means it will only run once when the component mounts


  //  // Load unapproved artifacts from Firestore when the component mounts
  //  useEffect(() => {
  //   const fetchToBeApprovedArtifacts = async () => {
  //     try {
  //       const db = getFirestore(app);
  //       const artifactsCollectionRef = collection(db, 'toBeApprovedArtifacts');
  //       const artifactsSnapshot = await getDocs(artifactsCollectionRef);
  //       const artifactsList = [];
  //       artifactsSnapshot.forEach((doc) => {
  //         const artifactData = doc.data();
  //         artifactsList.push({
  //           id: doc.id,
  //           ...artifactData,
  //         });
  //       });
  //       setProductsToBeApproved(artifactsList);
  //     } catch (error) {
  //       console.error('Error fetching approved artifacts:', error.message);
  //     }
  //   };

  //   fetchToBeApprovedArtifacts();
  // }, []); // Empty dependency array means it will only run once when the component mounts


   // Function to upload artifact to Firebase
   const uploadArtifactToFirebase = async (artifactData, userData) => {
    try {
      // Upload image to Firebase Storage
      const storage = getStorage(app);
      const imageRef = ref(storage, `artifacts/${userData.uid}/${artifactData.productName}`);
      await uploadBytes(imageRef, artifactData.productImage);
  
      // Get download URL for the uploaded image
      const imageUrl = await getDownloadURL(imageRef);
  
      // Add artifact data to Firestore under collection 'artifacts'
      const db = getFirestore(app);
      const artifactsCollectionRef = collection(db, 'toBeApprovedArtifacts');
      const newArtifactRef = await addDoc(artifactsCollectionRef, {
        name: artifactData.productName,
        price: artifactData.productPrice,
        category: artifactData.category,
        description: artifactData.productDescription,
        imageUrl: imageUrl,
        artisanName: artifactData.artisanName,
        artisanImage: artifactData.artisanImage,
        artisanUid: artifactData.artisanUid,
        id: userData.uid, // Include the UID of the user
      });
  
      console.log('Artifact uploaded successfully with ID:', newArtifactRef.id);
  
      // Add the new artifact to the local products state
      setProducts([...products, {
        ...artifactData,
        image: imageUrl, // Use the Firebase image URL
        isInCart: false,
        id: newArtifactRef.id, // Use the generated Firestore document ID
      }]);
  
      // Show an alert for successful upload
      window.alert('Artifact uploaded successfully!');
  
    } catch (error) {
      console.error('Error uploading artifact:', error.message);
      // Show an alert for upload error
      window.alert('Error uploading artifact. Please try again.');
    }
  };

  

  const approveProduct = async (productId) => {
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
  
    } catch (error) {
      console.error('Error approving artifact:', error.message);
      // Show an alert for approval error
      window.alert('Error approving artifact. Please try again.');
    }
  };



  const disapproveProduct = async (productId) => {
    try {
      const db = getFirestore(app);
  
      // Delete the artifact from 'toBeApprovedArtifacts'
      const artifactRef = doc(db, 'toBeApprovedArtifacts', productId);
      await deleteDoc(artifactRef);
  
      console.log('Artifact disapproved and removed from toBeApprovedArtifacts');
  
      // Optional: Fetch updated products from Firestore and update local state
      const updatedProductsToBeApproved = productsToBeApproved.filter((product) => product.id !== productId);
      setProductsToBeApproved(updatedProductsToBeApproved);
  
    } catch (error) {
      console.error('Error disapproving artifact:', error.message);
      // Show an alert for disapproval error
      window.alert('Error disapproving artifact. Please try again.');
    }
  };
  

  return (
    <ProductsContext.Provider value={{ 
      selectedCategory, selectCategory , setNumberOfItemsInCart, numberOfItemsInCart,
      products, setProducts,uploadArtifactToFirebase, productsToBeApproved
    }}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsProvider, ProductsContext };
