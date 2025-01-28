import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './SortedProjects.css'; // Import the CSS file

export default function SortedProjects() {
  const { sortBy } = useParams(); // Get the sorting criteria from the URL
  const [sortedProjects, setSortedProjects] = useState([]);

  useEffect(() => {
    const fetchSortedProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/project/sorted/${sortBy}`);
        setSortedProjects(response.data);
      } catch (error) {
        console.error("Error fetching sorted projects:", error);
      }
    };

    fetchSortedProjects();
  }, [sortBy]);

  return (
    <div className="container">
      <div className="py-4">
        <h2>Projects Sorted by {sortBy}</h2>
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
            </tr>
          </thead>
          <tbody>
            {sortedProjects.map((project, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{project.name}</td>
                <td>{project.risk}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <td>{project.milestone}</td>
                <td>{project.budget}</td>
                <td>{project.dependency}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link className="btn btn-primary my-2" to="/">
          Back to Home
        </Link>
      </div>
    </div>
  );
}