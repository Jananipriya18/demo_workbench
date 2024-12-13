import React, { useState } from "react";
import "./PlanApplicationApproval.css"; // Ensure you have a CSS file for styling
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import API_BASE_URL from "../apiConfig";
import RegionalManagerNavbar from "./RegionalManagerNavbar";

const PlanApplicationApproval = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState(0);
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

  const toggleSort = (order) => {
    setSortValue(order);

    const sortedApplications = [...availableApplications];
    sortedApplications.sort((a, b) => {
      if (order === 1) {
        return a.AppliedAmount - b.AppliedAmount;
      } else if (order === -1) {
        return b.AppliedAmount - a.AppliedAmount;
      }
      return 0;
    });

    updateAvailableApplications(sortedApplications);
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
        navigate("/error");
      }
    } catch (error) {
      navigate("/error");
    }
  };

  const fetchApplicationById = async (applicationId) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/planapplications/${applicationId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status === 200) {
        return res.data;
      } else {
        console.error("Error fetching application data:", res);
        return null;
      }
    } catch (error) {
      console.error("Error fetching application data:", error);
      return null;
    }
  };

  const updateApplicationStatus = async (applicationId, status) => {
    const applicationData = await fetchApplicationById(applicationId);
    if (applicationData) {
      applicationData.Status = status; // Update the status in the application data

      try {
        const response = await axios.put(
          `${API_BASE_URL}/api/planapplications/${applicationId}`,
          applicationData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 200) {
          // Create a notification for the client
          await axios.post(
            `${API_BASE_URL}/api/notifications`,
            {
              UserId: applicationData.UserId,
              Message: `Your savings plan application has been ${status}.`,
              IsRead: false,
              CreatedAt: new Date().toISOString(),
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          refetch();
        } else {
          console.error("Error updating application status:", response);
        }
      } catch (error) {
        console.error("Error updating application status:", error);
      }
    }
  };

  const { data, status, refetch } = useQuery("availableApplications", fetchAvailableApplications);

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
      <RegionalManagerNavbar />
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
                    <td>
                      {application.Status === "Approved" ? (
                        <button
                          className="redButton"
                          onClick={() => updateApplicationStatus(application.PlanApplicationId, "Rejected")}
                        >
                          Reject
                        </button>
                      ) : application.Status === "Rejected" ? (
                        <button
                          className="greenButton"
                          onClick={() => updateApplicationStatus(application.PlanApplicationId, "Approved")}
                        >
                          Approve
                        </button>
                      ) : (
                        <>
                          <button
                            className="greenButton"
                            onClick={() => updateApplicationStatus(application.PlanApplicationId, "Approved")}
                          >
                            Approve
                          </button>
                          <button
                            className="redButton"
                            onClick={() => updateApplicationStatus(application.PlanApplicationId, "Rejected")}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          ) : (
            status === "success" && (
              <tbody>
                <tr>
                  <td colSpan={7} className="no-records-cell">
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

export default PlanApplicationApproval;
