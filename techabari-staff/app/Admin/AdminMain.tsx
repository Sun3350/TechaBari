import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Image from 'next/image'
import blogImage from '../../public/blogImage.jpg'
import '../myblogs/myblogs.css'
function UserBlogPosts() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Retrieve the JWT token from local storage
    const token = localStorage.getItem('token');

    if (token) {
      // Decode the token to access the claims (including the username)
      const decodedToken = jwt.decode(token);

      if (decodedToken) {
        const userUsername = decodedToken.username; // Assuming 'username' is the key in the token containing the username
        setUsername(userUsername);

        // Log the username
        console.log('Username:', userUsername);

        const fetchUserBlogPosts = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/blogger/posts-by-user/${userUsername}`);
            setBlogPosts(response.data);
          } catch (error) {
            console.error('Error fetching user blog posts:', error);
          }
        };

        fetchUserBlogPosts();
      }
    }
  }, []);
  useEffect(() => {
    const box = document.querySelector('.box');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fadeIn');
        }
      });
    });

    observer.observe(box);

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <div className='blogs-container'>
      <div className="myblogs-container">
          <p style={{fontSize:30,}}>Admin Dashboard</p>
      </div>
      
{    /**   <p>Welcome, {username}</p>*/}
      <div className='box'>
       {/** {blogPosts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {post.isPublished ? <p>Status: Verified</p> : <p>Status: Not Verified</p>}
          </li>
       ))}*/}
       <div className='blogs-box'>
          <div className='image-container'>
            <Image src={blogImage} alt="" style={{width: '100%', height:'100%', borderRadius:10, objectFit:'cover' }} />
          </div>
          <div className='blog-title'>
             <h2>Entertainment</h2>
             <h1>Nigeria flips the script: Crypto transactions resume with stringent customer checks</h1>
             <div className='author'>
              <h3>Sanya Tolu</h3>
              <h6>\</h6>
              <h3>4 weeks ago</h3>
             </div>
          </div>
       </div>
       <div className='blogs-box'>
          <div className='image-container'>
            <Image src={blogImage} alt="" style={{width: '100%', height:'100%', borderRadius:10, objectFit:'cover' }} />
          </div>
          <div className='blog-title'>
             <h2>Entertainment</h2>
             <h1>Nigeria flips the script: Crypto transactions resume with stringent customer checks</h1>
             <div className='author'>
              <h3>Sanya Tolu</h3>
              <h6>\</h6>
              <h3>4 weeks ago</h3>
             </div>
          </div>
       </div>
       <div className='blogs-box'>
          <div className='image-container'>
            <Image src={blogImage} alt="" style={{width: '100%', height:'100%', borderRadius:10, objectFit:'cover' }} />
          </div>
          <div className='blog-title'>
             <h2>Entertainment</h2>
             <h1>Nigeria flips the script: Crypto transactions resume with stringent customer checks</h1>
             <div className='author'>
              <h3>Sanya Tolu</h3>
              <h6>\</h6>
              <h3>4 weeks ago</h3>
             </div>
          </div>
       </div>
       <div className='blogs-box'>
          <div className='image-container'>
            <Image src={blogImage} alt="" style={{width: '100%', height:'100%', borderRadius:10, objectFit:'cover' }} />
          </div>
          <div className='blog-title'>
             <h2>Entertainment</h2>
             <h1>Nigeria flips the script: Crypto transactions resume with stringent customer checks</h1>
             <div className='author'>
              <h3>Sanya Tolu</h3>
              <h6>\</h6>
              <h3>4 weeks ago</h3>
             </div>
          </div>
       </div>
       <div className='blogs-box'>
          <div className='image-container'>
            <Image src={blogImage} alt="" style={{width: '100%', height:'100%', borderRadius:10, objectFit:'cover' }} />
          </div>
          <div className='blog-title'>
             <h2>Entertainment</h2>
             <h1>Nigeria flips the script: Crypto transactions resume with stringent customer checks</h1>
             <div className='author'>
              <h3>Sanya Tolu</h3>
              <h6>\</h6>
              <h3>4 weeks ago</h3>
             </div>
          </div>
       </div>
      </div>
    </div>
  );
}

export default UserBlogPosts;
