import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link to use for navigation

export default function Home() {
  const [project, setproject] = useState([]);

  useEffect(() => {
    loadproject();
  }, []);

  const loadproject = async () => {
    const result = await axios.get("http://localhost:8080/project");
    setproject(result.data);
  };

  const deleteProject = async (id) => {
    await axios.delete(`http://localhost:8080/project/${id}`);
    loadproject();
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="styled-table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Project Name</th>
              <th scope="col">Risk</th>
              <th scope="col">Timeline</th>
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
                <td>{project.timeline}</td>
                <td>{project.milestone}</td>
                <td>{project.budget}</td>
                <td>{project.dependency}</td>
                <td>
                  <Link 
                    className="btn btn-dark-lavender mx-2" 
                    to={`/viewUser/${project.id}`}> {/* Correct Link for View */}
                    View
                  </Link>
                  <Link 
                    className="btn btn-outline-primary mx-2" 
                    to={`/editProject/${project.id}`}>
                    Edit
                  </Link>
                  <button 
                    className="btn btn-danger mx-2"
                    onClick={() => deleteProject(project.id)}>
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
