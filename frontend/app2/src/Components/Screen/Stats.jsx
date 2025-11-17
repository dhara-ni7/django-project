import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Link } from "react-router-dom";

function Stats() {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [chartData, setChartData] = useState({
    labels: [],
    total_requests: [],
  });

  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const canvasRef2 = useRef(null);
  const chartRef2 = useRef(null);

  // Fetch data whenever selectedStatus changes
  useEffect(() => {
    fetchData(selectedStatus);
  }, [selectedStatus]);

  const fetchData = async (status) => {
    try {
      const url = `/api/connectionrequestdata?status=${status}`;
      const response = await fetch(url);
      const data = await response.json();
      setChartData(data);
      updateChart(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const createChart = (data) => {
    // Line chart
    const ctx = canvasRef.current.getContext("2d");
    chartRef.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: "Number of Connection Requests by Month",
            data: data.total_requests,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Bar chart
    const ctx2 = canvasRef2.current.getContext("2d");
    chartRef2.current = new Chart(ctx2, {
      type: "bar",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: "Number of Connection Requests by Month",
            data: data.total_requests,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  const updateChart = (data) => {
    if (chartRef.current && chartRef2.current) {
      chartRef.current.data.labels = data.labels;
      chartRef.current.data.datasets[0].data = data.total_requests;
      chartRef.current.update();

      chartRef2.current.data.labels = data.labels;
      chartRef2.current.data.datasets[0].data = data.total_requests;
      chartRef2.current.update();
    } else {
      createChart(data);
    }
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  return (
    <div className="container m-3 p-2 card">
      <div className="row">
        <div className="col-md-3">
          <Link to="/" className="btn btn-dark my-1">
            Go Back
          </Link>
        </div>

        <h5>Number of Connection Requests in every month Visualization</h5>

        <div className="row">
          <div className="col-md-4">
            <br />
            <label htmlFor="status" className="form-label">
              Filter By Connection Status
            </label>
            <select
              className="form-select"
              id="status"
              onChange={handleStatusChange}
              value={selectedStatus}
            >
              <option value="">All</option>
              <option value="Connection Released">Connection Released</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-6">
            <canvas ref={canvasRef}></canvas>
          </div>
          <div className="col-md-6">
            <canvas ref={canvasRef2}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
