'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import RootLayout from '@/app/layout';
import Image from 'next/image'
import './singlePage.css'
import blogImage from '../../../../public/blogImage.jpg'
function BlogDetails() {
  const router = useRouter();
  const [blogDetails, setBlogDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const pathnameArray = window.location.pathname.split('/');
        const postId = pathnameArray[pathnameArray.length - 1];
        const response = await axios.get(`http://localhost:5000/api/blogger/unpublished-blogs/${postId}`);
        setBlogDetails(response.data);
      } catch (error) {
        console.error('Error fetching blog details:', error);
      } finally {
        setLoading(false);
      }
    };

    
      fetchBlogDetails();
    
  }, []);

  if (loading) {
    return <p>Loading blog details...</p>;
  }

  return (
    <RootLayout>
    <div className='single-container'>
      <div className='top-single'>
        <Image src={blogImage} className='blogImage'/>
      <h1>{blogDetails.title}</h1>
      </div>
     
      <div className='middle-single'>
         <h3>Author: {blogDetails.author}</h3>
      <h2>Category: {blogDetails.category}</h2>
      </div>
     
      <p>{blogDetails.content}</p>
      <div className="buttons">
        <button>

          </button>
          
          <button>
            
          </button>
      </div>
    </div>
    </RootLayout>
  );
}

export default BlogDetails;
