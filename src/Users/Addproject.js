import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure useNavigate is imported

export default function AddProject() {
  let navigate = useNavigate(); // Initialize navigate

  // Initialize state with project details
  const [project, setProject] = useState({
    name: "",
    risk: "",
    timeline: "",
    milestone: "",
    budget: "",
    dependency: ""
  });

  // Initialize state for error message
  const [error, setError] = useState("");

  // Handle input changes
  const onInputChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => { // Added async to handle async operations
    e.preventDefault();

    // Check if all fields are filled
    if (
      !project.name ||
      !project.risk ||
      !project.timeline ||
      !project.milestone ||
      !project.budget ||
      !project.dependency
    ) {
      setError("Please fill out all fields before submitting.");
      return; // Stop submission if fields are not filled
    }

    try {
      // Sending POST request to the API
      await axios.post("http://localhost:8080/project", project);
      // Redirecting to home page after successful submission
      navigate("/");
    } catch (error) {
      console.error("There was an error submitting the project!", error);
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    navigate("/"); // Redirect to home page on cancel
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Project</h2>

          {/* Display error message if validation fails */}
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
              <label htmlFor="timeline" className="form-label">
                Timeline
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Timeline"
                name="timeline"
                value={project.timeline}
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
            <button type="submit" className="btn btn-outline-primary">Submit</button>
            {/* Cancel button now navigates to the home page */}
            <button type="button" className="btn btn-outline-danger mx-2" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
