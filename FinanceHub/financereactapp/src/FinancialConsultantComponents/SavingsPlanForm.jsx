import React, { useState, useEffect } from 'react';
import './SavingsPlanForm.css'; // Update to the correct CSS file name
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import FinancialConsultantNavbar from './FinancialConsultantNavbar';

const SavingsPlanForm = () => {
  const navigate = useNavigate();
  const { savingsPlanId } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    goalAmount: '',
    timeFrame: '',
    riskLevel: '',
    description: '',
    status: 'Pending', // Default status set to Pending
  });

  const [errors, setErrors] = useState({});

  const riskLevels = ['Low', 'Medium', 'High'];

  useEffect(() => {
    if (savingsPlanId) {
      fetchSavingsPlan(savingsPlanId);
    }
  }, [savingsPlanId]);

  const fetchSavingsPlan = async (savingsPlanId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/savingsplans/${savingsPlanId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        setFormData({
          name: response.data.Name,
          goalAmount: response.data.GoalAmount,
          timeFrame: response.data.TimeFrame,
          riskLevel: response.data.RiskLevel,
          description: response.data.Description,
          status: response.data.Status || 'Pending', // Default to Pending if no status is provided
        });
      }
    } catch (error) {
      if (error.response) {
        // Log server response for more detailed error information
        console.log("Server responded with an error:", error.response.data);
      } else if (error.request) {
        // Log if the request was made but no response was received
        console.log("No response received:", error.request);
      } else {
        // Log any other errors
        console.log("Error submitting savings plan:", error.message);
      }
    }
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSavingsPlan = async () => {
    const fieldErrors = {};

    // Plan Name validation
    if (!formData.name) {
      fieldErrors.name = 'Plan Name is required';
    } else if (formData.name.length > 100) {
      fieldErrors.name = 'Plan Name cannot exceed 100 characters';
    }

    // Goal Amount validation
    if (!formData.goalAmount) {
      fieldErrors.goalAmount = 'Goal Amount is required';
    } else if (parseFloat(formData.goalAmount) < 1000 || parseFloat(formData.goalAmount) > 10000000) {
      fieldErrors.goalAmount = 'Goal Amount must be between 1,000 and 10,000,000';
    }

    // Time Frame validation
    if (!formData.timeFrame) {
      fieldErrors.timeFrame = 'Time Frame is required';
    } else if (parseInt(formData.timeFrame) < 1 || parseInt(formData.timeFrame) > 50) {
      fieldErrors.timeFrame = 'Time Frame must be between 1 and 50 years';
    }

    // Risk Level validation
    if (!formData.riskLevel) {
      fieldErrors.riskLevel = 'Risk Level is required';
    } else if (!['Low', 'Medium', 'High'].includes(formData.riskLevel)) {
      fieldErrors.riskLevel = 'Risk Level must be Low, Medium, or High';
    }

    // Description validation
    if (!formData.description) {
      fieldErrors.description = 'Description is required';
    } else if (formData.description.length > 500) {
      fieldErrors.description = 'Description cannot exceed 500 characters';
    }

    // Status validation (set to 'Pending' initially)
    if (!['Pending', 'Approved', 'Rejected'].includes(formData.status)) {
      fieldErrors.status = 'Status must be Pending, Rejected, or Approved';
    }

    // If errors exist, stop submission
    if (Object.values(fieldErrors).some((error) => error)) {
      setErrors(fieldErrors);
      return;
    }

    try {
      // Proceed with submission if validation passes
      const requestObject = {
        Name: formData.name,
        GoalAmount: parseFloat(formData.goalAmount),
        TimeFrame: parseInt(formData.timeFrame),
        RiskLevel: formData.riskLevel,
        Description: formData.description,
        Status: formData.status,
      };

      const response = savingsPlanId
        ? await axios.put(`${API_BASE_URL}/api/savingsplans/${savingsPlanId}`, requestObject, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          })
        : await axios.post(`${API_BASE_URL}/api/savingsplans`, requestObject, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });

      if (response.status === 200) {
        navigate('/viewsavingsplans');
      }
    } catch (error) {
      console.log("Error submitting savings plan:", error);
    }
};

  return (
    <div>
      <FinancialConsultantNavbar />
      <div className="savings-plan-form-container">
        {savingsPlanId ? (
          <>
            <button 
              type="button" 
              className="back-button1"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <h2 className='Editheading'>Edit Savings Plan</h2>
          </>
        ) : (
          <h2>Create New Savings Plan</h2>
        )}
        <div>
          <div className="form-group">
            <label htmlFor="name">
              Plan Name <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Plan Name"
              onChange={handleChange}
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="goalAmount">
              Goal Amount <span className="required-asterisk">*</span>
            </label>
            <input
              type="number"
              name="goalAmount"
              value={formData.goalAmount}
              placeholder="Goal Amount"
              onChange={handleChange}
            />
            {errors.goalAmount && <div className="error">{errors.goalAmount}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="timeFrame">
              Time Frame (Years) <span className="required-asterisk">*</span>
            </label>
            <input
              type="number"
              name="timeFrame"
              value={formData.timeFrame}
              placeholder="Time Frame"
              onChange={handleChange}
            />
            {errors.timeFrame && <div className="error">{errors.timeFrame}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="riskLevel">
              Risk Level <span className="required-asterisk">*</span>
            </label>
            <select
              name="riskLevel"
              value={formData.riskLevel}
              onChange={handleChange}
            >
              <option value="">Select Risk Level</option>
              {riskLevels.map((level, index) => (
                <option key={index} value={level}>
                  {level}
                </option>
              ))}
            </select>
            {errors.riskLevel && <div className="error">{errors.riskLevel}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="description">
              Description <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              placeholder="Description"
              onChange={handleChange}
            />
            {errors.description && <div className="error">{errors.description}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="status">
              Status <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              name="status"
              value={formData.status}
              readOnly
            />
            {errors.status && <div className="error">{errors.status}</div>}
          </div>
          <button className='savings-plan-button' type="button" onClick={handleAddSavingsPlan}>
            {savingsPlanId ? 'Update Savings Plan' : 'Add Savings Plan'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavingsPlanForm;
