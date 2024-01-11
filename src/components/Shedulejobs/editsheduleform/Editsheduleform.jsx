import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Editsheduleform() {
  const [formData, setFormData] = useState({
    vacancy_id: "",
    status: "",
    user_id: "",
  });

  const { id } = useParams();

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/scheduled-vacancies/${id}`
      );
      const data = await response.json();
      setFormData({
        vacancy_id: data.vacancy_id,
        status: data.status,
        user_id: data.user_id,
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
        `http://127.0.0.1:8000/api/scheduled-vacancies/${id}`,
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
          value={formData.vacancy_id}
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
        User_id:
        <input
          type="text"
          name="user_id"
          value={formData.user_id}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <br />
      <button type="submit">Submit</button>
      <div style={{ marginTop: "20px" }}>
        <Link to="/">Home</Link>
      </div>
    </form>
  );
}
