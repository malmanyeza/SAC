import React,{useEffect, useContext} from 'react';
import Contacts from './Contacts';
import Catalogue from './Catalogue';
import About from './About';
import './styles/Home.css';
import MissionBox from '../components/Home/MissionBox';
import Header from '../components/Header';
import HomeButtons from '../components/Home/HomeButton'; // Corrected component name
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../hooks/userDataContext';
import RatingsDisplayModal from '../components/Catalogue/RatingsDisplayModal';
import { ProductsContext } from '../hooks/productsContext';

const Home = () => {

  const navigate = useNavigate();

  const {  userData } = useContext(UserDataContext);
  const { isReviewModalOpen, setIsReviewModalOpen } = useContext(ProductsContext);

  useEffect(() => {

    console.log(userData.isLoggedIn);
    if (userData.isLoggedIn) {
      navigate('/catalogue');
      window.history.pushState(null, '', '/catalogue');
    }
  }, [userData.isLoggedIn]);



  return (
    <div>
      <section id="hero">
        <Header />
        <div className="hero-content">
          <MissionBox />
          <HomeButtons />
        </div>
      
      </section>
      {
        isReviewModalOpen && <RatingsDisplayModal showModal={isReviewModalOpen} />
      }
    </div>
  );
}

export default Home;