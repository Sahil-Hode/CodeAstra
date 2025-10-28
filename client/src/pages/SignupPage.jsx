import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import './AuthPage.css';

function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: ''
  });
  const navigate = useNavigate();

  const { username, password, password2 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      console.log('Passwords do not match');
    } else {
      try {
        const res = await axios.post('/api/signup', { username, password });
        localStorage.setItem('token', res.data.token);
        navigate('/chat');
      } catch (err) {
        console.error(err.response.data);
      }
    }
  };

  return (
    <div className="auth-page">
      <Link to="/" className="back-button">
        <FaArrowLeft /> Back to Home
      </Link>
      <div className="auth-form">
        <h2>Sign Up</h2>
        <form onSubmit={onSubmit}>
          <input type="text" name="username" value={username} onChange={onChange} placeholder="Username" required />
          <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
          <input type="password" name="password2" value={password2} onChange={onChange} placeholder="Confirm Password" required />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
