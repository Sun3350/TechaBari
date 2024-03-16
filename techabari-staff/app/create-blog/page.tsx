'use client'
import React, { useState, useEffect } from 'react';
import RootLayout from '../layout';
import './create-blog.css';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { logout } from '../auth/authSlice';
import { useRouter } from 'next/navigation';
import { TailSpin } from 'react-loader-spinner';

// Define your component
const CreateBlog = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '-----',
    image: null,
  });

  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
const [isDraftSaved, setIsDraftSaved] = useState(null)
  // Define your handleChange function
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Define your handleImageChange function
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    setFormData({
      ...formData,
      image: selectedImage,
    });

    // Display image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedImage);
  };

  // Define your handleContentChange function
  const handleContentChange = (value) => {
    setFormData({
      ...formData,
      content: value,
    });
  };

  // Define your handleSaveDraft function
  

  const handlePublishPost = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const data = new FormData();

          // Check if required fields are filled
    if (!formData.title || !formData.content || !formData.category) {
      setLoading(false);
      setError('Please fill in all required fields.');
      return; // Stop execution if required fields are not filled
    }


      data.append('title', formData.title);
      data.append('content', formData.content);
      data.append('category', formData.category);
      if (formData.image) {
        data.append('image', formData.image);
      }

      const url = 'http://localhost:5000/api/blogger/create';

      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
          
        },
      });

      if (response.status === 201) {
        setLoading(false);
        setResponseMessage('Blog post published successfully');
       router.push('/dashboard'); // Redirect to the login page
      } else {
        setLoading(false);
        setError('Error publishing blog post');
        setLoader(false);
      }
    } catch (error) {
      setLoading(false);
      setError('Error publishing blog post: ' + error.message);
      dispatch(logout());
    
    }
  };
  const handleSaveDraft = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const data = new FormData();

          // Check if required fields are filled
    if (!formData.title || !formData.content || !formData.category) {
      setLoading(false);
      setError('Please fill in all required fields.');
      return; // Stop execution if required fields are not filled
    }

      data.append('title', formData.title);
      data.append('content', formData.content);
      data.append('category', formData.category);
      if (formData.image) {
        data.append('image', formData.image);
      }

      const url = 'http://localhost:5000/api/blogger/create-draft';

      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setLoading(false);
        router.push('/')
        setResponseMessage('Saved to  successfully');
      } else {
        setLoading(false);
        setError('Error saving to draft');
        setLoader(false);
      }
    } catch (error) {
      setLoading(false);
      setError('Error saving to draft: ' + error.message);
      dispatch(logout());
      router.push('/login'); // Redirect to the login page
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!isDraftSaved) {
        const message = 'You have unsaved changes. Are you sure you want to leave?';
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDraftSaved]);
return (
    <RootLayout>
    <div className='create-container'>
      <div style={{width:'100%'}}>
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
              <option value="">----</option>
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
        <ReactQuill value={formData.content} onChange={handleContentChange} theme="snow" 
         placeholder='Tell the story'
         modules={{
          toolbar:[
            [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script:  "sub" }, { script:  "super" }],
        ["blockquote", "code-block"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"],
          ]
         }}
        />

        <div className='button-box'>

          <button onClick={handlePublishPost} className='submit-button' disabled={loading}>
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
    'Submit'
  )}</button>
          <button className='save-draft' onClick={handleSaveDraft} disabled={loader}>{loader ? (
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
    'Save to Draft'
  )}</button>
        </div>
      </div>
      {error && <div className="mt-4 text-red-600">{error}</div>}
      {responseMessage && (
        <div className="mt-4 text-green-600">{responseMessage}</div>
      )}
    </div>
    </RootLayout>
  );
}
export default CreateBlog