import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import '../Styles/Login.css';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.user);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser({ email, password }));
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success('Login successful!');
      navigate('/');
    } else {
      toast.error(res.payload || 'Login failed');
    }
  };


  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please enter your credentials to login</p>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">Login</button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/signup">Create new account</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
