import React, { useState, useEffect } from "react";
import "./ViewSavingsPlan.css";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import API_BASE_URL from "../apiConfig";
import FinancialConsultantNavbar from "./FinancialConsultantNavbar";

const ViewSavingsPlan = () => {
  const navigate = useNavigate();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [savingsPlanToDelete, setSavingsPlanToDelete] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [maxRecords, setMaxRecords] = useState(1);

  const totalPages = Math.ceil(maxRecords / limit);

  const [availableSavingsPlans, setAvailableSavingsPlans] = useState([]);

  const updateAvailableSavingsPlans = (newPlans) => {
    setAvailableSavingsPlans(newPlans);
    setMaxRecords(newPlans.length);
  };

  const toggleSort = (order) => {
    setSortValue(order);
    const sortedPlans = [...availableSavingsPlans];
    sortedPlans.sort((a, b) => {
      if (order === 1) {
        return a.GoalAmount - b.GoalAmount;
      } else if (order === -1) {
        return b.GoalAmount - a.GoalAmount;
      }
      return 0;
    });
    updateAvailableSavingsPlans(sortedPlans);
  };

  const handlePagination = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleDeleteClick = (planId) => {
    setSavingsPlanToDelete(planId);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (savingsPlanToDelete) {
        const response = await axios.delete(`${API_BASE_URL}/api/savingsplans/${savingsPlanToDelete}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 200) {
          refetch(); // Refresh data after deletion
        } else {
          console.log("Error");
        }
        closeDeletePopup();
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const closeDeletePopup = () => {
    setSavingsPlanToDelete(null);
    setShowDeletePopup(false);
  };

  const fetchAvailableSavingsPlans = async () => {
    const token = localStorage.getItem("token");
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

  const { data, status, refetch } = useQuery("availableSavingsPlans", fetchAvailableSavingsPlans);

  useEffect(() => {
    if (data) {
      updateAvailableSavingsPlans(data);
    }
  }, [data]);

  const filterSavingsPlans = (plans, search) => {
    const searchLower = search.toLowerCase();
    if (searchLower === "") return plans;
    return plans.filter(
      (plan) =>
        plan.Name.toLowerCase().includes(searchLower) ||
        plan.Description.toLowerCase().includes(searchLower)
    );
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const isButtonDisabled = (status) => {
    return status === "Approved" || status === "Rejected";
  };

  return (
    <div id="parent">
      <FinancialConsultantNavbar />
      <div id="savingsPlanHomeBody" className={showDeletePopup ? "blur" : ""}>
        <h1>Savings Plans</h1>

        <div>
          <input
            id="searchBox"
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>

        <table className="savings-plan-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>
                <div id="goalAmount">Goal Amount</div>
                <div>
                  <button className="sortButtons" onClick={() => toggleSort(1)}>
                    ⬆️
                  </button>
                  <button className="sortButtons" onClick={() => toggleSort(-1)}>
                    ⬇️
                  </button>
                </div>
              </th>
              <th>Time Frame</th>
              <th>Risk Level</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {status === "loading" && (
            <tbody>
              <tr>
                <td colSpan={7}>Loading...</td>
              </tr>
            </tbody>
          )}
          {status === "error" && (
            <tbody>
              <tr>
                <td colSpan={7}>Error loading data</td>
              </tr>
            </tbody>
          )}
          {status === "success" && filterSavingsPlans(availableSavingsPlans, searchValue).length ? (
            <tbody>
              {filterSavingsPlans(availableSavingsPlans, searchValue)
                .slice((page - 1) * limit, page * limit)
                .map((plan) => (
                  <tr key={plan.SavingsPlanId}>
                    <td>{plan.Name}</td>
                    <td>${plan.GoalAmount.toLocaleString()}</td>
                    <td>{plan.TimeFrame} months</td>
                    <td>{plan.RiskLevel}</td>
                    <td>{plan.Description}</td>
                    <td>{plan.Status}</td>
                    <td>
                      <button
                        className="viewSavingsPlanButton"
                        id="editButton"
                        onClick={() => {
                          navigate(`/editsavingsplan/${plan.SavingsPlanId}`);
                        }}
                        disabled={isButtonDisabled(plan.Status)}
                        style={{
                          backgroundColor: isButtonDisabled(plan.Status) ? "grey" : "green",
                          cursor: isButtonDisabled(plan.Status) ? "not-allowed" : "pointer",
                          color: "white",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(plan.SavingsPlanId)}
                        id="deleteButton"
                        disabled={isButtonDisabled(plan.Status)}
                        style={{
                          backgroundColor: isButtonDisabled(plan.Status) ? "grey" : "red",
                          cursor: isButtonDisabled(plan.Status) ? "not-allowed" : "pointer",
                          color: "white",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          ) : (
            status === "success" && (
              <tbody>
                <tr>
                  <td colSpan={7} className="no-records-cell">
                    Cannot find any savings plan
                  </td>
                </tr>
              </tbody>
            )
          )}
        </table>
        {filterSavingsPlans(availableSavingsPlans, searchValue).length > 0 && (
          <div>
            <button
              className="viewSavingsPlanButton"
              onClick={() => handlePagination(page - 1)}
              disabled={page === 1}
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              className="viewSavingsPlanButton"
              onClick={() => handlePagination(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {showDeletePopup && (
        <div className="delete-popup-savings-plan">
          <p>Are you sure you want to delete?</p>
          <button onClick={handleConfirmDelete}>Yes, Delete</button>
          <button onClick={closeDeletePopup}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ViewSavingsPlan;
