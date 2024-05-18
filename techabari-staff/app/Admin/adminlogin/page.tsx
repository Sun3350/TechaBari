'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import Adminpage from '../adminpage/page';
import { TailSpin } from 'react-loader-spinner';
import './Login.css';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

// AdminLogin.tsx
export const handleLogoutAdmin = (router: AppRouterInstance | string[]) => {
  router.push('/');
  console.log('Router:', router); 

  localStorage.removeItem('adminIsLoggedIn');
  
  
};



const AdminLogin: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [adminIsLoggedIn, setAdminIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);


  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/auth/admin-login', {
        username: username,
        password: password,
      });

      const userData = response.data;
      const user = userData.user;
      router.push('/Admin/published');
      console.log('User authenticated:', user);
      localStorage.setItem('adminIsLoggedIn', 'true');
      setAdminIsLoggedIn(true);
      setLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    
    } catch (error) {
      setLoading(false);
      console.error('API request error:', error);
      setError('An error occurred during login. Please try again later.');

      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="adminLogin-Container">
    
          <div className="login-container">
            <form onSubmit={handleAdminLogin} className="flex flex-col items-center justify-center h-96 px-40">
              <input
                className="inputField w-80 max-w-md px-4 py-2 mb-4 placeholder-gray-600 border border-gray-300"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="relative w-80">
                <input
                  className="inputField w-80 max-w-md px-4 py-2 placeholder-gray-600 border border-gray-300"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={faEye}
                    className={`h-6 w-6 ${showPassword ? 'text-gray-600' : 'text-gray-400'}`}
                  />
                </span>
              </div>
              <button
                className="login-button w-full max-w-md px-4 py-2 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:bg-gray-800"
                disabled={loading}
              >
                {loading ? (
                  <TailSpin visible={true} height="20" width="20" color="#4fa94d" ariaLabel="tail-spin-loading" />
                ) : (
                  'Login'
                )}
              </button>
              {error && <div className="mt-4 text-red-600">{error}</div>}
              {responseMessage && <div className="mt-4 text-green-600">{responseMessage}</div>}
            </form>
    
        
      </div>
    </div>
  );
};

export default AdminLogin;
