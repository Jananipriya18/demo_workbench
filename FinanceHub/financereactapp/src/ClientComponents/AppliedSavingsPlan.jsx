// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import "./AppliedSavingsPlan.css";
// import API_BASE_URL from '../apiConfig';
// import ClientNavbar from './ClientNavbar';

// const AppliedSavingsPlan = () => {
//     const navigate = useNavigate();
//     const [showDeletePopup, setShowDeletePopup] = useState(false);
//     const [planToDelete, setPlanToDelete] = useState(null);
//     const [appliedPlans, setAppliedPlans] = useState([]);
//     const [filteredPlans, setFilteredPlans] = useState([]);
//     const [searchValue, setSearchValue] = useState("");
//     const [sortValue, setSortValue] = useState(0);
//     const [page, setPage] = useState(1);
//     const [limit, setLimit] = useState(5);
//     const [maxRecords, setMaxRecords] = useState(1);
//     const [selectedPlan, setSelectedPlan] = useState(null);
//     const [isDetailsModal, setIsDetailsModal] = useState(false);
//     const [details, setDetails] = useState({
//         appliedAmount: "",
//         status: "",
//         remarks: "",
//         proofDocument: ""
//     });
//     const [errors, setErrors] = useState({});
//     const [showSuccessModal, setShowSuccessModal] = useState(false);

//     const userId = localStorage.getItem('userId');
//     const token = localStorage.getItem('token');

//     useEffect(() => {
//         const storedToken = localStorage.getItem("token");
//         const storedUserId = localStorage.getItem("userId");

//         if (!storedToken || !storedUserId) {
//             console.error("Token or User ID is missing from localStorage");
//             navigate("/login");
//             return;
//         }

//         if (userId && token) {
//             fetchData();
//         } else {
//             console.error("Token or User ID from state is missing");
//             navigate("/login");
//         }
//     }, [userId, token, navigate]);

//     async function fetchData() {
//         const token = localStorage.getItem('token');
//         console.log("Token in fetchData:", token);

//         try {
//             const response = await axios.get(
//                 `${API_BASE_URL}/api/planapplications/user/${userId}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             if (response.status === 200) {
//                 console.log("Fetched Plans:", response.data);
//                 setAppliedPlans(response.data);
//                 setFilteredPlans(response.data);
//                 setMaxRecords(response.data.length);
//             }
//         } catch (error) {
//             console.error("Error fetching applied plans:", error);
//             console.log("Error Response:", error.response?.data || error.message);
//             navigate("/error");
//         }
//     }

//     const totalPages = Math.ceil(maxRecords / limit);

//     const filterPlans = (search) => {
//         const searchLower = search.toLowerCase();
//         if (searchLower === "") return appliedPlans;
//         return appliedPlans.filter((plan) =>
//             plan.SavingsPlan.Name.toLowerCase().includes(searchLower)
//         );
//     };

//     const handleSearchChange = (e) => {
//         const inputValue = e.target.value;
//         setSearchValue(inputValue);

//         const filtered = filterPlans(inputValue);
//         setFilteredPlans(filtered);
//         setMaxRecords(filtered.length);
//         setPage(1);  // Reset to the first page on new search
//     };

//     const toggleSort = (order) => {
//         setSortValue(order);

//         const sortedPlans = [...filteredPlans].sort((a, b) => {
//             return order === 1
//                 ? new Date(a.ApplicationDate) - new Date(b.ApplicationDate)
//                 : order === -1
//                 ? new Date(b.ApplicationDate) - new Date(a.ApplicationDate)
//                 : 0;
//         });

//         setFilteredPlans(sortedPlans);
//     };

//     const handlePagination = (newPage) => {
//         if (newPage >= 1 && newPage <= totalPages) {
//             setPage(newPage);
//         }
//     };

//     const handleDeleteClick = (planId) => {
//         setPlanToDelete(planId);
//         setShowDeletePopup(true);
//     };

//     async function handleConfirmDelete() {
//         try {
//             const response = await axios.delete(
//                 `${API_BASE_URL}/api/planapplications/${planToDelete}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             if (response.status === 200) {
//                 fetchData();
//             }
//             closeDeletePopup();
//         } catch (error) {
//             console.error("Error deleting plan application:", error);
//             navigate("/error");
//         }
//     }

//     const closeDeletePopup = () => {
//         setPlanToDelete(null);
//         setShowDeletePopup(false);
//     };

