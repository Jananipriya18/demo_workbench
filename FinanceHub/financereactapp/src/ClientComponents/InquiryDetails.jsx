// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './InquiryDetails.css'; // Ensure this CSS file has appropriate styles
// import API_BASE_URL from '../apiConfig';
// import { useNavigate } from 'react-router-dom';
// import ClientNavbar from './ClientNavbar';

// const InquiryDetails = () => {
//   const navigate = useNavigate();

//   const [inquiries, setInquiries] = useState([]);
//   const [showDeletePopup, setShowDeletePopup] = useState(false);
//   const [inquiryToDelete, setInquiryToDelete] = useState(null);
//   const [deleteSuccessMessage, setDeleteSuccessMessage] = useState('');

//   const token = localStorage.getItem('token');
//   const userId = localStorage.getItem('userId');

//   useEffect(() => {
//     if (!token || !userId) {
//       console.error("Token or User ID is missing from localStorage");
//       navigate("/login");
//       return;
//     }

//     fetchUserInquiries();
//   }, [token, userId, navigate]);

//   const fetchUserInquiries = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/api/inquiries/user/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status === 200) {
//         console.log('Inquiries Data:', response.data); // Log data to verify structure
//         setInquiries(response.data);
//       } else {
//         console.error('Failed to fetch inquiries:', response.status);
//       }
//     } catch (error) {
//       console.error('Error fetching inquiries:', error.response ? error.response.data : error.message);
//     }
//   };

//   const handleDeleteClick = (inquiry) => {
//     setInquiryToDelete(inquiry);
//     setShowDeletePopup(true);
//   };

//   const handleConfirmDelete = async () => {
//     try {
//       const response = await axios.delete(`${API_BASE_URL}/api/inquiries/${inquiryToDelete.InquiryId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status === 200) {
//         setDeleteSuccessMessage('Inquiry deleted successfully!');
//         setInquiries(inquiries.filter(iq => iq.InquiryId !== inquiryToDelete.InquiryId));
//         setShowDeletePopup(false);
//       } else {
//         console.error('Failed to delete inquiry.');
//       }
//     } catch (error) {
//       console.error('Error deleting inquiry:', error.response ? error.response.data : error.message);
//     }
//   };

//   const closeDeletePopup = () => {
//     setShowDeletePopup(false);
//     setInquiryToDelete(null);
//   };

//   return (
//     <div>
//       <ClientNavbar />
//       <div className="inquiry-details-wrapper">
//         <div className={`inquiry-details-container ${showDeletePopup || deleteSuccessMessage ? 'blur' : ''}`}>
//           <h2>My Inquiries</h2>
//           {inquiries.length === 0 ? (
//             <p>No inquiries found.</p>
//           ) : (
//             <table className="inquiry-table">
//               <thead>
//                 <tr>
//                   <th>SNo</th>
//                   <th>Message</th>
//                   <th>Replied</th> {/* Display actual status */}
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {inquiries.map((inquiry, index) => (
//                   <tr key={inquiry.InquiryId}>
//                     <td>{index + 1}</td>
//                     <td>{inquiry.Message}</td>
//                     <td>
//                       {inquiry.Replied ? inquiry.Replied : 'Pending'} {/* Display actual status */}
//                     </td>
//                     <td>
//                       <button className="delete-inquiry-button4" onClick={() => handleDeleteClick(inquiry)}>
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>

//         {showDeletePopup && (
//           <div className="popup-overlay">
//             <div className="delete-popup4">
//               <p>Are you sure you want to delete this inquiry?</p>
//               <button className="confirm-delete-button4" onClick={handleConfirmDelete}>
//                 Yes! Delete
//               </button>
//               <button className="cancel-delete-button4" onClick={closeDeletePopup}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}

//         {deleteSuccessMessage && (
//           <div className="popup-overlay">
//             <div className="success-message">
//               <p>{deleteSuccessMessage}</p>
//               <button onClick={() => setDeleteSuccessMessage('')}>Close</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InquiryDetails;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InquiryDetails.css'; // Ensure this CSS file has appropriate styles
import API_BASE_URL from '../apiConfig';
import { useNavigate } from 'react-router-dom';
import ClientNavbar from './ClientNavbar';

const InquiryDetails = () => {
  const navigate = useNavigate();

  const [inquiries, setInquiries] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [inquiryToDelete, setInquiryToDelete] = useState(null);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState('');

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!token || !userId) {
      console.error("Token or User ID is missing from localStorage");
      navigate("/login");
      return;
    }

    fetchUserInquiries();
  }, [token, userId, navigate]);

  const fetchUserInquiries = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/inquiries/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log('Inquiries Data:', response.data); // Log data to verify structure
        setInquiries(response.data);
      } else {
        console.error('Failed to fetch inquiries:', response.status);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error.response ? error.response.data : error.message);
    }
  };

  const handleDeleteClick = (inquiry) => {
    setInquiryToDelete(inquiry);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/inquiries/${inquiryToDelete.InquiryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        setDeleteSuccessMessage('Inquiry deleted successfully!');
        setInquiries(inquiries.filter(iq => iq.InquiryId !== inquiryToDelete.InquiryId));
        setShowDeletePopup(false);
      } else {
        console.error('Failed to delete inquiry. Status:', response.status);
      }
    } catch (error) {
      console.error('Error deleting inquiry:', error.response ? error.response.data : error.message);
    }
  };
  

  const closeDeletePopup = () => {
    setShowDeletePopup(false);
    setInquiryToDelete(null);
  };

  return (
    <div>
      <ClientNavbar />
      <div className="inquiry-details-wrapper">
        <div className={`inquiry-details-container ${showDeletePopup || deleteSuccessMessage ? 'blur' : ''}`}>
          <h2>My Inquiries</h2>
          {inquiries.length === 0 ? (
            <p>No inquiries found.</p>
          ) : (
            <table className="inquiry-table">
              <thead>
                <tr>
                  <th>SNo</th>
                  <th>Message</th>
                  <th>Status</th> {/* Display actual status */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inquiry, index) => (
                  <tr key={inquiry.InquiryId}>
                    <td>{index + 1}</td>
                    <td>{inquiry.Message}</td>
                    <td>
                      {inquiry.Replied ? inquiry.Replied : 'Pending'} {/* Display actual status */}
                    </td>
                    <td>
                      <button
                        className="delete-inquiry-button4"
                        onClick={() => handleDeleteClick(inquiry)}
                        disabled={inquiry.Replied !== 'Pending'} // Disable button if status is not Pending
                      >
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
            <div className="delete-popup4">
              <p>Are you sure you want to delete this inquiry?</p>
              <button className="confirm-delete-button4" onClick={handleConfirmDelete}>
                Yes! Delete
              </button>
              <button className="cancel-delete-button4" onClick={closeDeletePopup}>
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

export default InquiryDetails;
