'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './singlePage.css'
import RootLayout from '../../../layout';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
const SinglePostPage = () => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();


  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const pathnameArray = window.location.pathname.split('/');
        const postId = pathnameArray[pathnameArray.length - 1];

        const response = await axios.get(`http://localhost:5000/api/blogger/postDetails/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post details:', error);
        setError('Error fetching post details');
      }
    };

    fetchPostDetails()

  }, []);


  if (!post) {
    return (
    
        <div>Loading...</div>
       );
  }

  const goBack = () => {
    router.back();
  };

  return (
   
      <>
      <div className='single-container'>
      <div className="single-post-container">
        <div className='single-post-image'>{post.images && (<img
          src={`http://localhost:5000/uploads/${post.images}`}
          alt="Post Image"
          className='single-image' />)}
        </div>
        <div className="single-title">
          <h1>{post.title}</h1>
        </div>
        <div className='cat-div'>
          <h2> {post.category}</h2>
          <h3> {post.author}</h3>
        </div>
        <p dangerouslySetInnerHTML={{ __html: post.content }} style={{ fontSize: 14 }} />
      </div>
      {error && <div className="error-message">Error: {error}</div>}
    </div><div className="back-button" onClick={goBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
      </>
   
  );
};

export default SinglePostPage;
