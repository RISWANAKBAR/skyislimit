import React, { useState } from "react";
import "./jobform.css";
import { Link } from "react-router-dom"; // Import Link
export default function Jobform() {
  const [formData, setFormData] = useState({
    job_id: "",
    status: "",
    start_date: "",
    end_date: "",
    description: "",
  });
  const [successMessage, setSuccessMessage] = useState(""); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const queryString = Object.keys(formData)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(formData[key])
      )
      .join("&");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/vacancies?${queryString}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response);
      if (response.ok) {
        setSuccessMessage("Job created successfully!"); // Set success message
        console.log("Job created successfully!");
      } else {
        console.error("Failed to create job:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <div>
    
    <form className="job-form" onSubmit={handleSubmit}>
      <label>
        Job ID:
        <input
          type="text"
          name="job_id"
          value={formData.job_id}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Status:
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Start Date:
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        End Date:
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
      <div style={{ marginTop: "20px" }}>
        <Link to="/">Home</Link>
      </div>
    </form>
    {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
}
