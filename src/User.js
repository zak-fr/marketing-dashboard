// User.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './User.css'; // Import the CSS for styling
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'; // Import icons

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", status: "Active" });

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:3001/users'); // Update the URL to match your backend
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  const handleCreateUser = async () => {
    if (!newUser.name || !newUser.email) {
      alert("Please enter both name and email.");
      return;
    }
    const response = await axios.post('http://localhost:3001/users', newUser); // Update the URL
    setUsers([...users, response.data]);
    setNewUser({ name: "", email: "", status: "Active" });
  };

  const handleDeleteUser = async (userId) => {
    await axios.delete(`http://localhost:3001/users/${userId}`); // Update the URL
    setUsers(users.filter(user => user._id !== userId));
  };

  return (
    <div className="users-container">
      <div className="button-group">
        <input
          type="text"
          placeholder="Enter name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Enter email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button className="create-user-button" onClick={handleCreateUser}>
          <FaPlus /> Create New User
        </button>
      </div>

      <h3>All Users</h3>
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>
                <button className="action-button" onClick={() => handleDeleteUser(user._id)}>
                  🗑️ {/* Delete User emoji */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPage;
