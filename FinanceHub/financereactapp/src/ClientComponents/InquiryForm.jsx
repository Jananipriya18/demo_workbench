// import React, { useState } from 'react';
// import axios from 'axios';
// import './InquiryForm.css'; // Assuming you have a CSS file for styling
// import API_BASE_URL from '../apiConfig';
// import ClientNavbar from './ClientNavbar';

// const InquiryForm = () => {
//   const [message, setMessage] = useState('');
//   const [successPopup, setSuccessPopup] = useState(false);
//   const [errors, setErrors] = useState('');

//   // Fetch the userId from localStorage
//   const userId = localStorage.getItem('userId');

//   const validateForm = () => {
//     if (!message) {
//       setErrors('Message is required');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) {
//       return;
//     }

//     const inquiryData = {
//       InquiryId: 0, // InquiryId will be set automatically by the server
//       UserId: parseInt(userId), // Assuming userId is stored as a string in localStorage
//       Message: message,
//     };

//     try {
//       const response = await axios.post(`${API_BASE_URL}/api/inquiries`, inquiryData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure token is included
//         },
//       });

//       if (response.status === 200) {
//         setSuccessPopup(true);
//         setMessage(''); // Clear the message after successful submission
//       } else {
//         setErrors('Failed to submit inquiry. Please try again later.');
//       }
//     } catch (error) {
//       setErrors('Error submitting inquiry. Please try again.');
//     }
//   };

//   const handleClosePopup = () => {
//     setSuccessPopup(false);
//   };

//   return (
//     <div>
//       <ClientNavbar />
//       <div className="inquiry-container">
//         <h2>Submit Your Inquiry</h2>
//         <div className="form-group">
//           <label htmlFor="message">Message</label>
//           <textarea
//             id="message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Enter your message here..."
//             className="textarea-field"
//           />
//         </div>
//         {errors && <div className="error">{errors}</div>}
//         <button onClick={handleSubmit} className="submit-button">
//           Submit Inquiry
//         </button>

//         {successPopup && (
//           <div className="popup">
//             <div className="popup-content">
//               <p>Inquiry submitted successfully!</p>
//               <button onClick={handleClosePopup}>Close</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InquiryForm;


import React, { useState } from 'react';
import axios from 'axios';
import './InquiryForm.css'; // Assuming you have a CSS file for styling
import API_BASE_URL from '../apiConfig';
import ClientNavbar from './ClientNavbar';

const InquiryForm = () => {
  const [message, setMessage] = useState('');
  const [successPopup, setSuccessPopup] = useState(false);
  const [errors, setErrors] = useState('');

  // Fetch the userId from localStorage
  const userId = localStorage.getItem('userId');

  const validateForm = () => {
    if (!message) {
      setErrors('Message is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const inquiryData = {
      InquiryId: 0, // InquiryId will be set automatically by the server
      UserId: parseInt(userId), // Assuming userId is stored as a string in localStorage
      Message: message,
      Replied: 'Pending', // Set the replied status to 'Pending'
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/api/inquiries`, inquiryData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure token is included
        },
      });

      if (response.status === 200) {
        setSuccessPopup(true);
        setMessage(''); // Clear the message after successful submission
      } else {
        setErrors('Failed to submit inquiry. Please try again later.');
      }
    } catch (error) {
      setErrors('Error submitting inquiry. Please try again.');
    }
  };

  const handleClosePopup = () => {
    setSuccessPopup(false);
  };

  return (
    <div>
      <ClientNavbar />
      <div className="inquiry-container">
        <h2>Submit Your Inquiry</h2>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message here..."
            className="textarea-field"
          />
        </div>
        {errors && <div className="error">{errors}</div>}
        <button onClick={handleSubmit} className="submit-button">
          Submit Inquiry
        </button>

        {successPopup && (
          <div className="popup">
            <div className="popup-content">
              <p>Inquiry submitted successfully!</p>
              <button onClick={handleClosePopup}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InquiryForm;
