import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Editform  () {
  const [formData, setFormData] = useState({
    job_id: "",
    status: "",
    start_date: "",
    end_date: "",
    description: "",
  });

  const { id } = useParams();

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/vacancies/${id}`);
      const data = await response.json();
      setFormData({
        job_id: data.id,
        status: data.status,
        start_date: data.start_date,
        end_date: data.end_date,
        description: data.description,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/vacancies/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update vacancy");
      }

      // If the update is successful, you may want to redirect or perform other actions
      console.log("Vacancy updated successfully");
    } catch (error) {
      console.error("Error updating vacancy:", error);
    }
  };
  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <label>
        Job ID:
        <input
          type="text"
          name="job_id"
          value={formData.job_id}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Status:
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Start Date:
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        End Date:
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
      <div style={{ marginTop: "20px" }}>
        <Link to="/">Home</Link>
      </div>
    </form>
  );
};
