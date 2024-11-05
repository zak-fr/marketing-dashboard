// Video.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './Video.css'; // Import CSS for styling

const Video = () => {
  const [videos, setVideos] = useState([]); // State to hold the list of videos
  const [videoTitle, setVideoTitle] = useState(''); // State for new video title
  const [videoLink, setVideoLink] = useState(''); // State for new video link
  const [editingVideoId, setEditingVideoId] = useState(null); // State for the video being edited

  // Fetch videos from the backend
  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get('http://localhost:3001/videos'); // Update the URL to match your backend
      setVideos(response.data);
    };
    fetchVideos();
  }, []);

  const isValidUrl = (url) => {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\\.)+[a-z]{2,}|' + // domain name
      'localhost|' + // localhost
      '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|' + // IP address
      '\\[?[a-f0-9]*:[a-f0-9:%.~+\\-]*\\]?)' + // IPv6
      '(\\:\\d+)?(\\/[-a-z0-9+&@#/%=~_|\\?\\.:,]*)*$', 'i'); // path
    return !!pattern.test(url);
  };

  const handleUploadVideo = async () => {
    if (videoTitle && isValidUrl(videoLink)) {
      const newVideo = {
        title: videoTitle,
        link: videoLink,
        date: new Date().toLocaleDateString(),
      };
      const response = await axios.post('http://localhost:3001/videos', newVideo); // Update the URL
      
      // Check the response
      console.log('Uploaded Video:', response.data); // Log the response to see if it contains the new video

      // Update the state with the new video
      setVideos([...videos, response.data]); // Ensure this line is executed
      setVideoTitle(''); // Clear the input field
      setVideoLink(''); // Clear the link field
    } else {
      alert("Please enter a valid video title and link.");
    }
  };

  const handleEditVideo = (id) => {
    const videoToEdit = videos.find(video => video._id === id);
    setVideoTitle(videoToEdit.title);
    setVideoLink(videoToEdit.link);
    setEditingVideoId(id); // Set the ID of the video being edited
  };

  const handleUpdateVideo = async () => {
    if (editingVideoId && isValidUrl(videoLink)) {
      const updatedVideos = videos.map(video => 
        video._id === editingVideoId 
          ? { ...video, title: videoTitle, link: videoLink } 
          : video
      );
      await axios.put(`http://localhost:3001/videos/${editingVideoId}`, { title: videoTitle, link: videoLink }); // Update the video in the backend
      setVideos(updatedVideos); // Update the video list
      setVideoTitle(''); // Clear the input field
      setVideoLink(''); // Clear the link field
      setEditingVideoId(null); // Reset editing state
    } else {
      alert("Please enter a valid video link.");
    }
  };

  const handleDeleteVideo = async (id) => {
    await axios.delete(`http://localhost:3001/videos/${id}`); // Delete the video from the backend
    const updatedVideos = videos.filter(video => video._id !== id);
    setVideos(updatedVideos); // Remove video from the list
  };

  return (
    <div className="video-container">
      <h2>Video Management</h2>
      <div className="video-actions">
        <input
          type="text"
          placeholder="Enter video title"
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
          className="video-input"
        />
          <input
            type="url"
            placeholder="Enter video link"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            className="video-input"
            required
          />
        <button onClick={editingVideoId ? handleUpdateVideo : handleUploadVideo} className="action-button">
          <span>{editingVideoId ? '✔️' : '+'}</span> {editingVideoId ? 'Update Video' : 'Upload New Video'}
        </button>
      </div>

      {videos.length > 0 && (
        <table className="video-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Link</th>
              <th>Date Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map(video => (
              <tr key={video._id}>
                <td>{video._id}</td>
                <td>{video.title}</td>
                <td><a href={video.link} target="_blank" rel="noopener noreferrer">Watch</a></td>
                <td>{video.date}</td>
                <td>
                  <button onClick={() => handleEditVideo(video._id)} className="edit-button">✏️</button>
                  <button onClick={() => handleDeleteVideo(video._id)} className="delete-button">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Video;
