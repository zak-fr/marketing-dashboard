import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginForm from './LoginForm'; // Import the LoginForm component
import './App.css';
import './Campaigns.css'; // Import the CSS file for campaigns
import CampaignsPage from './Campaigns'; // Import the CampaignsPage component
import { FaBullhorn, FaVideo, FaUsers, FaComments, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import profileImage from './your-image.jpg';
import Dashboard from './Dashboard.js'; // Adjust the path as necessary
import VideoPage from './Video.js'; // Import the VideoPage component
import UserPage from './User'; // Import the UserPage component
import CommentsPage from './Comments'; // Import the CommentsPage component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token'); // Remove token from local storage
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />; // Render LoginForm if not logged in
  }

  return (
    <Router>
      <div className="dashboard">
        {/* Sidebar */}
        <div className="sidebar">
          {/* Profile Section */}
          <div className="profile-info">
            <img 
              src={profileImage} 
              alt="Profile"
              className="profile-picture"
            />
            <div className="profile-details">
              <div className="profile-name">John Doe</div>
              <div className="profile-label">Marketer</div>
            </div>
          </div>

          <div className="nav-buttons">
            <Link to="/">
              <button>
                <FaTachometerAlt /> Dashboard
              </button>
            </Link>
            <Link to="/campaigns">
              <button>
                <FaBullhorn /> Campaigns
              </button>
            </Link>
            <Link to="/videos">
              <button>
                <FaVideo /> Videos
              </button>
            </Link>
            <Link to="/users">
              <button>
                <FaUsers /> Users
              </button>
            </Link>
            <Link to="/comments">
              <button>
                <FaComments /> Comments
              </button>
            </Link>
          </div>
          <button className="sign-out" onClick={handleLogout}>
            <FaSignOutAlt /> Sign Out
          </button>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/videos" element={<VideoPage />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/comments" element={<CommentsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
