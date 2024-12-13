import React, { useState } from "react";
import "./PlanApplicationRequested.css"; // Ensure you have a CSS file for styling
import { useQuery } from "react-query";
import axios from "axios";
import API_BASE_URL from "../apiConfig";
import FinancialConsultantNavbar from "./FinancialConsultantNavbar"; // Navbar for Financial Consultant

const PlanApplicationRequested = () => {
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [maxRecords, setMaxRecords] = useState(1);

  const totalPages = Math.ceil(maxRecords / limit);
  const [availableApplications, setAvailableApplications] = useState([]);

  const updateAvailableApplications = (newApplications) => {
    setAvailableApplications(newApplications);
    setMaxRecords(newApplications.length);
  };

  const handlePagination = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const fetchAvailableApplications = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/planapplications`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status === 200) {
        return res.data;
      } else {
        console.error("Error fetching applications");
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const { data, status } = useQuery("availableApplications", fetchAvailableApplications);

  React.useEffect(() => {
    if (data) {
      updateAvailableApplications(data);
    }
  }, [data]);

  const filterApplications = (applications, search) => {
    const searchLower = search.toLowerCase();
    return applications.filter(
      (application) =>
        (statusFilter === "All" || application.Status === statusFilter) &&
        (application.SavingsPlanId.toString().includes(searchLower) ||
          application.Remarks?.toLowerCase().includes(searchLower))
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
      <FinancialConsultantNavbar />
      <div id="applicationHomeBody">
        <h1>Savings Plan Applications</h1>

        <div>
          <input
            id="searchBox"
            type="text"
            placeholder="Search by SavingsPlanId..."
            value={searchValue}
            onChange={handleSearchChange}
          />
          <label id="filter">
            Filter by Status:
            <select value={statusFilter} onChange={handleStatusFilterChange}>
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </label>
        </div>

        <table className="application-table">
          <thead>
            <tr>
              <th>Savings Plan ID</th>
              <th>Applied Amount</th>
              <th>Application Date</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Proof</th>
            </tr>
          </thead>
          {status === "loading" && (
            <tbody>
              <tr>
                <td colSpan={6}>Loading...</td>
              </tr>
            </tbody>
          )}
          {status === "error" && (
            <tbody>
              <tr>
                <td colSpan={6}>Error loading data</td>
              </tr>
            </tbody>
          )}
          {status === "success" && filterApplications(availableApplications, searchValue).length ? (
            <tbody>
              {filterApplications(availableApplications, searchValue)
                .slice((page - 1) * limit, page * limit)
                .map((application) => (
                  <tr key={application.PlanApplicationId}>
                    <td>{application.SavingsPlanId}</td>
                    <td>${application.AppliedAmount}</td>
                    <td>{new Date(application.ApplicationDate).toLocaleDateString()}</td>
                    <td>{application.Status}</td>
                    <td>{application.Remarks}</td>
                    <td>{application.ProofDocument ? "Available" : "Not Provided"}</td>
                  </tr>
                ))}
            </tbody>
          ) : (
            status === "success" && (
              <tbody>
                <tr>
                  <td colSpan={6} className="no-records-cell">
                    Oops! No records Found
                  </td>
                </tr>
              </tbody>
            )
          )}
        </table>
        {filterApplications(availableApplications, searchValue).length > 0 && (
          <div>
            <button
              className="viewapplicationbutton"
              onClick={() => handlePagination(page - 1)}
              disabled={page === 1}
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              className="viewapplicationbutton"
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

export default PlanApplicationRequested;
