// NotificationSystem.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './page.css'; // Import CSS for styling
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const [notificationList, setNotificationList] = useState(false)
  const [notificationPopup, setNotificationPopup] = useState(false)
  const route = useRouter()
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notification/notifications');
        setNotifications(response.data);
        const notificationDisplayed = localStorage.getItem('notificationDisplayed');
        if (!notificationDisplayed && response.data.length > 0) {
          setNotificationPopup(true); // Show the popup notification
          localStorage.setItem('notificationDisplayed', true); // Mark the notification as displayed
          // Automatically hide the popup notification after 10 seconds
          setTimeout(() => {
            setNotificationPopup(false);
          }, 10000);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const NotificationsTag = () => {
    route.push('/Admin/adminlogin')
    setNotificationList(false)
  }
 
  return (
    <div className="notification-system-container">
      {/* Render notification icon/button */}
      <button className="notification-icon"  onClick={() => setNotificationList(!notificationList)}>
      <span className="badge">{notifications.length}</span>
        <span className="icon"><FontAwesomeIcon icon={faBell}/></span>
      </button>
     
     <div className={`notification-list ${notificationList ? 'show' : ''}`} >
        {notifications.map(notification => (
          <div key={notification.id} className="notification-item" onClick={NotificationsTag}>
            <p><strong>{notification.message}</strong> sent a new blog for verification.</p>
          </div>
        ))}
      </div>}
      
    </div>
  );
};

export default NotificationSystem;


