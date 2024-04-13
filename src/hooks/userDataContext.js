import React, { createContext, useState, useContext } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getFirestore, doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import app from '../firebase.js';

// Create the context
export const UserDataContext = createContext();

// Create a provider for components to consume and update the user data
export const UserDataProvider = ({ children }) => {

  // Get the userData state and setter from UserDataContext
  const [userData, setUserData] = useState({
    uid: '',
    name: '',
    email: '',
    userType: '',
    profileImageUrl: '',
    about: '',
    isLoggedIn: false,
  });
  const [isLoginInProcess, setIsLoginInProcess] = useState(false);
  const [isSignUpInProcess, setIsSignUpInProcess] = useState(false);
  const [isLoginInBackground, setIsLoginInBackground] = useState(false);
  const [isSignUpInBackground, setIsSignUpInBackground] = useState(false);

  // Function to sign up a user with email and password
  const signUpWithEmailAndPassword = async (email, password, userInfo) => {
    setIsSignUpInProcess(true);
    setIsSignUpInBackground(true);
    try {
      // Sign up the user with Firebase Authentication
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      // If signup successful, update user data state
      if (user) {
        const db = getFirestore(app);
        const usersCollection = collection(db, 'users');
        const userDocRef = doc(usersCollection, user.uid); // Use user.uid as the document ID
        await setDoc(userDocRef, {
          uid: user.uid,
          name: userInfo.name,
          email: email,
          userType: userInfo.userType,
          about: userInfo.about || '',
          profileImageUrl: '', // Placeholder for profile image URL
        });

        // If user uploaded a profile image, upload to Firebase Storage
        if (userInfo.profileImage) {
          console.log('Image exists');
          const storageRef = ref(getStorage(), `profileImages/${user.uid}`);
          await uploadBytes(storageRef, userInfo.profileImage);
      
          // Get download URL for the uploaded image
          const imageUrl = await getDownloadURL(storageRef);
      
          // Update profileImageUrl in Firestore
          await updateDoc(userDocRef, {
            profileImageUrl: imageUrl,
          });
        }

        // Update local user data state
        setUserData({
          uid: user.uid,
          name: userInfo.name,
          email: email,
          userType: userInfo.userType,
          isLoggedIn: true,
        });
        setIsSignUpInProcess(false);
        setIsSignUpInBackground(false);

      }
    } catch (error) {
      console.error('Error signing up:', error.message);
      // Return false to indicate failed signup
      setIsSignUpInProcess(false);
      setIsSignUpInBackground(false);
      // Show error alert
      alert('Error signing up. Please try again.');
    }
  };

  // Function to log in a user with email and password
  const loginWithEmailAndPassword = async (email, password) => {
    setIsLoginInProcess(true);
    setIsLoginInBackground(true);
    try {
      // Sign in the user with Firebase Authentication
      const auth = getAuth();
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      if (user) {
        // Retrieve user data from Firestore
        const db = getFirestore(app);
        const userRef = doc(collection(db, 'users'), user.uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          // Update local user data state
          console.log('User data after login:', userData);
          setUserData({
            uid: user.uid,
            name: userData.name,
            email: email,
            userType: userData.userType,
            profileImageUrl: userData.profileImageUrl,
            about: userData.about || '',
            isLoggedIn: true,
          });

          setIsLoginInProcess(false);
          setIsLoginInBackground(false);

         
        }
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      setIsLoginInProcess(false);
      setIsLoginInBackground(false);
      // Show error alert
      alert('Error logging in. Please try again.');
    }
  };

  return (
    <UserDataContext.Provider value={{
      userData,
      setUserData,
      signUpWithEmailAndPassword,
      loginWithEmailAndPassword,
      isLoginInProcess,
      isSignUpInProcess,
      setIsLoginInProcess,
      setIsSignUpInProcess,
      isLoginInBackground,
      isSignUpInBackground
    }}>
      {children}
    </UserDataContext.Provider>
  );
};
