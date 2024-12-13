// import React from "react";
// import { useForm } from "react-hook-form";
// import "./PlanApplicationForm.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import API_BASE_URL from "../apiConfig";
// import ClientNavbar from "./ClientNavbar";

// function PlanApplicationForm() {
//   const navigate = useNavigate();
//   const userId = localStorage.getItem('userId');
//   const savingsPlanId = localStorage.getItem("SavingsPlanId");
//   const [filePreview, setFilePreview] = React.useState(null);

//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const onSubmit = async (data) => {
//     const requestObject = {
//       userId: userId,
//       savingsPlanId: savingsPlanId,
//       applicationDate: new Date().toISOString(), // Set ApplicationDate to current date
//       appliedAmount: data.appliedAmount,
//       status: "Pending", // Status is set to "Pending"
//       remarks: data.remarks || "",
//       proofDocument: filePreview,
//     };
  
//     console.log("Request Object:", requestObject); 
  
//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/api/planapplications`,
//         requestObject,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       if (response.status === 200) {
//         navigate("/appliedplans");
//       }
//     } catch (error) {
//       if (error.response) {
//         console.error("Error submitting plan application:", {
//           status: error.response.status,
//           data: error.response.data,
//           headers: error.response.headers,
//         });
//       } else {
//         console.error("Error submitting plan application:", error.message);
//       }
//       navigate("/error");
//     }    
//   };
  

//   // const handleFileChange = async (e) => {
//   //   const file = e.target.files[0];
//   //   if (file) {
//   //     try {
//   //       const base64String = await convertFileToBase64(file);
//   //       setFilePreview(base64String);
//   //     } catch (error) {
//   //       console.error("Error converting file to base64:", error);
//   //       navigate("/error");
//   //     }
//   //   }
//   // };

//   // const convertFileToBase64 = (file) => {
//   //   return new Promise((resolve, reject) => {
//   //     const reader = new FileReader();
//   //     reader.onload = () => resolve(reader.result);
//   //     reader.onerror = (error) => reject(error);
//   //     reader.readAsDataURL(file);
//   //   });
//   // };

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       try {
//         const base64String = await convertFileToBase64(file);
//         setFilePreview(base64String); // Ensure this includes the MIME type
//       } catch (error) {
//         console.error("Error converting file to base64:", error);
//         navigate("/error");
//       }
//     }
//   };
  
//   const convertFileToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (error) => reject(error);
//       reader.readAsDataURL(file); // This includes the MIME type
//     });
//   };

//   return (
//     <div>
//       <ClientNavbar />
//       <div className="container">
//         <div className="button-container">
//           <button className="back-button" onClick={() => navigate(-1)}>
//             Back
//           </button>
//           <h2 className="form-title">Plan Application Form</h2>
//         </div>
//         <form className="plan-form" onSubmit={handleSubmit(onSubmit)}>
//           <div className="form-group">
//             <label htmlFor="appliedAmount" className="form-label">
//               Applied Amount:<span className="required-asterisk">*</span>
//             </label>
//             <input
//               id="appliedAmount"
//               type="number"
//               className="form-input"
//               {...register("appliedAmount", {
//                 required: "Applied amount is required",
//                 min: { value: 1, message: "Applied amount must be greater than 0" }
//               })}
//             />
//             {errors.appliedAmount && (
//               <div className="error">{errors.appliedAmount.message}</div>
//             )}
//           </div>

//           <div className="form-group">
//             <label htmlFor="remarks" className="form-label">
//               Remarks:
//             </label>
//             <input
//               id="remarks"
//               type="text"
//               className="form-input"
//               {...register("remarks")}
//             />
//             {errors.remarks && (
//               <div className="error">{errors.remarks.message}</div>
//             )}
//           </div>

//           <div className="form-group">
//             <label htmlFor="file" className="form-label">
//               Proof Document:
//             </label>
//             <input
//               id="file"
//               type="file"
//               className="form-input"
//               onChange={handleFileChange}
//               accept=".jpg, .jpeg, .png, .pdf"
//             />
//           </div>

//           <div className="form-group">
//             <button type="submit" className="submit-button">
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default PlanApplicationForm;

import React from "react";
import { useForm } from "react-hook-form";
import "./PlanApplicationForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../apiConfig";
import ClientNavbar from "./ClientNavbar";

function PlanApplicationForm() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const savingsPlanId = localStorage.getItem("SavingsPlanId");
  const [filePreview, setFilePreview] = React.useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const requestObject = {
      userId: userId,
      savingsPlanId: savingsPlanId,
      applicationDate: new Date().toISOString(), // Set ApplicationDate to current date
      appliedAmount: data.appliedAmount,
      status: "Pending", // Status is set to "Pending"
      remarks: data.remarks || "",
      proofDocument: filePreview,
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/planapplications`,
        requestObject,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        navigate("/appliedplans"); // Navigate to the "appliedplans" page on successful submission
      }
    } catch (error) {
      console.error("Error submitting plan application:", error);
      navigate("/error");
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64String = await convertFileToBase64(file);
        setFilePreview(base64String);
      } catch (error) {
        console.error("Error converting file to base64:", error);
        navigate("/error");
      }
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <ClientNavbar />
      <div className="container">
        <div className="button-container">
          <button className="back-button" onClick={() => navigate(-1)}>
            Back
          </button>
          <h2 className="form-title">Plan Application Form</h2>
        </div>
        <form className="plan-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="appliedAmount" className="form-label">
              Applied Amount:<span className="required-asterisk">*</span>
            </label>
            <input
              id="appliedAmount"
              type="number"
              className={`form-input ${errors.appliedAmount ? 'input-error' : ''}`}
              {...register("appliedAmount", {
                required: "Applied amount is required",
                min: { value: 1, message: "Applied amount must be greater than 0" },
                max: { value: 500000, message: "Applied amount must be less than $500,000" }
              })}
            />
            {errors.appliedAmount && (
              <div className="error">{errors.appliedAmount.message}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="remarks" className="form-label">
              Remarks:
            </label>
            <input
              id="remarks"
              type="text"
              className={`form-input ${errors.remarks ? 'input-error' : ''}`}
              {...register("remarks")}
            />
            {errors.remarks && (
              <div className="error">{errors.remarks.message}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="file" className="form-label">
              Proof Document:
            </label>
            <input
              id="file"
              type="file"
              className={`form-input ${errors.file ? 'input-error' : ''}`}
              onChange={handleFileChange}
              accept=".jpg, .jpeg, .png, .pdf"
            />
          </div>

          <div className="form-group">
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PlanApplicationForm;
