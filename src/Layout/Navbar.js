import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#6A4C9C' }}> {/* Dark Lavender color */}
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">PROJECT MANAGEMENT SYSTEM</Link> {/* Replaced <a> with <Link> */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="btn btn-outline-light" to="/Addproject">Add Project</Link> {/* Fixed className */}
        </div>
      </nav>
    </div>
  );
}
