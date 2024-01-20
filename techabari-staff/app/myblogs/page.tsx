'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Image from 'next/image';
import blogImage from '../../public/blogImage.jpg';
import './myblogs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

// Import statements...

function UserBlogPosts() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [username, setUsername] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [hoveredPostId, setHoveredPostId] = useState(null);

  useEffect(() => {
    const fetchUserBlogPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwt.decode(token);

        if (decodedToken) {
          const userUsername = decodedToken.username;
          setUsername(userUsername);

          const response = await axios.get(`http://localhost:5000/api/blogger/posts-by-user/${userUsername}`);
          setBlogPosts(response.data);
        }
      } catch (error) {
        console.error('Error fetching user blog posts:', error);
      }
    };

    fetchUserBlogPosts();
  }, []);

  const handleDeleteConfirmation = (postId) => {
    setDeleteConfirmation(postId);
  };

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/blogger/delete/posts/${postId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Update state to remove the deleted post
      setBlogPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      // Handle error (e.g., display an error message)
    }
  };

  const maxTitleLength = 50;

  return (
    <div className="blogs-container">
    <div className="myblogs-container">
      <p style={{ fontSize: 30 }}>Dashboard</p>
    </div>

    <div className="box">
      {blogPosts.map((post) => (
        <div
          key={post._id}
          className="blogs-box"
          onMouseEnter={() => setHoveredPostId(post._id)}
          onMouseLeave={() => setHoveredPostId(null)}
        >
          {deleteConfirmation === post._id && (
            <div className="delete-confirmation">
              <p>Are you sure you want to delete this post?</p>
             <div className='option-button'> <button onClick={() => handleDelete(post._id)}>Yes</button>
              <button onClick={() => setDeleteConfirmation(null)}>No</button></div>
            </div>
          )}
          {hoveredPostId === post._id && (
            <div className="icon-container">
              <button onClick={() => setDeleteConfirmation(post._id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <Link href={`/create-blog/edit/${post._id}`}>
                <FontAwesomeIcon icon={faEdit} />
              </Link>
            </div>
          )}
          <div className="image-container">
            <Image src={blogImage} alt="" style={{ width: '100%', height: '100%', borderRadius: 10, objectFit: 'cover' }} />
          </div>
          <div className="blog-title">
            <h2>{post.category}</h2>
            <h1>{post.title.length > maxTitleLength ? post.title.slice(0, maxTitleLength) + '...' : post.title}</h1>
            <div className="author">
              <h3>{username}</h3>
              <h6>\</h6>
              <h3>{post.timeAgo}</h3>
            </div>
            {post.isPublished ? <p>Status: Verified</p> : <p>Status: Not Verified</p>}
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}

export default UserBlogPosts;
