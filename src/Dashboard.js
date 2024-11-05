// Dashboard.js
import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // Import CSS for styling

const Dashboard = () => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch('/api/statistics'); // Replace with your API endpoint
        const data = await response.json();
        setStatistics(data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics(); // Call the fetch function
  }, []); // Empty dependency array to run once on mount

  const lastComments = [
    {
      name: "John Doe",
      time: "2h ago",
      comment: "Great campaign results this month!",
    },
    {
      name: "Jane Smith",
      time: "4h ago",
      comment: "New video performing well on social media.",
    },
    {
      name: "Mike Johnson",
      time: "Yesterday",
      comment: "Positive results from the user feedback survey.",
    },
    {
      name: "Sarah Williams",
      time: "2d ago",
      comment: "Content strategy for Q2 is looking promising.",
    },
  ];

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="statistics">
        {Object.entries(statistics).map(([key, value]) => (
          <div key={key} className="stat-card">
            <h3>{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
            <p>{value}</p>
          </div>
        ))}
      </div>
      <h3>Latest Comments</h3>
      <ul className="comments-list">
        {lastComments.map((comment, index) => (
          <li key={index} className="comment-item">
            <strong>{comment.name}</strong> <span>{comment.time}</span>
            <p>{comment.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
