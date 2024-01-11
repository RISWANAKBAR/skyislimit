import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 


export default function SheduledJobs() {
  const [scheduledVacancies, setScheduledVacancies] = useState([]);
  const [selectedVacancyId, setSelectedVacancyId] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/scheduled-vacancies"
        );
        const data = await response.json();
        setScheduledVacancies(data);
      } catch (error) {
        console.error("Error fetching scheduled vacancies data:", error);
      }
    };

    fetchData();
  }, []);
  const handleEdit = (id) => {
    console.log(`Edit vacancy with ID: ${id}`);
  };
  const handleDeleteScheduledVacancy = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/scheduled-vacancies/${id}`, {
        method: "DELETE",
      });

      setScheduledVacancies((prevScheduledVacancies) =>
        prevScheduledVacancies.filter(
          (scheduledVacancy) => scheduledVacancy.id !== id
        )
      );

      console.log(`Scheduled Vacancy with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting scheduled vacancy:", error);
    }
  };
  return (
    <div>
      <h1>Scheduled Vacancies List</h1>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <th>ID</th>
            <th>Vacancy ID</th>
            <th>User ID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {scheduledVacancies.map((scheduledVacancy) => (
            <tr
              key={scheduledVacancy.id}
              style={{ borderBottom: "1px solid #ddd" }}
            >
              <td>{scheduledVacancy.id}</td>
              <td>{scheduledVacancy.vacancy_id}</td>
              <td>{scheduledVacancy.user_id}</td>
              <td>{scheduledVacancy.status}</td>
              <td>
                <Link to={`/editsheduleform/edit/${scheduledVacancy.id}`}>
                  Edit
                </Link>
                <button
                  onClick={() =>
                    handleDeleteScheduledVacancy(scheduledVacancy.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "20px" }}>
        <Link to="/sheduledforms">sheedule job</Link>
        <br></br>
        <Link to="/">Home</Link>
        <br></br>
      </div>
    </div>
  );
}
