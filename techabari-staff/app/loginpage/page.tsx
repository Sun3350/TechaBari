'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faListSquares } from '@fortawesome/free-solid-svg-icons';
import { loginSuccess, loginFailure  } from '../auth/authSlice';
import { useDispatch } from 'react-redux';
import RootLayout from '../layout';
import {TailSpin} from 'react-loader-spinner';
import './login.css'

const loginpage: React.FC = () => {

 const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

  
  
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          username: username,
          password: password,
        });
        setLoading(true);
        if (response.status === 200) {
          const token = response.data.token; 
          localStorage.setItem('token', token)
          setResponseMessage('Login successful.');
          setError('Login successful.');
          dispatch(loginSuccess(response.data));
          router.push('/');
          setLoading(false);
        } else {
          const errorData = response.data;
          setLoading(false);
          if (errorData && errorData.message) {
            setError(errorData.message);
          } else {
            setError('Login failed. Please check your credentials.');
          }
          setTimeout(() => {
            setError(null);
          }, 5000);
        }
      } catch (error) {
        console.error('Login error:', error);
        setError('An error occurred during login. Please try again later.');
        setTimeout(() => {
          setError(null);
        }, 3000);
        dispatch(loginFailure({ message: 'An error occurred during login.' }));
      }
    };
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };
    return (
      <RootLayout>
      <form onSubmit={handleLogin} className="flex flex-col items-center justify-center h-96   px-40" >
      <input
        className=" input-field w-80 max-w-md px-4 py-2 mb-4  placeholder-gray-600 border border-gray-300  "
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
        <div className="relative w-80">
          <input
           className=" input-field w-80 max-w-md px-4 py-2 t placeholder-gray-600 border border-gray-300"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
           <span
            onClick={toggleShowPassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            <FontAwesomeIcon icon={faEye} className={`h-6 w-6 ${showPassword ? 'text-gray-600' : 'text-gray-400'}`} />
          </span>
        </div>
          <button
        className="login-button  w-full max-w-md px-4 py-2 my-4 text-white  rounded-lg hover:bg-gray-800 focus:outline-none focus:bg-gray-800"
        disabled={loading}>
           {loading ? (
    <TailSpin  color="#FFFFFF" height={20} width={20} ariaLabel="tail-spin-loading"
    radius="1"
    wrapperStyle={{}}
    wrapperClass=""/>
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
</RootLayout>
    );
  }
  
  export default loginpage;
