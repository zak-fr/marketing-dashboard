// Comments.js
import React, { useState } from 'react';
import './Comments.css'; // Import the CSS for styling
import { FaTrash } from 'react-icons/fa'; // Import icons

const CommentsPage = () => {
  const [comments, setComments] = useState([
    { id: 1, user: "User 1", text: "This is a comment from User 1", date: "2023-01-01" },
  ]);

  const [newCommentText, setNewCommentText] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);

  const handleRemoveComment = (commentId) => {
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
  };

  const handleAddComment = () => {
    const newComment = {
      id: comments.length + 1,
      user: "User 4", // Replace with dynamic user if needed
      text: newCommentText,
      date: new Date().toISOString().split('T')[0], // Current date
    };
    setComments([...comments, newComment]);
    setNewCommentText("");
    setShowCommentForm(false);
  };

  return (
    <div className="comments-container">
      <h3>All Comments</h3>

      {showCommentForm && (
        <div className="new-comment-form">
          <textarea
            placeholder="Enter your comment"
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          />
          <button onClick={handleAddComment}>Submit</button>
          <button onClick={() => setShowCommentForm(false)} className="cancel-button">Cancel</button>
        </div>
      )}

      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <strong>{comment.user}</strong>: {comment.text} <span>({comment.date})</span>
              <button onClick={() => handleRemoveComment(comment.id)} className="remove-comment-button">
                <FaTrash /> Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
};

export default CommentsPage;
