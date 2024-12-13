import React, { useEffect, useState } from 'react';
import './HomePage.css'; // Import your custom styles
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useSelector } from 'react-redux';
import FinancialConsultantNavbar from '../FinancialConsultantComponents/FinancialConsultantNavbar';
import ClientNavbar from '../ClientComponents/ClientNavbar';
import RegionalManagerNavbar from '../RegionalManagerComponents/RegionalManagerNavbar';

const HomePage = () => {
  const [userRole, setUserRole] = useState('');
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
    console.log("userId in Homepage", userId);
  }, []);

  const renderNavbar = () => {
    switch (userRole) {
      case 'FinancialConsultant':
        return <FinancialConsultantNavbar />;
      case 'Client':
        return <ClientNavbar />;
      case 'RegionalManager':
        return <RegionalManagerNavbar />;
      default:
        return null;
    }
  };

  return (
    <div className="home-page">
      {renderNavbar()}

      <header className="hero">
        <div className="hero-content">
          <LazyLoadImage
            effect="blur"
            src={process.env.PUBLIC_URL + '/financecoverimage.jpg'}
            alt="Finance Cover"
            className="hero-image"
          />
          <div className="hero-text">
            <h1>Welcome to FinanceHub</h1>
            <p>Managing your financial future with ease and efficiency.</p>
          </div>
        </div>
      </header>

      <section className="features">
        <div className="feature-item">
          <h2>Savings Plans</h2>
          <p>Explore a range of savings plans tailored to help you achieve your financial goals.</p>
        </div>
        <div className="feature-item">
          <h2>Investment Options</h2>
          <p>Access a variety of investment options to grow your wealth and secure your future.</p>
        </div>
        <div className="feature-item">
          <h2>Personalized Advice</h2>
          <p>Get personalized financial advice from experts to make informed decisions.</p>
        </div>
      </section>

      <section className="cta">
        <h2>Start Your Financial Journey Today</h2>
        <p>Join FinanceHub and take control of your financial well-being.</p>
        <button className="cta-button">Get Started</button>
      </section>

      <footer className="footer">
        <p>&copy; 2024 FinanceHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
