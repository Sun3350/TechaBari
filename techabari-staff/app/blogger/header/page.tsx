
import React, {useEffect, useState} from 'react'
import { useToggleTheme } from '../../layout';
import './header.css'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import LiveTime from '@/pages/LiveTime';
import axios from 'axios';
import Notification from '@/pages/Notification';
const header = () => {
  const router = useRouter()
    const { theme, toggleTheme } = useToggleTheme();
    const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update the current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once

  // Format the time to display hours, minutes, and seconds
  const formattedTime = currentTime.toLocaleTimeString();

  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour >= 0 && currentHour < 12) {
      setGreeting('Good Morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);


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
  return (
    <div className='header-container'>
      <div className="header-logo">
     
      {user ? (
            <div style={{ display: 'flex', height: '100%', width: '100%', flexDirection:'column' }}>
              <div style={{display:'flex',justifyContent:'space-between', width:'100%'}}>
               <h1>{greeting}</h1>
              <h1>{user.username}</h1>
              </div>
            
              <h3 style={{marginTop:-5}}>{user.isAdmin ? '(Admin)' : '(Blogger)'}</h3>
            
            </div>
          ) : (
            <p>{error || 'Loading...'}</p>
          )}
        </div>
        <div className='search'>
        <input type='text' placeholder='search...' className='search-bar'/>
        </div>
        <div className="user">
        <div className='sub-logo'>
        {user ? ( <h3>{user.isAdmin ? (<Notification/>) : null}</h3>)
  : 
  (<p>'loading....'</p>)}
     <button onClick={toggleTheme}>
     {theme === 'light' ? (<FontAwesomeIcon className="icon" icon={faMoon} />) : (<FontAwesomeIcon className="icon" icon={faSun} />)}
     </button>
     <div>
     <LiveTime/>
     </div>
    
   </div>
        </div>
    </div>
  )
}

export default header
function useNavigation() {
  throw new Error('Function not implemented.');
}

