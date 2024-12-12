import React from 'react';
import { useNavigate } from 'react-router-dom';

function Pricing() {
  const navigate = useNavigate();

  const handleBasicPlan = () => {
    navigate('/fileconversion'); // Redirect to the conversion page
  };

  const handleProPlan = () => {
    window.open('https://paymentgateway.com', '_blank'); // Open payment gateway in a new tab
  };

  const handleEnterprisePlan = () => {
    alert('Thank you for your interest! Please contact us at support@ragify.com for enterprise solutions.');
  };

  return (
    <div className="pricing-container py-16 px-6 text-center bg-gradient-to-b from-blue-900 via-blue-800 to-blue-600 text-white">
      <h2 className="text-4xl my-6 font-bold mb-8 animate-fadeIn">Our Pricing Plans</h2>
      <p className="text-lg max-w-2xl mx-auto mb-12 animate-fadeIn">
        Choose a plan that suits your needs and enjoy seamless file conversions and AI-driven solutions.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto animate-slideIn">
        {/* Basic Plan */}
        <div className="pricing-card bg-white text-blue-900 p-8 shadow-lg rounded-lg transform hover:scale-105 transition duration-500">
          <h3 className="text-2xl font-bold mb-4">Basic Plan</h3>
          <p className="text-xl font-semibold mb-2">Free</p>
          <p className="text-sm text-gray-600 mb-4">Limited conversions per month</p>
          <ul className="text-gray-700 mb-6">
            <li className="mb-2">Up to 10 file conversions</li>
            <li className="mb-2">Basic support</li>
          </ul>
          <button
            onClick={handleBasicPlan}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-500 transition"
          >
            Get Started
          </button>
        </div>

        {/* Pro Plan */}
        <div className="pricing-card bg-gradient-to-b from-yellow-500 to-yellow-400 text-black p-8 shadow-lg rounded-lg transform hover:scale-105 transition duration-500">
          <h3 className="text-2xl font-bold mb-4">Pro Plan</h3>
          <p className="text-xl font-semibold mb-2">$10/month</p>
          <p className="text-sm mb-4">Unlimited conversions and premium support</p>
          <ul className="mb-6">
            <li className="mb-2">Unlimited file conversions</li>
            <li className="mb-2">Priority support</li>
            <li className="mb-2">Advanced conversion tools</li>
          </ul>
          <button
            onClick={handleProPlan}
            className="bg-blue-900 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            Subscribe Now
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="pricing-card bg-white text-blue-900 p-8 shadow-lg rounded-lg transform hover:scale-105 transition duration-500">
          <h3 className="text-2xl font-bold mb-4">Enterprise Plan</h3>
          <p className="text-xl font-semibold mb-2">Contact Us</p>
          <p className="text-sm text-gray-600 mb-4">Tailored solutions for businesses</p>
          <ul className="text-gray-700 mb-6">
            <li className="mb-2">Custom conversion tools</li>
            <li className="mb-2">Dedicated account manager</li>
            <li className="mb-2">Advanced analytics</li>
          </ul>
          <button
            onClick={handleEnterprisePlan}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-500 transition"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
