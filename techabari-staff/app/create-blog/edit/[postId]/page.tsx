'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import RootLayout from '@/app/layout';
import '../../../dashboard/create-blog.css'
import { TailSpin } from 'react-loader-spinner';
function EditBlogPost() {
 const[loader, setLoader] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Technology', // Default category, you may adjust this based on your requirement
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const pathnameArray = window.location.pathname.split('/');
        const postId = pathnameArray[pathnameArray.length - 1];
  
        if (postId) {
          const token = localStorage.getItem('token');
  
          // Make a GET request to fetch the existing post data
          const response = await axios.get(`http://localhost:5000/api/blogger/posts/${postId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          const postData = response.data;
  
          setFormData({
            title: postData.title || '',
            content: postData.content || '',
            category: postData.category || '',
            // You may need to adjust this based on your data model
            image: postData.images && postData.images.length > 0 ? postData.images[0] : null,
          });
        }
      } catch (error) {
        console.error('Error fetching post data:', error);
        setError('Error fetching post data');
      }
    };
  
    fetchPostData();
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];

    setFormData((prevData) => ({
      ...prevData,
      image: imageFile,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    if (imageFile) {
      reader.readAsDataURL(imageFile);
    } else {
      setImagePreview(null);
    }
  };

  const handleUpdatePost = async () => {
    try {
      const token = localStorage.getItem('token');
   setLoader(true)
      const data = new FormData();
      data.append('title', formData.title);
      data.append('content', formData.content);
      data.append('category', formData.category);
      if (formData.image) {
        data.append('image', formData.image);
      }

      await axios.put(`http://localhost:5000/api/blogger/posts/${postId}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
     setLoader(fasle)
      console.log('Post updated successfully!');
      // Optionally, you can redirect the user to the updated post or another page
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <RootLayout>
    <div className='create-container'>
      <div>
        <div className='top-section'>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className='blog-input'
            required
          />
          <div className='cat-input'>
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              required
              onChange={handleChange}
            >
              <option value="Technology">Technology</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
            </select>
          </div>
        </div>
      
        <div className='file-input'>
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && <img src={imagePreview} alt="Image Preview" className="image-preview" />}
        </div>
        <ReactQuill
          value={formData.content}
          onChange={(content) => setFormData((prevData) => ({ ...prevData, content }))}
          theme="snow"
          placeholder='Tell the story'
        />
 <div className='button-box'>
        <button onClick={handleUpdatePost} className='submit-button' disabled={loader}>{loader ? (
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
    'Login'
  )}</button>
        </div>
      </div>
    </div>
    </RootLayout>
  );
}

export default EditBlogPost;
