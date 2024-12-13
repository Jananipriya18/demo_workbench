// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import API_BASE_URL from '../apiConfig';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import './ReplyForm.css';

// // const ReplyForm = () => {
// //   const { inquiryId } = useParams();
// //   const [existingMessage, setExistingMessage] = useState("");
// //   const [replyMessage, setReplyMessage] = useState("");
// //   const [error, setError] = useState(null);
// //   const [success, setSuccess] = useState(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchInquiry = async () => {
// //       try {
// //         const response = await axios.get(`${API_BASE_URL}/api/inquiries/${inquiryId}`, {
// //           headers: {
// //             Authorization: `Bearer ${localStorage.getItem('token')}`,
// //           },
// //         });
// //         setExistingMessage(response.data.Message);
// //       } catch (error) {
// //         console.error('Error fetching inquiry details:', error);
// //         setError('An error occurred while fetching the inquiry details.');
// //       }
// //     };

// //     fetchInquiry();
// //   }, [inquiryId]);

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();
// //     setError(null);
// //     setSuccess(null);

// //     if (!replyMessage) {
// //       setError("Reply message is required.");
// //       return;
// //     }

// //     try {
// //       const response = await axios.put(
// //         `${API_BASE_URL}/api/inquiries/${inquiryId}`, // Ensure this endpoint is correct
// //         { Message: replyMessage },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${localStorage.getItem('token')}`,
// //             'Content-Type': 'application/json',
// //           },
// //         }
// //       );

// //       if (response.status === 200) {
// //         setSuccess("Reply sent successfully.");
// //         setReplyMessage("");
// //         navigate('/inquiries');
// //       } else {
// //         setError("Failed to send reply. Status code: " + response.status);
// //       }
// //     } catch (error) {
// //       console.error("Error sending reply:", error.response ? error.response.data : error.message);
// //       setError("An error occurred while sending your reply. Check the console for more details.");
// //     }
// //   };

// //   return (
// //     <div className="reply-form-container">
// //       <h2>Reply to Inquiry</h2>
// //       {error && <p className="error-message">{error}</p>}
// //       {success && <p className="success-message">{success}</p>}
// //       <form onSubmit={handleSubmit}>
// //         <div className="form-group">
// //           <label htmlFor="existingMessage">Existing Message:</label>
// //           <textarea
// //             id="existingMessage"
// //             value={existingMessage}
// //             readOnly
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="replyMessage">Your Reply:</label>
// //           <textarea
// //             id="replyMessage"
// //             value={replyMessage}
// //             onChange={(e) => setReplyMessage(e.target.value)}
// //             maxLength="1000"
// //             required
// //           />
// //         </div>
// //         <button type="submit">Send Reply</button>
// //         <button type="button" onClick={() => navigate('/inquiries')}>Cancel</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default ReplyForm;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import API_BASE_URL from '../apiConfig';
// import { useParams, useNavigate } from 'react-router-dom';
// import './ReplyForm.css';

// const ReplyForm = () => {
//   const { inquiryId } = useParams();
//   const [existingMessage, setExistingMessage] = useState("");
//   const [replyMessage, setReplyMessage] = useState("");
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchInquiry = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/api/inquiries/${inquiryId}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         setExistingMessage(response.data.Message);
//       } catch (error) {
//         console.error('Error fetching inquiry details:', error);
//         setError('An error occurred while fetching the inquiry details.');
//       }
//     };

//     fetchInquiry();
//   }, [inquiryId]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError(null);
//     setSuccess(null);

//     if (!replyMessage) {
//       setError("Reply message is required.");
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `${API_BASE_URL}/api/inquiries/${inquiryId}`, // Ensure this endpoint is correct
//         { Replied: replyMessage }, // Update the Replied field
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.status === 200) {
//         setSuccess("Reply sent successfully.");
//         setReplyMessage("");
//         navigate('/inquiries');
//       } else {
//         setError("Failed to send reply. Status code: " + response.status);
//       }
//     } catch (error) {
//       console.error("Error sending reply:", error.response ? error.response.data : error.message);
//       setError("An error occurred while sending your reply. Check the console for more details.");
//     }
//   };

//   return (
//     <div className="reply-form-container">
//       <h2>Reply to Inquiry</h2>
//       {error && <p className="error-message">{error}</p>}
//       {success && <p className="success-message">{success}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="existingMessage">Existing Message:</label>
//           <textarea
//             id="existingMessage"
//             value={existingMessage}
//             readOnly
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="replyMessage">Your Reply:</label>
//           <textarea
//             id="replyMessage"
//             value={replyMessage}
//             onChange={(e) => setReplyMessage(e.target.value)}
//             maxLength="1000"
//             required
//           />
//         </div>
//         <button type="submit">Send Reply</button>
//         <button type="button" onClick={() => navigate('/inquiries')}>Cancel</button>
//       </form>
//     </div>
//   );
// };

// export default ReplyForm;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReplyForm.css'; // Assuming you have a CSS file for styling
import API_BASE_URL from '../apiConfig';
import { useParams, useNavigate } from 'react-router-dom';
import FinancialConsultantNavbar from './FinancialConsultantNavbar';

const ReplyForm = () => {
  const [message, setMessage] = useState('');
  const [replied, setReplied] = useState('');
  const [successPopup, setSuccessPopup] = useState(false);
  const [errors, setErrors] = useState('');
  const { inquiryId } = useParams();
  const navigate = useNavigate();

  // Fetch inquiry details if updating
  useEffect(() => {
    if (inquiryId) {
      fetchInquiry(inquiryId);
    }
  }, [inquiryId]);

  const fetchInquiry = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/inquiries/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        setMessage(response.data.Message || '');
        setReplied(response.data.Replied || 'Pending');
      }
    } catch (error) {
      console.error("Error fetching inquiry:", error);
    }
  };

  const validateForm = () => {
    if (!replied) {
      setErrors('Replied status is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
  
    try {
      const response = await axios.put(`${API_BASE_URL}/api/inquiries/${inquiryId}`, {
        InquiryId: inquiryId,
        Message: message, // Include Message field
        Replied: replied, // Update only the Replied field
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (response.status === 200) {
        setSuccessPopup(true);
      } else {
        setErrors('Failed to update inquiry. Please try again later.');
      }
    } catch (error) {
      setErrors('Error updating inquiry. Please try again.');
    }
  };
  

  const handleClosePopup = () => {
    setSuccessPopup(false);
    navigate('/inquiries');
  };

  return (
    <div>
      <FinancialConsultantNavbar />
      <div className="inquiry-container">
        <h2>Update Inquiry Status</h2>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            readOnly
            className="textarea-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="replied">Replied Status</label>
          <textarea
            id="replied"
            value={replied}
            onChange={(e) => setReplied(e.target.value)}
            placeholder="Enter the reply status here..."
            className="textarea-field"
          />
        </div>
        {errors && <div className="error">{errors}</div>}
        <button onClick={handleSubmit} className="submit-button">
          Update Status
        </button>

        {successPopup && (
          <div className="popup">
            <div className="popup-content">
              <p>Inquiry status updated successfully!</p>
              <button onClick={handleClosePopup}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReplyForm;
