import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../userSlice";
import "./Login.css";
import API_BASE_URL from "../apiConfig";

function Login() {
  useEffect(() => {
    localStorage.setItem("token", "");
  }, []);

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    const fieldErrors = { ...errors };

    switch (fieldName) {
      case "email":
        fieldErrors.email = value.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
          ? ""
          : "Please enter a valid email address";
        break;
      case "password":
        fieldErrors.password =
          value.length >= 6 ? "" : "Password must be at least 6 characters long";
        break;
      default:
        break;
    }

    setErrors(fieldErrors);
  };

  async function handleLogin() {
    setError("");
  
    const { email, password } = formData;
    if (!email.trim() || !password.trim()) {
      setErrors({
        email: email.trim() === "" ? "Email is required" : errors.email,
        password: password.trim() === "" ? "Password is required" : errors.password,
      });
      return;
    }
  
    try {
      const response = await axios.post(API_BASE_URL + "/api/login", { Email: email, Password: password });
      const { Status, Token: token, User: user } = response.data;
      console.log('Login Response:', response.data); 
console.log('Token:', token);
console.log('Token stored in localStorage:', localStorage.getItem('token'));

  
      if (Status === "Success" && user) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("token", token);
        localStorage.setItem("userRole", user.UserRole);
        localStorage.setItem("userName", user.Username);
        localStorage.setItem("userId", user.UserId);
        
        dispatch(setUserInfo({
          role: user.UserRole,
          userId: user.UserId,
          userName: user.Username,
          isAuthenticated: true,
        }));
  
        navigate("/home");
      } else {
        setError("Invalid Email or Password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid Email or Password");
    }
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-intro">
          <h2>Welcome to FinanceHub</h2>
          <p>Take control of your financial future. Log in to access a wide range of financial services tailored to your needs.</p>
        </div>
        <div className="login-form">
          <h2>Login</h2>
          <div className="form-group">
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
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          {error && <div className="error">{error}</div>}
          <button type="button" className="login-button" onClick={handleLogin}>
            Login
          </button>
          <div className="signup-link">
            New to FinanceHub? <Link to="/user/register">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
