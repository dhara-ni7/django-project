import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Home.css";

function Home() {
  const [data, setData] = useState([]);
  const [totalpages, setTotalPages] = useState(1);
  const [currentpage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Whenever filter (search/date) changes → reset page to 1
  useEffect(() => {
    setCurrentPage(1);
  }, [startDate, endDate, searchQuery]);

  // Fetch data whenever current page or filters change
  useEffect(() => {
    fetchData();
  }, [currentpage, startDate, endDate, searchQuery]);

 const fetchData = async () => {
  try {
    let url = `/api/getApplicantsData/?page=${currentpage}`;

    if (startDate && endDate) {
      url += `&start_date=${startDate.toISOString().split("T")[0]}&end_date=${endDate.toISOString().split("T")[0]}`;
    }

    if (searchQuery && searchQuery.trim() !== "") {
      url += `&search=${searchQuery}`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    const jsonData = await response.json();
    setData(jsonData.data);
    setTotalPages(jsonData.total_page);
  } catch (error) {
    console.log("Error fetching data", error);
  }
};

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleFirstPageClick = () => setCurrentPage(1);
  const handleLastPageClick = () => setCurrentPage(totalpages);
  const handlePageClick = (page) => setCurrentPage(page);

  return (
    <div className="container">
      <h1>Applicants Details</h1>
      <hr />
      <Row>
        <p>Filter by date of Application</p>
        <Col md={2}>
          <Datepicker
            selected={startDate}
            className="form-control-date"
            onChange={handleStartDateChange}
            placeholderText="From date"
          />
        </Col>
        <Col md={2}>
          <Datepicker
            selected={endDate}
            className="form-control-date"
            onChange={handleEndDateChange}
            placeholderText="To date"
          />
        </Col>
        <Col md={3}></Col>
        <Col md={5}>
          <input
            type="text"
            className="form-control"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by applicant id"
          />
        </Col>
      </Row>
      <hr />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Applicant Name</th>
            <th>Gender</th>
            <th>District</th>
            <th>State</th>
            <th>Pincode</th>
            <th>Ownership</th>
            <th>GovtID type</th>
            <th>ID number</th>
            <th>Category</th>
            <th>Load applied</th>
            <th>Date of Application</th>
            <th>Status</th>
            <th>Reviewer ID</th>
            <th>Reviewer Name</th>
            <th>Reviewer comment</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((connection) => (
            <tr key={connection.id}>
              <td>{connection.id}</td>
              <td>{connection.Applicant.Applicant_Name}</td>
              <td>{connection.Applicant.Gender}</td>
              <td>{connection.Applicant.District}</td>
              <td>{connection.Applicant.State}</td>
              <td>{connection.Applicant.Pincode}</td>
              <td>{connection.Applicant.Ownership}</td>
              <td>{connection.Applicant.GovtID_Type}</td>
              <td>{connection.Applicant.ID_Number}</td>
              <td>{connection.Applicant.Category}</td>
              <td>{connection.Load_Applied}</td>
              <td>{connection.Date_of_Application}</td>
              <td>{connection.Status}</td>
              <td>{connection.Reviewer_ID}</td>
              <td>{connection.Reviewer_Name}</td>
              <td>{connection.Reviewer_Comments}</td>
              <td>
                <Link
                  type="button"
                  to={`/editApplicant/${connection.id}`}
                  className="btn btn-outline-success btn-sm"
                >
                  <i className="fa-solid fa-pen-to-square"></i>Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="container">
        <ul className="pagination">
          <li className={`page-item ${currentpage === 1 ? "disabled" : ""}`}>
            <button onClick={handleFirstPageClick} className="page-link">
              Go to First
            </button>
          </li>
          {Array.from({ length: totalpages }).map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentpage === index + 1 ? "active" : ""
              }`}
            >
              <button
                onClick={() => handlePageClick(index + 1)}
                className="page-link"
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentpage === totalpages ? "disabled" : ""
            }`}
          >
            <button onClick={handleLastPageClick} className="page-link">
              Go to Last
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
