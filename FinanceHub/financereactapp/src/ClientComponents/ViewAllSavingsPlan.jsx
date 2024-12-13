import React, { useState, useEffect } from "react";
import "./ViewAllSavingsPlan.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSavingsPlanInfo } from "../savingsPlanSlice";
import API_BASE_URL from "../apiConfig";
import ClientNavbar from "./ClientNavbar";

const ViewAllSavingsPlan = () => {
  const navigate = useNavigate();
  const [availableSavingsPlans, setAvailableSavingsPlans] = useState([]);
  const [filteredSavingsPlans, setFilteredSavingsPlans] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [appliedSavingsPlans, setAppliedSavingsPlans] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const token = localStorage.getItem("token");
    console.log("Token:", token);  // Add this line for debugging

    try {
      const response = await axios.get(`${API_BASE_URL}/api/savingsplans`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const activeSavingsPlans = response.data.filter(
          (plan) => plan.Status === "Approved"
        );
        setAvailableSavingsPlans(activeSavingsPlans);
        setFilteredSavingsPlans(activeSavingsPlans);
      }
    } catch (error) {
      console.error("Error fetching data:", error.response ? error.response.data : error.message);
      navigate("/error"); // Redirect to error page
    }
  }

  const totalPages = Math.ceil(filteredSavingsPlans.length / limit);

  const filterSavingsPlans = (search) => {
    const searchLower = search.toLowerCase();
    if (searchLower === "") return availableSavingsPlans;
    return availableSavingsPlans.filter((plan) =>
      plan.Name.toLowerCase().includes(searchLower)
    );
  };

  const handleSearchChange = (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
    const filteredPlans = filterSavingsPlans(inputValue);
    setFilteredSavingsPlans(filteredPlans);
  };

  const toggleSort = (order) => {
    setSortValue(order);

    const sortedPlans = [...filteredSavingsPlans].sort((a, b) => {
      if (order === 1) {
        return a.GoalAmount - b.GoalAmount;
      } else if (order === -1) {
        return b.GoalAmount - a.GoalAmount;
      } else {
        return 0;
      }
    });

    setFilteredSavingsPlans(sortedPlans);
  };

  const handlePagination = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleApplyClick = (plan) => {
    const isPlanApplied = appliedSavingsPlans.some(
      (appliedPlan) =>
        appliedPlan.SavingsPlanId === plan.SavingsPlanId
    );

    if (isPlanApplied) {
      alert("Savings Plan is already applied.");
    } else {
      localStorage.setItem("SavingsPlanId", plan.SavingsPlanId);
      dispatch(
        setSavingsPlanInfo({
          SavingsPlanId: plan.SavingsPlanId,
          Name: plan.Name,
        })
      );
      navigate("/savingsPlanApplicationForm");
    }
  };

  return (
    <div>
      <ClientNavbar />
      <div id="savingsPlanHomeBody">
        <h1>Available Savings Plans</h1>

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
              <th>Description</th>
              <th>
                <div id="goalAmount">Goal Amount</div>
                <div>
                  <button
                    className="sortButtons"
                    role="ascending-button"
                    onClick={() => toggleSort(1)}
                  >
                    ⬆️
                  </button>
                  <button
                    className="sortButtons"
                    role="descending-button"
                    onClick={() => toggleSort(-1)}
                  >
                    ⬇️
                  </button>
                </div>
              </th>
              <th>Time Frame</th>
              <th>Risk Level</th>
              <th>Action</th>
            </tr>
          </thead>
          {filteredSavingsPlans.length ? (
            <tbody>
              {filteredSavingsPlans
                .slice((page - 1) * limit, page * limit)
                .map((plan) => (
                  <tr key={plan.SavingsPlanId}>
                    <td>{plan.Name}</td>
                    <td>{plan.Description}</td>
                    <td>${plan.GoalAmount}</td>
                    <td>{plan.TimeFrame} months</td>
                    <td>{plan.RiskLevel}</td>
                    <td>
                      {appliedSavingsPlans.some(
                        (appliedPlan) =>
                          appliedPlan.SavingsPlanId === plan.SavingsPlanId
                      ) ? (
                        "Applied Successfully"
                      ) : (
                        <button
                          className="viewallsavingsplansbutton"
                          id="greenButton"
                          onClick={() => handleApplyClick(plan)}
                        >
                          Apply
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={6} className="no-records-cell">
                  Oops! No records Found
                </td>
              </tr>
            </tbody>
          )}
        </table>
        {filteredSavingsPlans.length > 0 && (
          <div>
            <button
              className="viewallsavingsplansbutton"
              onClick={() => handlePagination(page - 1)}
              disabled={page === 1}
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              className="viewallsavingsplansbutton"
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

export default ViewAllSavingsPlan;

