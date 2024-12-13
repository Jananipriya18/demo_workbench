import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './CustomerMyFeedback.css'; // Assuming you have a CSS file for styling
import API_BASE_URL from '../apiConfig';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ClientNavbar from './ClientNavbar';

const CustomerMyFeedback = () => {
  const navigate = useNavigate(); // Initialize navigate

  const [feedbacks, setFeedbacks] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState('');

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (!storedToken || !storedUserId) {
      console.error("Token or User ID is missing from localStorage");
      navigate("/login");
      return;
    }

    if (userId && token) {
      fetchUserFeedbacks();
    } else {
      console.error("Token or User ID from state is missing");
      navigate("/login");
    }
  }, [userId, token, navigate]);

  const fetchUserFeedbacks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/feedback/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        setFeedbacks(response.data);
      } else {
        console.error('Failed to fetch feedbacks.');
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const handleDeleteClick = (feedback) => {
    setFeedbackToDelete(feedback);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/feedback/${feedbackToDelete.FeedbackId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        setDeleteSuccessMessage('Feedback deleted successfully!');
        setFeedbacks(feedbacks.filter(fb => fb.FeedbackId !== feedbackToDelete.FeedbackId));
        setShowDeletePopup(false);
      } else {
        console.error('Failed to delete feedback.');
      }
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  const closeDeletePopup = () => {
    setShowDeletePopup(false);
    setFeedbackToDelete(null);
  };

  return (
    <div>
      <ClientNavbar />
      <div className="my-feedback-wrapper">
        <div className={`my-feedback-container ${showDeletePopup || deleteSuccessMessage ? 'blur' : ''}`}>
          <h2>My Feedback</h2>
          {feedbacks.length === 0 ? (
            <p>No feedbacks found.</p>
          ) : (
            <table className="feedback-table">
              <thead>
                <tr>
                  <th>SNo</th>
                  <th>Date</th>
                  <th>Feedback</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((feedback, index) => (
                  <tr key={feedback.FeedbackId}>
                    <td>{index + 1}</td>
                    <td>{new Date(feedback.Date).toLocaleDateString()}</td>
                    <td>{feedback.FeedbackText}</td>
                    <td>
                      <button className="delete-feedback-button" onClick={() => handleDeleteClick(feedback)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {showDeletePopup && (
          <div className="popup-overlay">
            <div className="delete-popup">
              <p>Are you sure you want to delete this feedback?</p>
              <button className="confirm-delete-button" onClick={handleConfirmDelete}>
                Yes! Delete
              </button>
              <button className="cancel-delete-button" onClick={closeDeletePopup}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {deleteSuccessMessage && (
          <div className="popup-overlay">
            <div className="success-message">
              <p>{deleteSuccessMessage}</p>
              <button onClick={() => setDeleteSuccessMessage('')}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerMyFeedback;
