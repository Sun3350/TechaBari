'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './dashboard.css'; // Import the regular CSS file
import Image from 'next/image';
import profile from '../../public/profile.jpg';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faLock, faPen, faFileExcel, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Page1 from '../myblogs/page';
import Page2 from '../Admin/adminlogin/page';
import Page3 from '../create-blog/blog/[draftId]/page';
import Page4 from '../draft/page'
import { useRouter } from 'next/navigation';
import RootLayout,{ useToggleTheme } from '../layout';
const Dashboard = () => {

  const { theme, toggleTheme } = useToggleTheme();
  const [activeButton, setActiveButton] = useState(parseInt(localStorage.getItem('activeButton')) || 1);

  useEffect(() => {
    if (!localStorage.getItem('activeButton')) {
      localStorage.setItem('activeButton', '1');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('activeButton', activeButton.toString());
  }, [activeButton]);

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInformation = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not authenticated');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/auth/user-Info', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user information:', error);
        setError('Error fetching user information');
      }
    };

    fetchUserInformation();
  }, []);

  const router = useRouter();

  const handleNavigateToPage1 = () => {
    // Use the push method of the router to navigate to Page 1
    router.push('/create-blog/blog/[draftId]');
  };
  return (
    <RootLayout showHeader={false}>
    <div className="dashboard" >
      <div className="sidebar">
        <div className='logo'>
          <a href="#" className="logo-text">Techabari</a>
        </div>
        <div className={activeButton === 0 ? 'profile' : 'sidebarprofile'}>
          <Image src={profile} style={{ width: 50, height: 50, borderRadius: 50 }} />

          {user ? (
            <div style={{ display: 'flex', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <h2>{user.username}</h2>
              <h3>{user.isAdmin ? 'Admin' : 'Blogger'}</h3>
            </div>
          ) : (
            <p>{error || 'Loading...'}</p>
          )}
        </div>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className={activeButton === 1 ? 'activeButton' : 'sidebarButton'} onClick={() => setActiveButton(1)}>
    
              <FontAwesomeIcon className="icon" icon={faHouse} /><h5>Dashboard</h5>
      
          </div>
          <div className={activeButton === 2 ? 'activeButton' : 'sidebarButton'} onClick={() => setActiveButton(2)}>
      
              <FontAwesomeIcon className="icon" icon={faLock} /><h5>Admin</h5>
         
          </div>
         
            <div className={activeButton === 3 ? 'activeButton' : 'sidebarButton'} onClick={handleNavigateToPage1}  >
          
              <FontAwesomeIcon className="icon" icon={faPen} /><h5>Write</h5>
          
            </div>
         
            <div className={activeButton === 4 ? 'activeButton' : 'sidebarButton'} onClick={() => setActiveButton(4)}>
            
              <FontAwesomeIcon className="icon" icon={faFileExcel} /><h5>Draft</h5>
             
            </div>
          
        </div>
        <div className="downButton">
          <div className='button-t'>
            <FontAwesomeIcon className="icon" icon={faArrowLeft} /><h5>Logout</h5>
          </div>
          <div>
     
      <button onClick={toggleTheme}>
      {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
      </button>
    
    </div>
        </div>
      </div>

      <div className="mainContent">
        {/* Main content */}
        {activeButton === 1 && <Page1 />}
        {activeButton === 2 && <Page2 />}
        {activeButton === 4 && <Page4 />}
        {/* Add more conditions for additional pages */}
      </div>
    </div>
    </RootLayout>
  );
};

export default Dashboard;