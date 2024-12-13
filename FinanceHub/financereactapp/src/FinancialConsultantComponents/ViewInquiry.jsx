// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import API_BASE_URL from '../apiConfig';
// import { useNavigate } from 'react-router-dom';
// import './ViewInquiry.css';

// const ViewInquiry = () => {
//   const [inquiries, setInquiries] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchInquiries();
//   }, []);

//   const fetchInquiries = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setError('No token found. Please log in.');
//       return;
//     }

//     try {
//       const response = await axios.get(`${API_BASE_URL}/api/inquiries`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setInquiries(response.data);
//     } catch (error) {
//       console.error('Error fetching inquiries:', error);
//       setError('An error occurred while fetching inquiries. Ensure you have the right permissions.');
//     }
//   };

//   const handleReplyClick = (inquiryId) => {
//     navigate(`/reply/${inquiryId}`);
//   };

//   return (
//     <div className="view-inquiry-container">
//       <h2>View Inquiries</h2>
//       {error && <p className="error-message">{error}</p>}
//       <table className="inquiry-table">
//         <thead>
//           <tr>
//             <th>Inquiry ID</th>
//             <th>Message</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {inquiries.length > 0 ? (
//             inquiries.map((inquiry) => (
//               <tr key={inquiry.InquiryId}>
//                 <td>{inquiry.InquiryId}</td>
//                 <td>{inquiry.Message}</td>
//                 <td>
//                   <button 
//                     onClick={() => handleReplyClick(inquiry.InquiryId)} 
//                     className="reply-button"
//                   >
//                     Reply
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="3">No inquiries found.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ViewInquiry;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import { useNavigate } from 'react-router-dom';
import './ViewInquiry.css';

const ViewInquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please log in.');
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/api/inquiries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInquiries(response.data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      setError('An error occurred while fetching inquiries. Ensure you have the right permissions.');
    }
  };

  const handleReplyClick = (inquiryId) => {
    navigate(`/reply/${inquiryId}`);
  };

  return (
    <div className="view-inquiry-container">
      <h2>View Inquiries</h2>
      {error && <p className="error-message">{error}</p>}
      <table className="inquiry-table">
        <thead>
          <tr>
            <th>Inquiry ID</th>
            <th>Message</th>
            <th>Status</th> {/* Added Status column */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.length > 0 ? (
            inquiries.map((inquiry) => (
              <tr key={inquiry.InquiryId}>
                <td>{inquiry.InquiryId}</td>
                <td>{inquiry.Message}</td>
                <td>{inquiry.Replied === 'Pending' ? 'Pending' : 'Replied'}</td> {/* Display Replied status */}
                <td>
                  <button 
                    onClick={() => handleReplyClick(inquiry.InquiryId)} 
                    className="reply-button"
                    disabled={inquiry.Replied !== 'Pending'} /* Disable if already replied */
                  >
                    {inquiry.Replied === 'Pending' ? 'Reply' : 'Replied'} {/* Button text change */}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No inquiries found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewInquiry;
