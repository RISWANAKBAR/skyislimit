import React, { useState, useEffect } from "react";
import "./jobvaccancies.css";
import { Link } from "react-router-dom"; // Import Link

export default function Jobvaccancies() {
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/vacancies");
        const data = await response.json();
        setVacancies(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleEdit = (id) => {

    console.log(`Edit vacancy with ID: ${id}`);
  };

  const handleDelete = async (id) => {
    try {

      await fetch(`http://127.0.0.1:8000/api/vacancies/${id}`, {
        method: "DELETE",
      });


      setVacancies((prevVacancies) =>
        prevVacancies.filter((vacancy) => vacancy.id !== id)
      );

      console.log(`Vacancy with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting vacancy:", error);
    }
}

  return (
    <div>
      <h1>Vacancies List</h1>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <th>ID</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vacancies.map((vacancy) => (
            <tr key={vacancy.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td>{vacancy.id}</td>
              <td>{vacancy.status}</td>
              <td>{vacancy.start_date}</td>
              <td>{vacancy.end_date}</td>
              <td>{vacancy.description}</td>
              <td>
              <Link to={`/jobform/edit/${vacancy.id}`}>Edit</Link>

                <button onClick={() => handleDelete(vacancy.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "20px" }}>
        <Link to="/jobform">Create Job</Link><br></br>
        <Link to="/sheduledjobs">Shedule calender</Link>
      </div>
    </div>
  );
}
