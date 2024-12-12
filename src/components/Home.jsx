import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home(){
  const[isLoggedIn, setIsLoggedIn]=useState(false);
  const[isSignedUp, setIsSignedUp]=useState(false);
  const navigate=useNavigate();

  const handleGetStarted=()=>{
    if(!isSignedUp){
      navigate('/signup');
    }else if(!isLoggedIn) {
      navigate('/login');
    }else{
      navigate('/fileconversion');
    }
  };


  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero bg-gradient-to-b from-blue-900 via-blue-800 to-blue-600 text-white min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 lg:px-24 py-12">
        <div className="text-center lg:text-left max-w-lg">
          <h1 className="text-4xl sm:text-5xl my-7 font-bold mb-6 leading-tight animate-fadeIn">
            Highlighting Transformation of Data for RAG Pipelines
          </h1>
          <p className="text-base sm:text-lg mb-6">
            Ragify integrates Retrieval-Augmented Generation (RAG) techniques into AI workflows, combining data retrieval with AI-generated content for contextually accurate responses.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-yellow-500 text-black py-3 px-6 sm:px-8 rounded-lg font-semibold hover:bg-yellow-400 hover:scale-105 transform transition"
          >
            Get Started
          </button>
        </div>
        <div className="hero-image mt-8 lg:mt-0 lg:ml-12 animate-slideIn max-w-xs sm:max-w-md">
          <img
            src="logo.jpg"
            alt="Hero Representation"
            className="w-full rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-500"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="about py-16 px-4 lg:px-6 bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400 text-center text-white">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6 animate-fadeIn">
          Welcome to Ragify
        </h2>
        <p className="text-base sm:text-lg max-w-3xl mx-auto">
          Ragify is your ultimate solution for data transformation and file conversion. Fast, reliable, and efficient, we support a variety of file types to streamline your workflows.
        </p>
      </section>

      {/* Features Section */}
      <section className="features py-16 px-4 lg:px-6 bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-blue-900 mb-8">
          Why Choose Ragify?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="feature-card bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg hover:scale-105 transition duration-500">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-blue-700">
              Fast Conversion
            </h3>
            <p className="text-gray-700 text-sm sm:text-base">
              Convert files instantly with minimal effort and maximum efficiency.
            </p>
          </div>
          <div className="feature-card bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg hover:scale-105 transition duration-500">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-blue-700">
              Wide Format Support
            </h3>
            <p className="text-gray-700 text-sm sm:text-base">
              Support for PDFs, images, and more to meet all your needs.
            </p>
          </div>
          <div className="feature-card bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg hover:scale-105 transition duration-500">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-blue-700">
              AI-Driven Accuracy
            </h3>
            <p className="text-gray-700 text-sm sm:text-base">
              Utilize AI to ensure accurate and contextually relevant results.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
