import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Signup.css";
import API_BASE_URL from '../apiConfig';

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [successPopup, setSuccessPopup] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    userRole: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    const fieldErrors = { ...errors };

    switch (fieldName) {
      case 'email':
        fieldErrors.email = value.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
          ? '' : 'Please enter a valid email address';
        break;
      case 'mobileNumber':
        fieldErrors.mobileNumber = value.match(/^[0-9]{10}$/) ? '' : 'Mobile number must be 10 digits';
        break;
      case 'password':
        fieldErrors.password = value.length >= 6 ? '' : 'Password must be at least 6 characters long';
        break;
      case 'confirmPassword':
        fieldErrors.confirmPassword =
          value === formData.password ? '' : 'Passwords do not match';
        break;
      default:
        break;
    }

    setErrors(fieldErrors);
  };

  async function handleSubmit() {
    const fieldErrors = { ...errors };

    if (formData.username.trim() === '') {
      fieldErrors.username = 'User Name is required';
    } else {
      fieldErrors.username = '';
    }
    if (formData.email.trim() === '') {
      fieldErrors.email = 'Email is required';
    } else {
      fieldErrors.email = '';
    }
    if (formData.mobileNumber.trim() === '') {
      fieldErrors.mobileNumber = 'Mobile Number is required';
    } else {
      fieldErrors.mobileNumber = '';
    }
    if (formData.password === '') {
      fieldErrors.password = 'Password is required';
    } else if (fieldErrors.password.trim() !== '') {
      fieldErrors.password = fieldErrors.password;
    } else {
      fieldErrors.password = '';
    }
    if (formData.confirmPassword === '') {
      fieldErrors.confirmPassword = 'Confirm Password is required';
    } else if (formData.confirmPassword !== formData.password) {
      fieldErrors.confirmPassword = 'Passwords do not match';
    } else {
      fieldErrors.confirmPassword = '';
    }

    setErrors(fieldErrors);

    const hasErrors = Object.values(fieldErrors).some((error) => error !== '');
    if (!hasErrors) {
      let requestObject = {
        "Username": formData.username,
        "Email": formData.email,
        "MobileNumber": formData.mobileNumber,
        "Password": formData.password,
        "UserRole": formData.userRole
      };

      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/register`,
          requestObject,
        );

        if (response.status === 200) {
          setSuccessPopup(true);
        } else {
          setError("An error occurred. Please try again later.");
        }
      } catch (error) {
        setError("An error occurred. Please try again later.");
      }
    }
  }

  function handleSuccessMessage() {
    setSuccessPopup(false);
    navigate("/user/login");
  }

  return (
    <div className="signup-container">
      <div className={`signup-form-wrapper ${successPopup ? "blur" : ""}`}>
        <div className="signup-intro">
          <h2>Join FinanceHub</h2>
          <p>Start managing your financial future with ease. Register to access personalized financial services and support.</p>
        </div>
        <div className="signup-form">
          <h2>Create an Account</h2>
          <div className="form-group">
            <label htmlFor="username">User Name <span className="required-asterisk">*</span></label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="User Name"
            />
            {errors.username && <div className="error">{errors.username}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email <span className="required-asterisk">*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number <span className="required-asterisk">*</span></label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Mobile Number"
            />
            {errors.mobileNumber && <div className="error">{errors.mobileNumber}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password <span className="required-asterisk">*</span></label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password <span className="required-asterisk">*</span></label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="userRole">Role <span className="required-asterisk">*</span></label>
            <select id="userRole" name="userRole" value={formData.userRole} onChange={handleChange}>
              <option value="">Select Role</option>
              <option value="Client">Client</option>
              <option value="FinancialConsultant">Financial Consultant</option>
              <option value="RegionalManager">Regional Manager</option>
            </select>
          </div>
          {error && <span className="error">{error}</span>}
          <button type="button" className="submit-button" onClick={handleSubmit}>
            Register
          </button>
          <div className="login-link">
            Already have an account? <Link to="/user/login">Login</Link>
          </div>
        </div>
      </div>
      {successPopup && (
        <div className="success-popup">
          <p>Registration Successful! You can now log in with your new account.</p>
          <button onClick={handleSuccessMessage}>Ok</button>
        </div>
      )}
    </div>
  );
}

export default Signup;
