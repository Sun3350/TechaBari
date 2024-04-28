// AnotherPageComponent.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const DraftCount: React.FC = () => {
  const [draftCount, setDraftCount] = useState<number>(0);

  useEffect(() => {
    const fetchDraftCount = async () => {
      try {
        // Make a GET request to your backend endpoint for fetching draft count
        const response = await axios.get('http://localhost:5000/api/blogger/Draft-count');
        
        // Update the state with the fetched draft count
        setDraftCount(response.data.draftCount);
      } catch (error) {
        console.error('Error fetching draft count:', error);
      }
    };

    // Call the fetchDraftCount function when the component mounts
    fetchDraftCount();
  }, []);

  return (
    <span style={{color: 'white'}}>
      {draftCount}
    </span>
  );
};

export const Badge: React.FC = () => {
  const [badgeCount, setBadgeCount] = useState<number>(0);

  // Utility function to get the badge count from localStorage
  useEffect(() => {
    const fetchBadgeCount = async () => {
      try {
        // Make a GET request to your backend endpoint for fetching unpublished count
        const response = await axios.get('http://localhost:5000/api/blogger/unpublished-count');
        
        // Update the state with the fetched badge count
        setBadgeCount(response.data.unpublishedCount);
      } catch (error) {
        console.error('Error fetching unpublished count:', error);
      }
    };

    // Call the fetchBadgeCount function when the component mounts
    fetchBadgeCount();
  }, []);

  return (
    <span style={{color: 'white'}}>
     {badgeCount}
    </span>
  );
};
