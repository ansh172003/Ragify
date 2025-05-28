import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCopy, FaTrash, FaPlus, FaUpload, FaPlay } from 'react-icons/fa';
import { API_URL } from '../config';

function Dashboard() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [userData, setUserData] = useState(null);
  const [files, setFiles] = useState([]);
  const [apiKeys, setApiKeys] = useState([]);
  const [errors, setErrors] = useState({
    user: '',
    files: '',
    keys: '',
    test: ''
  });
  const [loading, setLoading] = useState({
    user: true,
    files: true,
    keys: true
  });
  const [generatingKey, setGeneratingKey] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [testQuery, setTestQuery] = useState('');
  const [testResponse, setTestResponse] = useState('');
  const [testing, setTesting] = useState(false);
  const [showTestSection, setShowTestSection] = useState(false);
  const [testApiKey, setTestApiKey] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Set up axios default headers
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/auth/me`);
        console.log('User data response:', response.data);
        setUserData(response.data);
        setErrors(prev => ({ ...prev, user: '' }));
      } catch (err) {
        console.error('User data fetch error:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
        setErrors(prev => ({ ...prev, user: 'Failed to fetch user data' }));
      } finally {
        setLoading(prev => ({ ...prev, user: false }));
      }
    };

    // Fetch files
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/files/`);
        setFiles(response.data);
        setErrors(prev => ({ ...prev, files: '' }));
      } catch (err) {
        console.error('Files fetch error:', err);
        setErrors(prev => ({ ...prev, files: 'Failed to fetch files' }));
      } finally {
        setLoading(prev => ({ ...prev, files: false }));
      }
    };

    // Fetch API keys
    const fetchApiKeys = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/keys/`);
        setApiKeys(response.data);
        setErrors(prev => ({ ...prev, keys: '' }));
      } catch (err) {
        console.error('API keys fetch error:', err);
        setErrors(prev => ({ ...prev, keys: 'Failed to fetch API keys' }));
      } finally {
        setLoading(prev => ({ ...prev, keys: false }));
      }
    };

    fetchUserData();
    fetchFiles();
    fetchApiKeys();
  }, [navigate]);

  // Add useEffect to monitor userData changes
  useEffect(() => {
    console.log('userData state changed:', userData);
  }, [userData]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key);
    // You can add a toast notification here
  };

  const handleDeleteKey = async (keyId) => {
    try {
      await axios.delete(`${API_URL}/api/keys/${keyId}`);
      setApiKeys(apiKeys.filter(key => key.id !== keyId));
      setErrors(prev => ({ ...prev, keys: '' }));
    } catch (err) {
      setErrors(prev => ({ ...prev, keys: 'Failed to delete API key' }));
    }
  };

  const handleGenerateKey = async () => {
    setGeneratingKey(true);
    try {
      await axios.post(`${API_URL}/api/keys/`, {
        name: `key-${new Date().getTime()}`
      });
      const response = await axios.get(`${API_URL}/api/keys/`);
      setApiKeys(response.data);
      setErrors(prev => ({ ...prev, keys: '' }));
    } catch (err) {
      setErrors(prev => ({ ...prev, keys: 'Failed to generate new API key' }));
    } finally {
      setGeneratingKey(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadingFile(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`${API_URL}/api/files/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const response = await axios.get(`${API_URL}/api/files/`);
      setFiles(response.data);
      setErrors(prev => ({ ...prev, files: '' }));
    } catch (err) {
      setErrors(prev => ({ ...prev, files: 'Failed to upload file' }));
    } finally {
      setUploadingFile(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleToggleKey = async (keyId, currentStatus) => {
    try {
      await axios.post(`${API_URL}/api/keys/${keyId}/toggle`);
      const response = await axios.get(`${API_URL}/api/keys/`);
      setApiKeys(response.data);
      setErrors(prev => ({ ...prev, keys: '' }));
    } catch (err) {
      setErrors(prev => ({ ...prev, keys: 'Failed to toggle API key status' }));
    }
  };

  const handleTestQuery = async () => {
    if (!testApiKey.trim()) {
      setErrors(prev => ({ ...prev, test: 'Please enter an API key' }));
      return;
    }

    setTesting(true);
    setErrors(prev => ({ ...prev, test: '' }));
    try {
      const response = await axios.post(`${API_URL}/api/query/ask`, 
        { query: testQuery },
        {
          headers: {
            'x-api-key': testApiKey.trim(),
            'Content-Type': 'application/json'
          }
        }
      );
      setTestResponse(response.data.response || response.data);
    } catch (err) {
      setErrors(prev => ({ ...prev, test: err.response?.data?.message || err.message || 'Failed to get response' }));
      setTestResponse('');
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-8 px-8">
      <div className="max-w-7xl mx-auto">
      {errors.user && (
            <div className="mb-6">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{errors.user}</span>
              </div>
            </div>
          )}
          {errors.files && (
            <div className="mb-6">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{errors.files}</span>
              </div>
            </div>
          )}
          {errors.keys && (
            <div className="mb-6">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{errors.keys}</span>
              </div>
            </div>
          )}
          {errors.test && (
            <div className="mb-6">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{errors.test}</span>
              </div>
            </div>
          )}
        <div className="mb-8">
          {loading.user ? (
            <span className="animate-pulse">Loading...</span>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-gray-800 pt-8">
                Hello, {userData?.username || userData?.name || 'User'}
              </h1>
            </>
          )}
        </div>

        {/* Files Table */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Your Files</h2>
            <div className="flex items-center">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingFile}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploadingFile ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <FaUpload className="mr-2" />
                    Upload File
                  </>
                )}
              </button>
            </div>
          </div>
          {loading.files ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading files...</p>
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No files uploaded yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Filename</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded At</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {files.map((file, index) => (
                    <tr key={file.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{file.original_filename}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          file.processed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {file.processed ? 'Processed' : 'Processing'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.file_type.toUpperCase()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatFileSize(file.file_size)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(file.uploaded_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* API Keys Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">API Keys</h2>
            <button
              onClick={handleGenerateKey}
              disabled={generatingKey}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generatingKey ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <FaPlus className="mr-2" />
                  Generate New Key
                </>
              )}
            </button>
          </div>
          {loading.keys ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading API keys...</p>
            </div>
          ) : apiKeys.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No API keys generated yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {apiKeys.map((key, index) => (
                    <tr key={key.id} className="hover:bg-gray-50 cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {key.key.substring(0, 5)}...{key.key.substring(key.key.length - 5)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleToggleKey(key.id, key.is_active)}
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer transition-colors ${
                            key.is_active ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          {key.is_active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleCopyKey(key.key)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <FaCopy />
                          </button>
                          <button
                            onClick={() => handleDeleteKey(key.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Test Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-semibold mb-6">Test API</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="testApiKey" className="block text-sm font-medium text-gray-700 mb-2">
                  API Key
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="testApiKey"
                    value={testApiKey}
                    onChange={(e) => {
                      setTestApiKey(e.target.value);
                      setErrors(prev => ({ ...prev, test: '' }));
                    }}
                    placeholder="Enter your API key..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                  {testApiKey && (
                    <button
                      onClick={() => {
                        setTestApiKey('');
                        setErrors(prev => ({ ...prev, test: '' }));
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="testQuery" className="block text-sm font-medium text-gray-700 mb-2">
                  Query
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="testQuery"
                    value={testQuery}
                    onChange={(e) => {
                      setTestQuery(e.target.value);
                      setErrors(prev => ({ ...prev, test: '' }));
                    }}
                    placeholder="Enter your query..."
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                  <button
                    onClick={handleTestQuery}
                    disabled={testing || !testQuery.trim() || !testApiKey.trim()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    {testing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Testing...
                      </>
                    ) : (
                      <>
                        <FaPlay className="mr-2" />
                        Test
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 min-h-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Response
              </label>
              <div className="h-full">
                { testResponse ? (
                  <div className="p-4 bg-white rounded-lg text-sm text-gray-700 whitespace-pre-wrap shadow-inner h-full overflow-auto">
                    {testResponse}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                    Response will appear here...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 