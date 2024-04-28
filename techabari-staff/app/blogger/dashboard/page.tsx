import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faLock, faPen, faFileExcel, faArrowLeft, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { logout } from '../../auth/authSlice';
import { useToggleTheme } from '../../layout';
import './dashboard.css'; // Import the regular CSS file
import { handleLogoutAdmin } from '../../Admin/adminlogin/page';
import {Orbitron } from 'next/font/google';
const inter = Orbitron({   subsets: ['latin'], weight: ['900'] });

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useToggleTheme();

  const handleLogoutClick = () => {
    handleLogoutAdmin(router);
  };
  const adminIsLoggedIn = localStorage.getItem('adminIsLoggedIn'); // Retrieve adminIsLoggedIn from local storage

  // Define sidebar buttons data
  const sidebarButtons = adminIsLoggedIn === 'true' ? [
    { label: 'Admin Dashboard', icon: faHouse, route: '/Admin/published' },
    { label: 'Admin Approve', icon: faPen, route: '/Admin/adminapproval' },
    { label: 'Users', icon: faFileExcel, route: '/draft' }
  ] : [
    { label: 'Dashboard', icon: faHouse, route: '/blogger/myblogs' },
    { label: 'Admin', icon: faLock, route: '/Admin/adminlogin' },
    { label: 'Write', icon: faPen, route: '/blogger/create-blog' },
    { label: 'Draft', icon: faFileExcel, route: '/blogger/draft' }
  // Update active button based on route
  ]

  const handleNavigateToPage = (route: string) => {
    router.push(route);
  };
   const [activeButton, setActiveButton] = useState<string | null>(() => {
    // Retrieve the activeButton value from localStorage, default to null if not found
    return localStorage.getItem('activeButton') || null;
  });

  // Update localStorage whenever activeButton changes
  useEffect(() => {
    localStorage.setItem('activeButton', activeButton || '');
  }, [activeButton]);
  const handleButtonClick = (buttonLabel: React.SetStateAction<null>) => {
    setActiveButton(buttonLabel);
  };

  const handleButtonClickAndNavigation = (button: { label: any; route: any; }) => {
    handleButtonClick(button.label); // Call handleButtonClick
    handleNavigateToPage(button.route); // Call handleNavigateToPage
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <div className="sidebar">
      <div className="dashboard-logo">
        <h4 className={inter.className}>Techabari</h4>
      </div>
      <div className="sidebar-buttons">
        {sidebarButtons.map(button => (
          <div
            key={button.label}
            className={`sidebar-button ${activeButton === button.label ? 'active' : ''}`}
            onClick={() => handleButtonClickAndNavigation(button)}
          >
            <div className='sidebar-icon'>
            <FontAwesomeIcon icon={button.icon} /> </div>
            <h5>{button.label}</h5>
          </div>
        ))}
      </div>
      <div className="sidebar-footer">
  {adminIsLoggedIn ? (
    <div className='button-t' onClick={handleLogoutClick}>
      <FontAwesomeIcon className="icon" icon={faArrowLeft} /> <h2>Logout Admin</h2>
    </div>
  ) : (
    <div className="logout-button" onClick={handleLogout}>
      <FontAwesomeIcon className="icon" icon={faArrowLeft} />
      <h5>Logout</h5>
    </div>
  )}
</div>

      
    </div>
  );
};

export default Sidebar;
