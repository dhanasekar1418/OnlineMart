import React from 'react';
import BannerCarousel from '../components/BannerCarousel';
import '../Styles/home.css';
import { useNavigate } from 'react-router-dom';

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
      </div>
    </div>
  );
};

export default Home;
