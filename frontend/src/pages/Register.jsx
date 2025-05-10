import React, { useState } from 'react';
import axios from 'axios';
import '../css/Login.css'; // Reuse styling
import { API_BASE_URL } from '../api'; // ✅ import your shared API base URL

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/users/register`, form); // ✅ no duplicate /api
      alert('Registration successful!');

      // If backend returns userId and token
      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('token', res.data.token);

      // Optional redirect
      // navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error during registration.');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Register</h2>
      <form className="login-form" onSubmit={handleRegister}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="login-input"
          required
        />
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
        <button type="submit" className="login-button">Register</button>
      </form>
    </div>
  );
}

export default Register;