//     const validatePlanDetails = () => {
//         let validationErrors = {};

//         if (!details.appliedAmount) {
//             validationErrors.appliedAmount = "Applied amount is required.";
//         }

//         if (!details.status) {
//             validationErrors.status = "Status is required.";
//         }

//         if (!details.applicationDate) {
//             validationErrors.applicationDate = "Application date is required.";
//         }

//         return validationErrors;
//     };

//     const handlePlanDetailsSubmit = async () => {
//         const validationErrors = validatePlanDetails();
//         if (Object.keys(validationErrors).length > 0) {
//             setErrors(validationErrors);
//             return;
//         }

//         try {
//             const updatedPlan = {
//                 ...selectedPlan,
//                 AppliedAmount: details.appliedAmount,
//                 Status: details.status,
//                 Remarks: details.remarks,
//                 ProofDocument: details.proofDocument
//             };
//             const response = await axios.put(
//                 `${API_BASE_URL}/api/planapplications/${selectedPlan.PlanApplicationId}`,
//                 updatedPlan,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             if (response.status === 200) {
//                 setSelectedPlan(null);
//                 setIsDetailsModal(false);
//                 setShowSuccessModal(true);
//                 fetchData();
//             }
//         } catch (error) {
//             console.error("Error updating plan application:", error);
//             navigate("/error");
//         }
//     };

//     const closeModal = () => {
//         setSelectedPlan(null);
//         setShowSuccessModal(false);
//     };

//     const renderActionButtons = (plan) => {
//         return (
//             <button
//                 id='redButton'
//                 onClick={() => handleDeleteClick(plan.PlanApplicationId)} // Use PlanApplicationId for identifying which plan to delete 
//             >
//                 Delete
//             </button>
//         );
//     };

//     return (
//         <div>
//             <ClientNavbar />
//             <div id="policyHomeBody" className={showDeletePopup || selectedPlan || showSuccessModal ? "page-content blur" : "page-content"}>
//                 <h1>Applied Plans</h1>
//                 <input
//                     id='searchBox'
//                     type="text"
//                     placeholder="Search by Plan Name..."
//                     value={searchValue}
//                     onChange={handleSearchChange}
//                 />
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Plan Name</th>
//                             <th>Applied Amount</th>
//                             <th>Application Date</th>
//                             <th>Status</th>
//                             <th>Remarks</th>
//                             <th>Proof Document</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     {filteredPlans.length ? (
//                         <tbody>
//                             {filteredPlans
//                                 .slice((page - 1) * limit, page * limit)
//                                 .map((plan) => (
//                                     <tr key={plan.PlanApplicationId}>
//                                         <td>{plan.SavingsPlan.Name}</td>
//                                         <td>${plan.AppliedAmount}</td>
//                                         <td>{new Date(plan.ApplicationDate).toLocaleDateString()}</td>
//                                         <td>{plan.Status}</td>
//                                         <td>{plan.Remarks}</td>
//                                         <td>{plan.ProofDocument ? "Available" : "N/A"}</td>
//                                         <td>{renderActionButtons(plan)}</td> {/* Render delete button */}
//                                     </tr>
//                                 ))}
//                         </tbody>
//                     ) : (
//                         <tbody>
//                             <tr>
//                                 <td colSpan="7" className='no-records-cell'>Oops! No Records Found</td>
//                             </tr>
//                         </tbody>
//                     )}
//                 </table>

//                 {filteredPlans.length > 0 && (
//                     <div className="pagination">
//                         <button onClick={() => handlePagination(page - 1)} disabled={page === 1}>
//                             Previous
//                         </button>
//                         <span>Page {page} of {totalPages}</span>
//                         <button onClick={() => handlePagination(page + 1)} disabled={page === totalPages}>
//                             Next
//                         </button>
//                     </div>
//                 )}
//             </div>

//             {showDeletePopup && (
//                 <div className="popup">
//                     <p>Are you sure you want to delete this plan?</p>
//                     <button onClick={handleConfirmDelete}>Yes</button>
//                     <button onClick={closeDeletePopup}>No</button>
//                 </div>
//             )}

//             {selectedPlan && (
//                 <div className="details-modal">
//                     <h2>Plan Details</h2>
//                     <input
//                         type="text"
//                         value={details.appliedAmount}
//                         onChange={(e) => setDetails({ ...details, appliedAmount: e.target.value })}
//                         placeholder="Applied Amount"
//                     />
//                     {errors.appliedAmount && <div className="error">{errors.appliedAmount}</div>}
                    
