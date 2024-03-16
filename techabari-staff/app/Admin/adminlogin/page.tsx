'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import Adminpage from '../adminpage/page';
import './Login.css'
import  { TailSpin } from 'react-loader-spinner'
import Image from 'next/image';


const AdminLogin: React.FC = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

  
    const handleAdminLogin = async (e: React.FormEvent) => {
      e.preventDefault()
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:5000/api/auth/admin-login', {
          username: username,
          password: password,
        });
       
        if (response.status === 200) {
          const userData = response.data;
          setError('Login successful.');
          const user = userData.user;
    
          // Add a console log to check if the user is authenticated
          console.log('User authenticated:', user);
    
          setIsLoggedIn(true);
          setLoading(false);
          router.push('/Admin/adminpage');
          setLoading(false);
        } else if (response.status === 403) {
          setError('You do not have permission to access this resource.');
        } else if (response.status === 410) {
          setError('This resource is no longer available.');
        } else if (response.status === 500) {
          setError('An internal server error occurred. Please try again later.');
        } else {
          setError('An unknown error occurred.');
        }
      } catch (error) {
        setLoading(false);
        console.error('API request error:', error);
        setError('An error occurred during login. Please try again later.');
       
        setTimeout(() => {
          setError(null);
        }, 3000);
    
        // Dispatch the loginFailure action
      }
    };

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };
    const handleLogout = () => {
      setIsLoggedIn(false)
      router.push('/')
      console.log('working')
    }
    
 
    return (
      <div className='adminLogin-Container'>
        
        <div className='second'>
        {isLoggedIn ? (  
      <Adminpage onLogout={handleLogout} />
        ): (
          <div className='login-container'>
      <form onSubmit={handleAdminLogin} className=" flex flex-col items-center justify-center h-96   px-40">
      <input
        className="inputField w-80 max-w-md px-4 py-2 mb-4  placeholder-gray-600 border border-gray-300  "
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
        <div className="relative w-80">
          <input
           className=" inputField w-80 max-w-md px-4 py-2  placeholder-gray-600 border border-gray-300  "
          
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={toggleShowPassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {/* Font Awesome eye icon */}
            <FontAwesomeIcon icon={faEye} className={`h-6 w-6 ${showPassword ? 'text-gray-600' : 'text-gray-400'}`} />
          </span>
        </div>
      <button
        className="login-button w-full max-w-md px-4 py-2  text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:bg-gray-800"
         disabled={loading}>
      {loading ? (
    <TailSpin
    visible={true}
    height="20"
    width="20"
    color="#4fa94d"
    ariaLabel="tail-spin-loading"
    radius="1"
    wrapperStyle={{}}
    wrapperClass=""
    />
  ) : (
    'Login'
  )}
      </button>
      {error && (
        <div className="mt-4 text-red-600">
          {error}
        </div>
      )}
        {responseMessage && (
          <div className="mt-4 text-green-600">{responseMessage}</div>
        )}
    </form>
    </div>
       )}
       </div>
       </div>
    );
  }
  
  export default AdminLogin;
