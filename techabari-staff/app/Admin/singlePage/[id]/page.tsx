'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import RootLayout from '@/app/layout';
import Image from 'next/image'
import './singlePage.css'
import blogImage from '../../../../public/blogImage.jpg'
import { TailSpin } from 'react-loader-spinner';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function BlogDetails() {
  const router = useRouter();
  const [blogDetails, setBlogDetails] = useState({});
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);

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
  const Notification = async () => {
    const pathnameArray = window.location.pathname.split('/');
      const postId = pathnameArray[pathnameArray.length - 1];

        const responds = await axios.put(`http://localhost:5000/api/notifications/notifications/${postId}`)
        if (responds.status === 200){
          console.log('notification read')
        } else{
          console.log('fail to read Notification')
        }
  }

  const handlePublish = async () => {
    try {
      setLoading(true)
      const pathnameArray = window.location.pathname.split('/');
      const postId = pathnameArray[pathnameArray.length - 1];

      const response = await axios.put(`http://localhost:5000/api/blogger/update-publish-blog/${postId}`);

      if (response.status === 200) {
        setLoading(false)
         router.push('/Admin/adminpage')
         Notification()
        console.log('Blog published successfully');
      } else {
        setLoading(false)
        console.error('Failed to publish blog');
      }
    } catch (error) {
      setLoading(false)
      console.error('Error:', error);
    }
  };


  const handleReEdit = () => {
    setLoader(true)
    router.push(`/Admin/adminEdit/${blogDetails._id}`);
  };
  if (loading) {
    return <p>Loading blog details...</p>;
  }

  
  const goBack = () => {
    router.back();
  };

  return (
    <RootLayout>
      <div className='single-post-container'>
    <div className='single-container'>
      <div className='top-single'>
      {blogDetails.images && ( <img
    src={`http://localhost:5000/uploads/${blogDetails.images}`}
    alt="Post Image"
    className='single-image-admin'
  />)}
      <h1>{blogDetails.title}</h1>
      </div>
     
      <div className='middle-single'>
         <h3> {blogDetails.author}</h3>
      <h2>{blogDetails.category}</h2>
      </div>
     
      <p dangerouslySetInnerHTML={{ __html: blogDetails.content }} style={{fontSize:14}}/>
      <div className="middle-single">
        <button onClick={handlePublish} className='submit-button' disabled={loading}>
        {loading ? (
    <TailSpin
    visible={true}
    height="20"
    width="20"
    color="#4fa94d"
    ariaLabel="tail-spin-loading"
    radius="1"
    wrapperStyle={{}}
    wrapperClass=""
    />
  ) : (
    ' Publish'
  )}
         
          </button>
            
          <button onClick={handleReEdit} className='save-draft' disabled={loader}>
          {loader ? (
    <TailSpin
    visible={true}
    height="20"
    width="20"
    color="#4fa94d"
    ariaLabel="tail-spin-loading"
    radius="1"
    wrapperStyle={{}}
    wrapperClass=""
    />
  ) : (
    'Edit'
  )}
          </button>
      </div>
    </div>
    </div>
    <div className="back-button" onClick={goBack}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </div>
    </RootLayout>
  );
}

export default BlogDetails