import React, { useState } from 'react';
import { FiUserPlus } from 'react-icons/fi';
import axios from 'axios';
import { motion } from 'framer-motion';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:5000/api/signup', formData);
      alert('User registered successfully!');
      setFormData({ firstName: '', lastName: '', email: '', password: '' });
    } catch (error) {
      console.error('Signup failed', error);
      setError('Signup failed. Please check your inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="signup-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Left Content */}
      <motion.div
        className="left-side"
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="left-heading">Join the Future with Comply</h1>
        <p className="left-text">
          Create, Collaborate, and Generate Documents<br /> 
          using **AI like Never Before!** 🚀
        </p>
        <img
          src="https://files.oaiusercontent.com/file-DspkSI63qYQkXIuhAEe8xOe5?se=2024-10-28T05%3A02%3A36Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dfd7cb89a-6384-49da-bbf6-d44c779af4f1.webp&sig=7V1VASweAldeRvsl6rY5RWj%2BGHblyo42Gyerabhma0k%3D"
          alt="Abstract Art"
          className="abstract-img"
        />
      </motion.div>

      {/* Signup Form */}
      <motion.div
        className="form-side"
        initial={{ x: '100vw' }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="form-container">
          <FiUserPlus className="form-icon" />
          <h2 className="form-title">Create Your Account</h2>
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="signup-form" aria-label="Signup Form">
            <div className="name-inputs">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="input-field"
                required
                aria-required="true"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="input-field"
                required
                aria-required="true"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              required
              aria-required="true"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              required
              aria-required="true"
            />

            <button
              type="submit"
              className={`submit-btn ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          <p className="login-text">
            Already have an account?{' '}
            <a href="/login" className="login-link">Login</a>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Signup;
