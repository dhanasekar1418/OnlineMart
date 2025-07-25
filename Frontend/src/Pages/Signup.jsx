import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/slices/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import '../Styles/Login.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(registerUser(formData));
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success('Account created successfully!');
      navigate('/');
    } else {
      toast.error(res.payload || 'Registration failed');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Create Account</h2>
        <p className="signup-subtitle">Join us today!</p>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="signup-button">Register</button>
        </form>

        <div className="signup-footer">
          <p>Already have an account? <Link to="/login">Sign in instead</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
