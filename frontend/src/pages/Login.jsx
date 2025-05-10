import React, { useState } from 'react';
import axios from 'axios';
import '../css/Login.css'; // Ensure this file exists and is styled

const API_BASE_URL = 'https://recipe-api-env.eba-vbe3vcqe.us-east-1.elasticbeanstalk.com';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/login`, form);

      const { token, userId, username } = response.data;

      // Save to localStorage for future authenticated requests
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username);

      alert('Login successful!');
      window.location.href = '/dashboard'; // Redirect to dashboard after login
    } catch (err) {
      console.error(err);
      alert('Error during login. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="login-input"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="login-input"
          required
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default Login;
