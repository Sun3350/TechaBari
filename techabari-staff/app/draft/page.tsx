'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import './draft.css'
function DraftsPage() {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch drafts from the backend
        const response = await axios.get('http://localhost:5000/api/blogger/drafts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDrafts(response.data);
      } catch (error) {
        console.error('Error fetching drafts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrafts();
  }, []);
  const handleDeleteDraft = async (draftId) => {
    try {
      const token = localStorage.getItem('token');
  
      // Send a request to delete the draft
      await axios.delete(`http://localhost:5000/api/blogger/delete-drafts/${draftId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDrafts((prevDrafts) => prevDrafts.filter((draft) => draft._id !== draftId));
  
    } catch (error) {
      console.error('Error deleting draft:', error);
    }
  };
  
  return (
    <div className='draft-container'>
      <h2 style={{fontSize:30}}>Drafts</h2>
      {loading && <p>Loading drafts...</p>}
      {!loading && drafts.length === 0 && <p>No drafts available.</p>}
      {!loading && drafts.length > 0 && (
        <ul>
          {drafts.map((draft) => (
            <div key={draft._id} className='draft-card'>
              <Link href={`/create-blog/blog/${draft._id}`} className='draft--card'>
                {/* Use href instead of to for Next.js Link */}
                <button className='draft-button'  onClick={() => handleDeleteDraft(draft._id)}>
                 {draft.title}
                </button>
              </Link>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DraftsPage;
