'use client'
import './globals.css'
import { Raleway, Orbitron } from 'next/font/google'
import React, {useState, useEffect, Suspense} from 'react'
import { ProviderRoute } from './auth/ProviderRoute'
import { PersistRoute } from './auth/PersistRouter'
import Header from './blogger/header/page'
import { useRouter } from 'next/navigation';
import Sidebar from './blogger/dashboard/page'
import PopUpLogin from '@/pages/PopUpLogin'

export function closePopup() {
 
  setShowPopup(false);
  
}
const inter = Raleway({ 
  subsets: ['latin'],
weight: ['400'] });
const interLogo = Orbitron({   subsets: ['latin'], weight: ['900'] });

export const useToggleTheme = () => {
  const [theme, setTheme] = useState('light');
  const router = useRouter();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.classList.toggle('dark-mode', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        setTheme('dark');
        document.body.classList.add('dark-mode');
      } else {
        setTheme('light');
        document.body.classList.remove('dark-mode');
      }
    }
  }, []);

  return { theme, toggleTheme };
  

};



export default function RootLayout({ children, showHeader = true }) {
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    // Check if the pop-up should be shown based on localStorage
    const shouldShowPopup = localStorage.getItem('showPopup');
    if (shouldShowPopup === 'true') {
      setShowPopup(true);
    }
    let timeoutId;
    const resetTimer = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        setShowPopup(true);
        localStorage.setItem('showPopup', 'true');
      }, 60 * 60 * 1000); // 1 hour in milliseconds
    };

    const handleUserActivity = () => {
      resetTimer();
    };

    // Listen for user activity events
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('mousedown', handleUserActivity);
    window.addEventListener('keypress', handleUserActivity);

    // Initial setup
    resetTimer();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('mousedown', handleUserActivity);
      window.removeEventListener('keypress', handleUserActivity);
      clearTimeout(timeoutId);
    };
  }, []);

  const { theme } = useToggleTheme();
  
  return (
    
    <html lang="en">
    <body className={inter.className}>
    <ProviderRoute> 
      <PersistRoute> 
      <div className="side--bar">
          <Sidebar/>
        </div>
        <div className='main-content'>
          <div className='top-home-header'>
          <Header/>
          </div>
         <Suspense fallback={<loading/>}>
        {showPopup && (
        <div className="popup">
         <div className="popup-content">
          <div className='popup-logo'>
          <h4 className={interLogo.className}>Techabari</h4>
          </div>
         
          <PopUpLogin/>
         </div>
       </div>
     )} 
     <div className="screen-popup">
        <h1 style={{color:'white'}}>You Can Only Operate This Page On a Laptop, Screen Size Blow 768px iS Not Allowed</h1>
     </div>
          {children}
          </Suspense>
          </div>
      </PersistRoute>
    </ProviderRoute>
    </body>
    </html>
  )
}


