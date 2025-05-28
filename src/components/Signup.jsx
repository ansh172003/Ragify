import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/auth/register', formData);
      if (response.data) {
        // Redirect to login page on successful signup
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during signup');
    }
  };

  return (
    <div className="signup-container min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 via-blue-800 to-blue-600 text-white px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-blue-900">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-2">User Name</label>
            <input 
              type="text" 
              id="username" 
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">Email Address</label>
            <input 
              type="email" 
              id="email" 
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              placeholder="Create a password"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-black py-3 rounded-lg font-semibold hover:scale-105 transform transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;

