import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './Layout/Navbar';
import Home from './Pages/Home';
import Addproject from "./Users/Addproject";
import EditProject from './Users/Editproject';
import ViewUser from './Users/Viewproject';

import ViewProjects from './Pages/ViewProjects'; // Import the new component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Addproject" element={<Addproject />} />
          <Route exact path="/editproject/:id" element={<EditProject />} />
          <Route exact path="/viewUser/:id" element={<ViewUser />} />
          
          <Route exact path="/view-projects" element={<ViewProjects />} /> {/* New Route */}
        </Routes>
      </Router>
    </div>
  );
}

export default App; 