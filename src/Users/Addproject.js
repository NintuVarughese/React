import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddProject() {
  let navigate = useNavigate();

  const [project, setProject] = useState({
    name: "",
    risk: "",
    startDate: "",
    endDate: "",
    milestone: "",
    budget: "",
    dependency: ""
  });

  const [error, setError] = useState("");

  const onInputChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if endDate is after startDate
    if (new Date(project.endDate) <= new Date(project.startDate)) {
      setError("End Date must be after Start Date.");
      return;
    }

    // Check if all fields are filled
    if (
      !project.name ||
      !project.risk ||
      !project.startDate ||
      !project.endDate ||
      !project.milestone ||
      !project.budget ||
      !project.dependency
    ) {
      setError("Please fill out all fields before submitting.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/project", project);
      navigate("/");
    } catch (error) {
      console.error("There was an error submitting the project!", error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Project</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Project Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter project name"
                name="name"
                value={project.name}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="risk" className="form-label">
                Risk
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Risk"
                name="risk"
                value={project.risk}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="startDate" className="form-label">
                Start Date
              </label>
              <input
                type="date"
                className="form-control"
                name="startDate"
                value={project.startDate}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="endDate" className="form-label">
                End Date
              </label>
              <input
                type="date"
                className="form-control"
                name="endDate"
                value={project.endDate}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="milestone" className="form-label">
                Milestone
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Milestone"
                name="milestone"
                value={project.milestone}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="budget" className="form-label">
                Budget
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Budget"
                name="budget"
                value={project.budget}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dependency" className="form-label">
                Dependency
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Dependency"
                name="dependency"
                value={project.dependency}
                onChange={onInputChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-outline-danger mx-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}