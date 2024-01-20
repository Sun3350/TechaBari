import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminApprove.css'
import Link from 'next/link';
function UnpublishedBlogPosts() {
  const [unpublishedBlogPosts, setUnpublishedBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch unpublished blog posts from your API
    axios.get('http://localhost:5000/api/blogger/unpublished-blogs').then((response) => {
      setUnpublishedBlogPosts(response.data);
    });
    setLoading(false)
  }, []);

  const handlePublish = (postId) => {
    axios.post(`http://localhost:5000/api/blogger/publish/${postId}`)
      .then((response) => {
        // Remove the published post from the list
        setUnpublishedBlogPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      })
      .catch((error) => {
        // Handle the error, e.g., display an error message
        console.error('Error publishing post:', error);
      });
  };

  return (
    <div className='adminApprove-container'>
     <div className="myblogs-container">
          <p style={{fontSize:30,}}>Unpublish Blogs</p>
      </div>
  
      {loading && <p>Loading drafts...</p>}
      {!loading && unpublishedBlogPosts.length === 0 && <p>No unpublishedBlogPosts available.</p>}
      {!loading && unpublishedBlogPosts.length > 0 && (
         <ul>
         {unpublishedBlogPosts.map((post) => (
           <div key={post._id} className='adminApprove-card'>
             
             <Link href={`/Admin/singlePage/${post._id}`} className='draft--card'>
                {/* Use href instead of to for Next.js Link */}
              <h1>{post.title}</h1>
             <h3>Author: {post.author}</h3>
              </Link>
             {/*<button onClick={() => handlePublish(post._id)}>Publish</button>*/}
           </div>
         ))}
       </ul>
      )}
    </div>
  );
}

export default UnpublishedBlogPosts;
