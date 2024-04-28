'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import RootLayout from '@/app/layout';
import '../../create-blog.css';
import { TailSpin } from 'react-loader-spinner';
import { useRouter } from 'next/navigation';

function EditBlogPost() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [responseMessage, setResponseMessage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Technology', // Default category, you may adjust this based on your requirement
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageContainer, setImageContainer] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const pathnameArray = window.location.pathname.split('/');
        const postId = pathnameArray[pathnameArray.length - 1];
        if (postId) {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:5000/api/blogger/posts/${postId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const postData = response.data;
          setFormData({
            title: postData.title || '',
            content: postData.content || '',
            category: postData.category || '',
            image: postData.images || [],
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
      const pathnameArray = window.location.pathname.split('/');
        const postId = pathnameArray[pathnameArray.length - 1];
      const token = localStorage.getItem('token');
      setLoader(true);
      const data = new FormData();
      data.append('title', formData.title);
      data.append('content', formData.content);
      data.append('category', formData.category);
      if (formData.image) {
        data.append('image', formData.image);
      }
      const response = await axios.put(`http://localhost:5000/api/blogger/update/posts/${postId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setLoader(false);
        setResponseMessage('Blog post updated successfully');
        router.push('/dashboard');
      } else {
        setLoader(false);
        setError('Error updating blog post');
      }
    } catch (error) {
      setLoader(false);
      setError('Error updating blog post: ' + error.message);
    }
  };

  return (
    
      <div className="create-container">
        <div style={{width:'100%'}}>
          <div className="top-section">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="blog-input"
              required
            />
            <div className="cat-input">
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                required
                onChange={handleChange}
              >
                <option value="">------</option>
                <option value="Technology">Technology</option>
                <option value="Travel">Travel</option>
                <option value="Food">Food</option>
              </select>
            </div>
          </div>

          <div className="file-input">
            <label htmlFor="image">Feaured Image</label>
            <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
            <div className="image-container">
           
    {/* Display the fetched image if available and not overridden by a new image preview */}
    {!imagePreview && formData.image && (
      <img
        src={`http://localhost:5000/uploads/${formData.image}`}
        alt="Fetched Image"
        style={{ width: '100%', height: '100%', borderRadius: 10, objectFit: 'cover' }}
      />
    )}

    {/* Display the new image preview if available */}
    {imagePreview && (
      <img
        src={imagePreview}
        alt="New Image Preview"
        className="image-preview"
        style={{ width: '100%', height: '100%', borderRadius: 10, objectFit: 'cover' }}
      />
    )}

            </div>
          </div>

          <ReactQuill
            value={formData.content}
            onChange={(content) => setFormData((prevData) => ({ ...prevData, content }))}
            theme="snow"
            placeholder="Tell the story"
            modules={{
              toolbar: [
                [{ font: [] }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ color: [] }, { background: [] }],
                [{ script: 'sub' }, { script: 'super' }],
                ['blockquote', 'code-block'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
                ['link', 'image', 'video'],
                ['clean'],
              ],
            }}
          />
          <div className="button-box">
            <button onClick={handleUpdatePost} className="submit-button" disabled={loader}>
              {loader ? (
                <TailSpin visible={true} height="20" width="20" color="#4fa94d" ariaLabel="tail-spin-loading" radius="1" />
              ) : (
                'Update'
              )}
            </button>
          </div>
        </div>
        {error && <div className="mt-4 text-red-600">{error}</div>}
        {responseMessage && <div className="mt-4 text-green-600">{responseMessage}</div>}
      </div>
   
  );
}

export default EditBlogPost;
