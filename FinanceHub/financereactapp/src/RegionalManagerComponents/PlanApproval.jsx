import React, { useState, useEffect } from "react";
import "./PlanApproval.css"; // Update your CSS file accordingly
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../apiConfig";
import { useQuery } from "react-query";
import RegionalManagerNavbar from "./RegionalManagerNavbar";

const PlanApproval = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [maxRecords, setMaxRecords] = useState(1);

  const totalPages = Math.ceil(maxRecords / limit);
  const [savingsPlans, setSavingsPlans] = useState([]);

  const token = localStorage.getItem("token");

  const updateSavingsPlans = (newPlans) => {
    setSavingsPlans(newPlans);
    setMaxRecords(newPlans.length);
  };

  const handlePagination = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const fetchSavingsPlans = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/savingsplans`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        return res.data;
      } else {
        navigate("/error");
      }
    } catch (error) {
      navigate("/error");
    }
  };

  const fetchPlanById = async (savingsPlanId) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/savingsplans/${savingsPlanId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        return res.data;
      } else {
        console.error("Error fetching plan data:", res.status);
        return null;
      }
    } catch (error) {
      console.error("Error fetching plan data:", error.response ? error.response.data : error.message);
      return null;
    }
  };

  const updatePlanStatus = async (savingsPlanId, status) => {
    const planData = await fetchPlanById(savingsPlanId);
    if (planData) {
      planData.Status = status;
      try {
        const response = await axios.put(
          `${API_BASE_URL}/api/savingsplans/${savingsPlanId}`,
          planData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          refetch(); // Refresh data after status update
        }

        console.log("Plan status updated:", response.data);
      } catch (error) {
        if (error.response) {
          console.error("Error response data:", error.response.data);
          console.error("Error response status:", error.response.status);
        } else {
          console.error("Error updating plan status:", error.message);
        }
      }
    }
  };

  const { data, status, refetch } = useQuery("availablePlans", fetchSavingsPlans);

  useEffect(() => {
    if (data) {
      updateSavingsPlans(data);
    }
  }, [data]);

  const filterPlans = (plans, search) => {
    const searchLower = search.toLowerCase();
    return plans.filter(
      (plan) =>
        (statusFilter === "All" || plan.Status === statusFilter) &&
        (plan.Name.toLowerCase().includes(searchLower) ||
          plan.Description.toLowerCase().includes(searchLower))
    );
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  return (
    <div id="parent">
      <RegionalManagerNavbar />
      <div id="planApprovalBody">
        <h1>Savings Plans</h1>

        <div>
          <input
            id="searchBox"
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
          />
          <label id='filter'>
            Filter by Status:
            <select value={statusFilter} onChange={handleStatusFilterChange}>
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </label>
        </div>

        <table className="plan-approval-table">
          <thead>
            <tr>
              <th>Plan Name</th>
              <th>Goal Amount</th>
              <th>Time Frame</th>
              <th>Risk Level</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterPlans(savingsPlans, searchValue).length === 0 ? (
              <tr>
                <td colSpan="6" className="no-records">Oops! No records found</td>
              </tr>
            ) : (
              filterPlans(savingsPlans, searchValue)
                .slice((page - 1) * limit, page * limit)
                .map((plan) => (
                  <tr key={plan.SavingsPlanId}>
                    <td>{plan.Name}</td>
                    <td>${plan.GoalAmount}</td>
                    <td>{plan.TimeFrame} years</td>
                    <td>{plan.RiskLevel}</td>
                    <td>{plan.Status}</td>
                    <td>
                      {plan.Status === "Approved" ? (
                        <button
                          className="redButton"
                          onClick={() => updatePlanStatus(plan.SavingsPlanId, "Rejected")}
                        >
                          Reject
                        </button>
                      ) : plan.Status === "Rejected" ? (
                        <button
                          className="greenButton"
                          onClick={() => updatePlanStatus(plan.SavingsPlanId, "Approved")}
                        >
                          Approve
                        </button>
                      ) : (
                        <>
                          <button
                            className="greenButton"
                            onClick={() => updatePlanStatus(plan.SavingsPlanId, "Approved")}
                          >
                            Approve
                          </button>
                          <button
                            className="redButton"
                            onClick={() => updatePlanStatus(plan.SavingsPlanId, "Rejected")}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
        {filterPlans(savingsPlans, searchValue).length > 0 && (
          <div>
            <button
              className="viewplansbutton"
              onClick={() => handlePagination(page - 1)}
              disabled={page === 1}
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              className="viewplansbutton"
              onClick={() => handlePagination(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanApproval;
