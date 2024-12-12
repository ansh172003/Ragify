import React from 'react';

function Signup() {
  return (
    <div className="signup-container min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 via-blue-800 to-blue-600 text-white px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-blue-900">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-2">Full Name</label>
            <input 
              type="text" 
              id="name" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">Email Address</label>
            <input 
              type="email" 
              id="email" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              placeholder="Create a password"
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