//                     <input
//                         type="text"
//                         value={details.status}
//                         onChange={(e) => setDetails({ ...details, status: e.target.value })}
//                         placeholder="Status"
//                     />
//                     {errors.status && <div className="error">{errors.status}</div>}
                    
//                     <input
//                         type="date"
//                         value={details.applicationDate}
//                         onChange={(e) => setDetails({ ...details, applicationDate: e.target.value })}
//                     />
//                     {errors.applicationDate && <div className="error">{errors.applicationDate}</div>}
                    
//                     <textarea
//                         value={details.remarks}
//                         onChange={(e) => setDetails({ ...details, remarks: e.target.value })}
//                         placeholder="Remarks"
//                     />

//                     <input
//                         type="file"
//                         onChange={(e) => setDetails({ ...details, proofDocument: e.target.files[0] })}
//                     />
                    
//                     <button onClick={handlePlanDetailsSubmit}>Save</button>
//                     <button onClick={() => setSelectedPlan(null)}>Close</button>
//                 </div>
//             )}

//             {showSuccessModal && (
//                 <div className="success-modal">
//                     <h2>Success</h2>
//                     <p>Plan details have been updated successfully!</p>
//                     <button onClick={closeModal}>Close</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AppliedSavingsPlan;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import "./AppliedSavingsPlan.css";
import API_BASE_URL from '../apiConfig';
import ClientNavbar from './ClientNavbar';
import InquiryForm from './InquiryForm'; // Import InquiryForm

