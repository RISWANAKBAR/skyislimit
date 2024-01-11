import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sheduledform() {
  const [formData, setFormData] = useState({
    vacancy_id: "",
    status: "",
    user_id: "",
  });
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
        `http://127.0.0.1:8000/api/scheduled-vacancies?${queryString}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Job created successfully!");
      } else {
        console.error("Failed to create job:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };
  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <label>
        vacancy_id:
        <input
          type="text"
          name="vacancy_id"
          value={formData.vacancy_id}
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
        user_id
        <input
          type="text"
          name="user_id"
          value={formData.user_id}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
      <div style={{ marginTop: "20px" }}>
        <Link to="/sheduledjobs">Back</Link>
      </div>
    </form>
  );
}
