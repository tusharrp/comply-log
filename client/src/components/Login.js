import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { FiGithub, FiTwitter } from 'react-icons/fi';
import { motion } from 'framer-motion';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post('http://localhost:5000/api/login', { email, password });
      localStorage.setItem('token', data.token);
      window.location.href ='https://complyv2.onrender.com/';
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="login-overlay"></div>
      <div className="login-content">
        <div className="left-panel">
          <h1 className="title">COMPLY</h1>
          <p className="subtitle">
            World’s First Autonomous AI Document Engineer.<br /> 
            **Just Prompt. Generate Complex Documents.**
          </p>
          <div className="social-login">
            <button className="social-btn google" onClick={() => handleSocialLogin('Google')}>
              <FcGoogle /> Continue with Google
            </button>
            <button className="social-btn github" onClick={() => handleSocialLogin('GitHub')}>
              <FiGithub /> Continue with GitHub
            </button>
            <button className="social-btn twitter" onClick={() => handleSocialLogin('Twitter')}>
              <FiTwitter /> Continue with Twitter
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="login-form" aria-label="Login Form">
          <h2 className="form-title">Log In</h2>

          {error && <div className="error">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="signup-text">
            Don’t have an account?{' '}
            <Link to="/signup" className="signup-link">Sign Up</Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
