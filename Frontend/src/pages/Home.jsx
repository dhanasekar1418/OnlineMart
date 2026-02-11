import React from 'react';
import BannerCarousel from '../components/BannerCarousel';
import '../Styles/home.css';
import { useNavigate } from 'react-router-dom';
import categoriesImage from '../assets/categories.png';
import pageimage from '../assets/side.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Static Header with Location */}
      <div className="location-bar">
        <p>
          ⏱️ Standard shipping: 3-5 business days &nbsp;
          <span className="add-address" onClick={() => navigate('/products')}>view products</span>
        </p>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <BannerCarousel />
         {/* Categories Section */}
      <div className="categories-section" onClick={() => navigate('/products')}>
        <img src={categoriesImage} alt="Categories" />
      </div>
      <div className="sidepage" onClick={() => navigate('/products')}>
        <img src={pageimage} alt="sidepage" />
      </div>
      </div>
    </div>
  );
};

export default Home;
