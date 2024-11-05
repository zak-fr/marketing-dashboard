// Campaigns.js
import React, { useState } from 'react';
import './Campaigns.css'; // Import the CSS for styling
import { FaPlus } from 'react-icons/fa'; // Import icons

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: "Campaign 1", status: "Active", date: "2023-01-01", comments: [] },
    { id: 2, name: "Campaign 2", status: "Completed", date: "2023-02-15", comments: [] },
    { id: 3, name: "Campaign 3", status: "Active", date: "2023-03-10", comments: [] },
  ]);
  
  const [videoTitle, setVideoTitle] = useState('');
  const [videoLink, setVideoLink] = useState('');

  const handleAddComment = (id) => {
    const newComment = prompt("Enter your comment:");
    if (newComment) {
      setCampaigns((prevCampaigns) =>
        prevCampaigns.map((campaign) =>
          campaign.id === id
            ? { ...campaign, comments: [...campaign.comments, newComment] }
            : campaign
        )
      );
    }
  };

  const handleEditCampaign = (id) => {
    const campaignToEdit = campaigns.find(campaign => campaign.id === id);
    const newName = prompt("Edit campaign name:", campaignToEdit.name);
    if (newName) {
      setCampaigns((prevCampaigns) =>
        prevCampaigns.map((campaign) =>
          campaign.id === id ? { ...campaign, name: newName } : campaign
        )
      );
    }
  };

  const handleDeleteCampaign = (id) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      setCampaigns((prevCampaigns) => prevCampaigns.filter(campaign => campaign.id !== id));
    }
  };

  const handleUploadVideo = () => {
    if (videoTitle && videoLink) {
      const newCampaign = {
        id: campaigns.length + 1,
        name: videoTitle,
        status: "Active",
        date: new Date().toISOString().split('T')[0],
        comments: [],
        videoLink: videoLink
      };
      setCampaigns([...campaigns, newCampaign]);
      setVideoTitle('');
      setVideoLink('');
    } else {
      alert("Please enter both title and link.");
    }
  };

  return (
    <div className="campaigns-container">
      <h1 className="page-title">Video Management</h1>
      <div className="input-group">
        <input 
          type="text" 
          placeholder="Enter video title" 
          value={videoTitle} 
          onChange={(e) => setVideoTitle(e.target.value)} 
          className="input-field"
        />
        <input 
          type="text" 
          placeholder="Enter video link" 
          value={videoLink} 
          onChange={(e) => setVideoLink(e.target.value)} 
          className="input-field"
        />
        <button className="upload-button" onClick={handleUploadVideo}>
          + Upload New Video
        </button>
      </div>

      <h3 className="campaigns-header">All Campaigns</h3>
      <table className="campaigns-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign.id}>
              <td>{campaign.id}</td>
              <td>{campaign.name}</td>
              <td>{campaign.status}</td>
              <td>{campaign.date}</td>
              <td>
                <button onClick={() => handleEditCampaign(campaign.id)} className="action-button">
                  ✏️ {/* Pencil emoji */}
                </button>
                <button onClick={() => handleDeleteCampaign(campaign.id)} className="action-button">
                  🗑️ {/* Trash can emoji */}
                </button>
                <button onClick={() => handleAddComment(campaign.id)} className="comment-button">
                  💬 {/* Comment emoji */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="comments-header">Comments</h3>
      {campaigns.map((campaign) => (
        <div key={campaign.id} className="comments-section">
          <h4>{campaign.name}</h4>
          {campaign.comments.length > 0 ? (
            <ul>
              {campaign.comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CampaignsPage;
