import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function ViewUser() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/project/${id}`);
        setProject(result.data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Project details</h2>
          <div className="card">
            <div className="card-header">
              <h5>Details of Project id: {project.id}</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><b>Name:</b> {project.name}</li>
              <li className="list-group-item"><b>Risk:</b> {project.risk}</li>
              <li className="list-group-item"><b>Start Date:</b> {project.startDate}</li>
              <li className="list-group-item"><b>End Date:</b> {project.endDate}</li>
              <li className="list-group-item"><b>Milestone:</b> {project.milestone}</li>
              <li className="list-group-item"><b>Budget:</b> {project.budget}</li>
              <li className="list-group-item"><b>Dependency:</b> {project.dependency}</li>
            </ul>
          </div>
          <Link className="btn btn-primary my-2" to="/">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}