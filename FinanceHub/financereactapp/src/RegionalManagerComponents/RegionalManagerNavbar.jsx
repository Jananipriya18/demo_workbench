import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./RegionalManagerNavbar.css";

const RegionalManagerNavbar = () => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Fetch the userName and userRole from localStorage
    const storedUserName = localStorage.getItem('userName');
    const storedUserRole = localStorage.getItem('userRole');
    setUserName(storedUserName);
    setUserRole(storedUserRole);
  }, []);

  const logout = () => {
    // Perform logout logic here
    navigate('/login');
  };

  return (
    <nav className='adminnav'>
     <h1 className="site-title" id="heading">
        <Link to="/home" style={{ color: 'inherit', textDecoration: 'inherit'}}>InsuranceHub</Link>
      </h1>
      <ul className="nav-links">
           
            <li><p className="user-role">{userName} / {userRole}</p></li>  
            <li><Link to="/home">Home</Link></li>      
              <li className="dropdown">
                <span className="dropdown-label">SavingsPlan Approval</span>
                <ul className="dropdown-menu">
                  <li><Link to="/savingsplanapproval">View SavingsPlan</Link></li>
                </ul>
              </li>
              <li><Link to="/planapplicationapproval">PlanApplication Approval</Link></li>
          

              <li><Link to="/viewfeedbackmanager">Feedback</Link></li>

            <li>
              <button className="button-logout1" onClick={() => setShowLogoutPopup(true)}>
                Logout
              </button>
            </li>
         
      </ul>

      {showLogoutPopup && (
        <div className="logout-popup1">
          <div className="logout-popup1-content">
            <p>Are you sure you want to logout?</p>
            <button onClick={() => { logout(); setShowLogoutPopup(false); }} className="button button-yes">
              Yes, Logout
            </button>
            <button onClick={() => setShowLogoutPopup(false)} className="button button-cancel">
              Cancel
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default RegionalManagerNavbar;
