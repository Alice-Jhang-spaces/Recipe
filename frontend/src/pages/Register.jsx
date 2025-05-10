import React, { useState } from 'react';
import axios from 'axios';
import '../css/Login.css'; // Reuse CSS styling

const API_BASE = "http://recipe-api-env.eba-vbe3vcqe.us-east-1.elasticbeanstalk.com";

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/api/users/register`, form);
      alert('Registration successful!');

      // Store returned values if your backend provides them
      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('token', res.data.token);

      // Optionally redirect to dashboard or login
      // navigate('/login');
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
