import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Image from 'next/image'
import blogImage from '../../public/blogImage.jpg'
import './published.css'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
function UserBlogPosts() {
  
  const [publishedBlogs, setPublishedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogger/published-blogs');
        setPublishedBlogs(response.data);
      } catch (error) {
        console.error('Error fetching published blogs:', error);
      }
      setLoading(false)
    };

    fetchData();
  }, []);

  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [hoveredPostId, setHoveredPostId] = useState(null);
  
  const handleDeleteConfirmation = (postId) => {
    setDeleteConfirmation(postId);
  };

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
    } catch (error) {
      console.error('Error deleting post:', error);
      // Handle error (e.g., display an error message)
    }
  };
 
  const maxTitleLength = 45;
  
  return (
    <div className='blogs-container'>
      <div className="myblogs-container">
          <p style={{fontSize:30,}}>Admin Dashboard</p>
      </div>
     
      {loading && <p>Loading Blogs...</p>}
      {!loading && publishedBlogs.length === 0 && <p>No ublishedBlogs available.</p>}
      {!loading && publishedBlogs.length > 0 && (
 <div className='published-container'>
      {publishedBlogs.map((post) => (
        <div key={post._id} className='published-card'
        onMouseEnter={() => setHoveredPostId(post._id)}
        onMouseLeave={() => setHoveredPostId(null)}
        >
          {deleteConfirmation === post._id && (
            <div className="delete-admin">
              <p className='delete-'>Are you sure you want to delete this post?</p>
             <div className='option-button-'> <button onClick={() => handleDelete(post._id)}>Yes</button>
              <button onClick={() => setDeleteConfirmation(null)}>No</button></div>
            </div>
          )}
          {hoveredPostId === post._id && (
            <div className="icon-container-">
              <button onClick={() => setDeleteConfirmation(post._id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <Link href={`/Admin/adminEdit/${post._id}`}>
                <FontAwesomeIcon icon={faEdit} />
              </Link>
            </div>
          )}
          <Link href={`/myblogs/singlePage/${post._id}`} className='draft--card'>
          <h2>{post.category}</h2>
          <div className="image-containerr">
{post.images && ( <img
    src={`http://localhost:5000/uploads/${post.images}`}
    alt="Post Image"
    style={{ width: '100%', height: '100%', borderRadius: 10, objectFit: 'cover' }}
  />)}  
           </div>
         
            <h1>{post.title.length > maxTitleLength ? post.title.slice(0, maxTitleLength) + '...' : post.title}</h1>
            <div>
            <h3>  {post.author}</h3>
            </div>
           </Link>
        </div>
      ))}
</div>
       )}
       </div>

  );
}

export default UserBlogPosts;
