import React, { useState } from 'react';
import axios from 'axios';
import '../css/Login.css'; // Ensure this CSS file exists

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://recipe-api-env.eba-vbe3vcqe.us-east-1.elasticbeanstalk.com/api/users/register', form);
      alert('Registration successful!');
      // Optionally, store the token and redirect
      localStorage.setItem('userId', response.data.userId); // backend must return it
      localStorage.setItem('token', response.data.token);

    } catch (err) {
      console.error(err);
      alert('Error during registration.');
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
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="login-input"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="login-input"
        />
        <button type="submit" className="login-button">Register</button>
      </form>
    </div>
  );
}

export default Register;
