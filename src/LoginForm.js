import React, { useState } from 'react';
import './LoginForm.css'; // Import the CSS file

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validCredentials = {
    username: 'hi', // Replace with your valid username
    password: 'hi', // Replace with your valid password
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === validCredentials.username && password === validCredentials.password) {
      onLogin();
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="remember-me">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="remember-checkbox"
          />
          <label>Remember me</label>
        </div>
        <button type="submit" className="submit-button">Submit</button>
        <div className="forgot-password">
          <a href="#" className="forgot-link">Forgot password?</a>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
