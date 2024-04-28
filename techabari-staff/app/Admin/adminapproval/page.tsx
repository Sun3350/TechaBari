'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminApprove.css'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
function UnpublishedBlogPosts() {
  const [publishedBlogs, setPublishedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [badgeCount, setBadgeCount] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogger/unpublished-blogs');
        setPublishedBlogs(response.data);
        const newBadgeCount = response.data.length;
        setBadgeCount(newBadgeCount);

      // Update localStorage with the new badge count
      localStorage.setItem('unpublishedBadgeCount', newBadgeCount.toString());
      } catch (error) {
        console.error('Error fetching published blogs:', error);
      }
      setLoading(false)
    };

    fetchData();
  }, []);

  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [hoveredPostId, setHoveredPostId] = useState(null);
  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/blogger/admin-delete/posts/${postId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Update state to remove the deleted post
      setPublishedBlogs((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      const newBadgeCount = badgeCount - 1;
      localStorage.setItem('unpublishedBadgeCount', newBadgeCount.toString());
  
      // Update state to re-render the component with the new count
      setBadgeCount(newBadgeCount);
    } catch (error) {
      console.error('Error deleting post:', error);
      // Handle error (e.g., display an error message)
    }
  };

  return (
    <div className='adminApprove-container'>
     <div className="adminApprove-header">
          <p style={{fontSize:30,}}>Unpublish Blogs</p>
          <div className="badge-container">
        {badgeCount > 0 && (
          <div className="badge">
           <span>{badgeCount}</span> 
          </div>
        )}
      </div>
      </div>
   
      {loading && <p>Loading unpublished Blogs...</p>}
      {!loading && publishedBlogs.length === 0 && <p>No ublishedBlogs available.</p>}
      {!loading && publishedBlogs.length > 0 && (
         <div className='aproveCard-container'>
         {publishedBlogs.map((post) => (
           <div key={post._id} className='adminApprove-card'
           onMouseEnter={() => setHoveredPostId(post._id)}
           onMouseLeave={() => setHoveredPostId(null)}
           >
              {deleteConfirmation === post._id && (
            <div className="delete-adm">
              <p className='dele'>Are you sure you want to delete this post?</p>
             <div className='option-butto'> <button onClick={() => handleDelete(post._id)}>Yes</button>
              <button onClick={() => setDeleteConfirmation(null)}>No</button></div>
            </div>
          )}
          {hoveredPostId === post._id && (
            <div className="icon-containe">
              <button onClick={() => setDeleteConfirmation(post._id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          )}
             <Link href={`/Admin/singlePage/${post._id}`} className='unpublished-card'>
                {/* Use href instead of to for Next.js Link */}
              <h1>{post.title}</h1>
             <h3>{post.author}</h3>
              </Link>
             {/*<button onClick={() => handlePublish(post._id)}>Publish</button>*/}
           </div>
         ))}
       </div>
      )}
    </div>
  );
}

export default UnpublishedBlogPosts;
