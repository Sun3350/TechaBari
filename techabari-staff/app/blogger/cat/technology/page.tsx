'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import '../categories.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { formatDistanceToNow, parseISO } from 'date-fns';

const Technology = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [username, setUsername] = useState('');
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);
    const [hoveredPostId, setHoveredPostId] = useState(null);
  
    useEffect(() => {
        const fetchBlogs = async () => {
          try {
            // Fetch blogs based on a specific category
            const response = await axios.get('http://localhost:5000/api/blogger/categories-blogs', {
              params: {
                category: 'Technology', // Replace 'your-category' with the desired category
              },
            });
            setBlogPosts(response.data);
            
          } catch (error) {
            console.error('Error fetching blogs:', error);
        //    setError('Error fetching blogs');
            
          }
        };
    
        fetchBlogs();
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
      <div className="technology-blogs-container">
      <div className="technology-container">
        <p style={{ fontSize: 30, fontWeight:900 }}>TECHNOLOGY</p>
      </div>
      <div className="technology-box">
        {blogPosts.map((post) => (
           <Link href={`/blogger/myblogs/singlePage/${post._id}`}>
          <div
            key={post._id}
            className="technology-blogs-box"
            onMouseEnter={() => setHoveredPostId(post._id)}
            onMouseLeave={() => setHoveredPostId(null)}
          >
            {deleteConfirmation === post._id && (
              <div className="technology-delete-confirmation">
                <p className='delete'>Are you sure you want to delete this post?</p>
               <div className='option-button'> <button onClick={() => handleDelete(post._id)}>Yes</button>
                <button onClick={() => setDeleteConfirmation(null)}>No</button></div>
              </div>
            )}
            {hoveredPostId === post._id && (
              <div className="technology-icon-container">
                <button onClick={() => setDeleteConfirmation(post._id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <Link href={`/create-blog/edit/${post._id}`}>
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
              </div>
            )}
            
            <div className="technology-image-containerr">
  {post.images && ( <img
      src={`http://localhost:5000/uploads/${post.images}`}
      alt="Post Image"
      style={{ width: '100%', height: '100%', borderRadius: 10, objectFit: 'cover' }}
    />)}  
             </div>
             
              <div className="technology-author">
              <h2>{post.category}</h2>
              <h1 className="technology-blog-title">{post.title.length > maxTitleLength ? post.title.slice(0, maxTitleLength) + '....' : post.title}</h1>
                {post.isPublished ? (
                  <div className="technology-verified">
                    <p style={{ color: 'aqua', fontWeight: 700 }}>Verified :</p>
                    {post.publishedAt && (
                      <p style={{ fontSize: 12, color: '#777', marginLeft: 5 }}>
                       {formatDistanceToNow(parseISO(post.publishedAt), { addSuffix: true})}
                      </p>
                    )}
                  </div>
                ) : (
                  <p style={{ color: 'red' }}>Not Verified</p>
                )}
              </div>
            
           
          </div>
          </Link>
        ))}
      </div>
    </div>
    );
  }

export default Technology
