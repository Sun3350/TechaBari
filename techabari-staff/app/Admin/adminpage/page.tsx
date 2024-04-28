
'use client'

import React, { useState, useEffect } from 'react';
import './dashboard.css';  // Import the regular CSS file
import Image from 'next/image'
import Page1 from '../published/page'
import Page2 from '../adminapproval/page'
import { useRouter } from 'next/navigation';
import profile from '../../../public/profile.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMoon, faPen, faSun} from '@fortawesome/free-solid-svg-icons';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { useToggleTheme } from '@/app/layout';
import { Badge } from '../../../pages/CountPage';
import LiveTime from '@/pages/LiveTime';

const Dashboard = () => {
 
  const router = useRouter();
  const { theme, toggleTheme } = useToggleTheme();
  
  const handleLogoutClick = () => {
    handleLogout(router);
  };
  // Retrieve the active button state from localStorage or default to 1
  const [activeButton, setActiveButton] = useState(
    parseInt(localStorage.getItem('activeButton')) || 1
  );

  // Set the initial active button state if it's not already set in localStorage
  useEffect(() => {
    if (!localStorage.getItem('activeButton')) {
      localStorage.setItem('activeButton', '1');
    }
  }, []);

  // Update localStorage when the active button changes
  useEffect(() => {
    localStorage.setItem('activeButton', activeButton.toString());
  }, [activeButton]);

  const handleButtonClick = (buttonId: React.SetStateAction<number>) => {
    setActiveButton(buttonId);
    // Add logic to display content for the selected button
  };
 
  return (
   
    <div className="dashboard">
      <div className="sidebar">
        
        <div
          className={activeButton === 0 ? 'profile' : 'sidebarprofile'}
          onClick={() => handleButtonClick(0)}
        >
       <Image src={profile}  style={{width:50, height:50, borderRadius:50}}/>
       <div style={{display:'flex', height:'100%', width:'100%', justifyContent:'center', alignItems:'center'}}>
        <h2>ADMIN</h2>
       </div>
        </div>
        <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <div
          className={activeButton === 1 ? 'activeButton' : 'sidebarButton'}
          onClick={() => handleButtonClick(1)}
        >
        <FontAwesomeIcon className="icon" icon={faHouse} /><h5>Admin Dashboard</h5>
        </div>
        <div
          className={activeButton === 2 ? 'activeButton' : 'sidebarButton'}
          onClick={() => handleButtonClick(2)}
        >
           <FontAwesomeIcon className="icon" icon={faCheck} /> <h5>Admin Approve</h5>
           <div className="badgeIcon">
            <Badge/>
          </div>
        </div>
        <div
          className={activeButton === 3 ? 'activeButton' : 'sidebarButton'}
          onClick={() => handleButtonClick(3)}
        >
        <FontAwesomeIcon className="icon" icon={faUser} />  <h5>Users</h5>
        </div>
        <div
          className={activeButton === 4 ? 'activeButton' : 'sidebarButton'}
          onClick={() => handleButtonClick(4)}
        >
         <FontAwesomeIcon className="icon" icon={faUser} /> <h5>Staff</h5> 
        </div>
       
       
        </div>
        <div className="downButtont">
          <div className='button-t' onClick={handleLogoutClick}>
          <FontAwesomeIcon className="icon" icon={faArrowLeft} /> <h2>Logout</h2>
            </div>
            <button onClick={toggleTheme}>
     {theme === 'light' ? (<FontAwesomeIcon className="icon" icon={faMoon} />) : (<FontAwesomeIcon className="icon" icon={faSun} />)}
     </button>
            <div>
     
    
   
   </div>
        </div>
      </div>

      <div className="mainContent">
        {/* Main content */}
        {activeButton === 1 && <Page1 />}
        {activeButton === 2 && <Page2 />}
       
        {/* Add more conditions for additional pages */}
      </div>
    </div>
  );
};



export default Dashboard;


