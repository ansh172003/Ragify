import React, { useState } from 'react';

function FileConversion() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleConversion = () => {
    alert('Your file has been successfully converted!');
  };

  return (
    <div className="file-conversion-container bg-gradient-to-b from-blue-900 via-blue-800 to-blue-600 min-h-screen py-16 px-6 text-center text-white flex flex-col items-center justify-center">
      {/* Header */}
      <h2 className="text-4xl font-bold mb-6 animate-fadeIn">
        Seamlessly Convert Your Files
      </h2>
      <p className="text-lg max-w-2xl mb-8">
        Ragify makes file conversion effortless and efficient. Upload your file and let us handle the transformation!
      </p>

      {/* File Upload */}
      <div className="file-upload mb-6">
        <label
          htmlFor="fileInput"
          className="bg-blue-700 hover:bg-blue-500 text-white py-3 px-6 rounded-lg font-medium cursor-pointer transition duration-300 transform hover:scale-105 shadow-lg"
        >
          {file ? file.name : 'Choose File'}
        </label>
        <input
          id="fileInput"
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Convert Button */}
      <button
        onClick={handleConversion}
        disabled={!file}
        className={`py-3 px-8 rounded-lg font-semibold shadow-lg transform transition-all duration-300 ${
          file
            ? 'bg-yellow-500 hover:bg-yellow-400 hover:scale-105'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Convert File
      </button>

      
    </div>
  );
}

export default FileConversion;