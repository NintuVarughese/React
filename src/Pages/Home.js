import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

export default function Home() {
  const [project, setProject] = useState([]);
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    loadProject();
  }, []);

  const loadProject = async () => {
    const result = await axios.get("http://localhost:8080/project");
    setProject(result.data);
  };

  const deleteProject = async (id) => {
    await axios.delete(`http://localhost:8080/project/${id}`);
    loadProject(); // Reload the project list after deletion
  };

  const handleSortChange = (event) => {
    const sortBy = event.target.value;
    navigate(`/sorted-projects/${sortBy}`); // Navigate to the sorted projects page
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Project List</h2>
          <div>
            <Link className="btn btn-outline-light me-2" to="/Addproject">
              Add Project
            </Link>
            <select className="form-select" onChange={handleSortChange}>
              <option value="">View Project Details in Sorted Order</option>
              <option value="budget">Sort by Budget</option>
              <option value="milestone">Sort by Milestone</option>
              <option value="risk">Sort by Risk</option>
              <option value="dependency">Sort by Dependency</option>
              <option value="date">Sort by Date</option>
            </select>
          </div>
        </div>
        <table className="styled-table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Project Name</th>
              <th scope="col">Risk</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Milestone</th>
              <th scope="col">Budget</th>
              <th scope="col">Dependency</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {project.map((project, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{project.name}</td>
                <td>{project.risk}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <td>{project.milestone}</td>
                <td>{project.budget}</td>
                <td>{project.dependency}</td>
                <td>
                  <Link
                    className="btn btn-dark-lavender mx-2"
                    to={`/viewUser/${project.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editProject/${project.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteProject(project.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}