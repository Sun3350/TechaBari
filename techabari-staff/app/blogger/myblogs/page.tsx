'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import './myblogs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { formatDistanceToNow, parseISO } from 'date-fns';
import Notification from '../../../pages/Notification'
import {useRouter} from 'next/navigation';

function UserBlogPosts() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [username, setUsername] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [hoveredPostId, setHoveredPostId] = useState(null);
const router = useRouter()
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
  

  // Navigate to the dynamic route using router.push()
  const navigateToDynamicRoute = () => {
    router.push('/blogger/cat/technology');
  };

  return (
    <div className="blogs-container">

    <div className="myblogs-container">
      <p style={{ fontSize: 30 }}>All Blogs</p>
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
              <p className='delete'>Are you sure you want to delete this post?</p>
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
           <h2 onClick={() => navigateToDynamicRoute()}>{post.category}</h2>
           <Link href={`/blogger/myblogs/singlePage/${post._id}`}>
          <div className="image-containerr">
{post.images && ( <img
    src={`http://localhost:5000/uploads/${post.images}`}
    alt="Post Image"
    style={{ width: '100%', height: '100%', borderRadius: 10, objectFit: 'cover' }}
  />)}  
           </div>
         
            <h1 className="blog-title">{post.title.length > maxTitleLength ? post.title.slice(0, maxTitleLength) + '....' : post.title}</h1>
            <div className="author">
             
              {post.isPublished ? (
                <div className="author">
                  <p style={{ color: 'blue', fontWeight: 700 }}>Verified :</p>
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
          
          </Link>
        </div>
      ))}
    </div>
  </div>
  );
}

export default dynamic(() => Promise.resolve( UserBlogPosts), {ssr: false});