const AppliedSavingsPlan = () => {
    const navigate = useNavigate();
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [planToDelete, setPlanToDelete] = useState(null);
    const [appliedPlans, setAppliedPlans] = useState([]);
    const [filteredPlans, setFilteredPlans] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [sortValue, setSortValue] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [maxRecords, setMaxRecords] = useState(1);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isDetailsModal, setIsDetailsModal] = useState(false);
    const [details, setDetails] = useState({
        appliedAmount: "",
        status: "",
        remarks: "",
        proofDocument: ""
    });
    const [errors, setErrors] = useState({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [inquiryPlanId, setInquiryPlanId] = useState(null); // Add state for Inquiry Plan ID

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
            fetchData();
        } else {
            console.error("Token or User ID from state is missing");
            navigate("/login");
        }
    }, [userId, token, navigate]);

    async function fetchData() {
        const token = localStorage.getItem('token');
        console.log("Token in fetchData:", token);

        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/planapplications/user/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                console.log("Fetched Plans:", response.data);
                setAppliedPlans(response.data);
                setFilteredPlans(response.data);
                setMaxRecords(response.data.length);
            }
        } catch (error) {
            console.error("Error fetching applied plans:", error);
            console.log("Error Response:", error.response?.data || error.message);
            navigate("/error");
        }
    }

    const totalPages = Math.ceil(maxRecords / limit);

    const filterPlans = (search) => {
        const searchLower = search.toLowerCase();
        if (searchLower === "") return appliedPlans;
        return appliedPlans.filter((plan) =>
            plan.SavingsPlan.Name.toLowerCase().includes(searchLower)
        );
    };

    const handleSearchChange = (e) => {
        const inputValue = e.target.value;
        setSearchValue(inputValue);

        const filtered = filterPlans(inputValue);
        setFilteredPlans(filtered);
        setMaxRecords(filtered.length);
        setPage(1);  // Reset to the first page on new search
    };

    const toggleSort = (order) => {
        setSortValue(order);

        const sortedPlans = [...filteredPlans].sort((a, b) => {
            return order === 1
                ? new Date(a.ApplicationDate) - new Date(b.ApplicationDate)
                : order === -1
                ? new Date(b.ApplicationDate) - new Date(a.ApplicationDate)
                : 0;
        });

        setFilteredPlans(sortedPlans);
    };

    const handlePagination = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handleDeleteClick = (planId) => {
        setPlanToDelete(planId);
        setShowDeletePopup(true);
    };

    async function handleConfirmDelete() {
        try {
            const response = await axios.delete(
                `${API_BASE_URL}/api/planapplications/${planToDelete}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                fetchData();
            }
            closeDeletePopup();
        } catch (error) {
            console.error("Error deleting plan application:", error);
            navigate("/error");
        }
    }

    const closeDeletePopup = () => {
        setPlanToDelete(null);
        setShowDeletePopup(false);
    };

    const validatePlanDetails = () => {
        let validationErrors = {};

        if (!details.appliedAmount) {
            validationErrors.appliedAmount = "Applied amount is required.";
        }

        if (!details.status) {
            validationErrors.status = "Status is required.";
        }

        if (!details.applicationDate) {
            validationErrors.applicationDate = "Application date is required.";
        }

        return validationErrors;
    };

    const handlePlanDetailsSubmit = async () => {
        const validationErrors = validatePlanDetails();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const updatedPlan = {
                ...selectedPlan,
                AppliedAmount: details.appliedAmount,
                Status: details.status,
                Remarks: details.remarks,
                ProofDocument: details.proofDocument
            };
            const response = await axios.put(
                `${API_BASE_URL}/api/planapplications/${selectedPlan.PlanApplicationId}`,
                updatedPlan,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                setSelectedPlan(null);
                setIsDetailsModal(false);
                setShowSuccessModal(true);
                fetchData();
            }
        } catch (error) {
            console.error("Error updating plan application:", error);
            navigate("/error");
        }
    };

    const closeModal = () => {
        setSelectedPlan(null);
        setShowSuccessModal(false);
    };

    const renderActionButtons = (plan) => {
        return (
            <>
                <button
                    id='redButton'
                    onClick={() => handleDeleteClick(plan.PlanApplicationId)} // Use PlanApplicationId for identifying which plan to delete 
                >
                    Delete
                </button>
                <button
                    id='inquiryButton'
                    onClick={() => setInquiryPlanId(plan.PlanApplicationId)} // Set the Inquiry Plan ID
                >
                    Inquiry
                </button>
            </>
        );
    };

    return (
        <div>
            <ClientNavbar />
            <div id="policyHomeBody" className={showDeletePopup || selectedPlan || showSuccessModal || inquiryPlanId ? "page-content blur" : "page-content"}>
                <h1>Applied Plans</h1>
                <input
                    id='searchBox'
                    type="text"
                    placeholder="Search by Plan Name..."
                    value={searchValue}
                    onChange={handleSearchChange}
                />
                <table>
                    <thead>
                        <tr>
                            <th>Plan Name</th>
                            <th>Applied Amount</th>
                            <th>Application Date</th>
                            <th>Status</th>
                            <th>Remarks</th>
                            <th>Proof Document</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {filteredPlans.length ? (
                        <tbody>
                            {filteredPlans
                                .slice((page - 1) * limit, page * limit)
                                .map((plan) => (
                                    <tr key={plan.PlanApplicationId}>
                                        <td>{plan.SavingsPlan.Name}</td>
                                        <td>${plan.AppliedAmount}</td>
                                        <td>{new Date(plan.ApplicationDate).toLocaleDateString()}</td>
                                        <td>{plan.Status}</td>
                                        <td>{plan.Remarks}</td>
                                        <td>{plan.ProofDocument ? "Available" : "N/A"}</td>
                                        <td>{renderActionButtons(plan)}</td> {/* Render delete and inquiry buttons */}
                                    </tr>
                                ))}
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan="7" className='no-records-cell'>Oops! No Records Found</td>
                            </tr>
                        </tbody>
                    )}
                </table>

                {filteredPlans.length > 0 && (
                    <div className="pagination">
                        <button onClick={() => handlePagination(page - 1)} disabled={page === 1}>
                            Previous
                        </button>
                        <span>{page} / {totalPages}</span>
                        <button onClick={() => handlePagination(page + 1)} disabled={page === totalPages}>
                            Next
                        </button>
                    </div>
                )}
            </div>
            {showDeletePopup && (
                <div className="popup delete-popup">
                    <p>Are you sure you want to delete this plan application?</p>
                    <button className="confirm-delete-button" onClick={handleConfirmDelete}>Yes</button>
                    <button className="cancel-delete-button" onClick={closeDeletePopup}>No</button>
                </div>
            )}
            {showSuccessModal && (
                <div className="popup success-popup">
                    <p>Plan Application updated successfully!</p>
                    <button className="confirm-success-button" onClick={closeModal}>Close</button>
                </div>
            )}
            {inquiryPlanId && (
                <InquiryForm
                    planApplicationId={inquiryPlanId} // Pass the selected plan application ID
                    onClose={() => setInquiryPlanId(null)} // Close the Inquiry Form
                />
            )}
        </div>
    );
};

export default AppliedSavingsPlan;
