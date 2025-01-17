import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams for getting the ID

export default function EditProject() {
  let navigate = useNavigate();
  const { id } = useParams(); // To get the project id from the URL

  const [project, setProject] = useState({
    name: "",
    risk: "",
    timeline: "",
    milestone: "",
    budget: "",
    dependency: ""
  });

  const [error, setError] = useState("");

  // Fetch project details when component mounts
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/project/${id}`);
        setProject(response.data); // Set project details for editing
      } catch (error) {
        console.error("There was an error fetching the project!", error);
      }
    };
    
    if (id) {
      fetchProject();
    }
  }, [id]);

  const onInputChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!project.name || !project.risk || !project.timeline || !project.milestone || !project.budget || !project.dependency) {
      setError("Please fill out all fields before submitting.");
      return;
    }

    try {
      await axios.put(`http://localhost:8080/project/${id}`, project); // Updated method for PUT request to update project
      navigate("/"); // Redirect to home after success
    } catch (error) {
      console.error("There was an error submitting the project!", error);
    }
  };

  const handleCancel = () => {
    navigate("/"); // Cancel button will redirect to home
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Project</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Form fields with value populated from state */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Project Name</label>
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
              <label htmlFor="risk" className="form-label">Risk</label>
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
              <label htmlFor="timeline" className="form-label">Timeline</label>
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
              <label htmlFor="milestone" className="form-label">Milestone</label>
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
              <label htmlFor="budget" className="form-label">Budget</label>
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
              <label htmlFor="dependency" className="form-label">Dependency</label>
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
            <button type="button" className="btn btn-outline-danger mx-2" onClick={handleCancel}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
}
