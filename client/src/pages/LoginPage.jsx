import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import './AuthPage.css';

function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const { username, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/chat');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="auth-page">
      <Link to="/" className="back-button">
        <FaArrowLeft /> Back to Home
      </Link>
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={onSubmit}>
          <input type="text" name="username" value={username} onChange={onChange} placeholder="Username" required />
          <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
