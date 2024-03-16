'use client'

import '../../create-blog.css'
 import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../../auth/authSlice';
import { useRouter } from 'next/navigation';
import RootLayout from '@/app/layout';
import { TailSpin } from 'react-loader-spinner';

function EditDraft() {
  const dispatch = useDispatch();
  const router = useRouter();
    const [loader, setLoader] = useState(false)
    const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    image: null,
  });

  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDraftSaved, setIsDraftSaved] = useState(false);

  useEffect(() => {
    const fetchDraftData = async () => {
      try {
        const pathnameArray = window.location.pathname.split('/');
         const draftId = pathnameArray[pathnameArray.length - 1];

        if (draftId) {
          const token = localStorage.getItem('token');

          // Make a GET request to fetch the existing draft data
          const response = await axios.get(`http://localhost:5000/api/blogger/drafts/${draftId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          const draftData = response.data;

          setFormData({
            title: draftData.title || '',
            content: draftData.content || '',
            category: draftData.category || '',
            // You may need to adjust this based on your data model
            image: draftData.images && draftData.images.length > 0 ? draftData.images[0] : null,
          });
        }
      } catch (error) {
        console.error('Error fetching draft data:', error);
        setError('Error fetching draft data');
      }
    };

    fetchDraftData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setIsDraftSaved(false);
  };

  const handleContentChange = (content) => {
    setFormData({
      ...formData,
      content,
    });
    setIsDraftSaved(false);
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];

    setFormData({
      ...formData,
      image: imageFile,
    });
    setIsDraftSaved(false);

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

  const UpdateDraft = async () => {
    try {
      setLoader(true)
      const token = localStorage.getItem('token');
      const pathnameArray = window.location.pathname.split('/');
      const draftId = pathnameArray[pathnameArray.length - 1];
      const data = new FormData();
      data.append('title', formData.title);
      data.append('content', formData.content);
      data.append('category', formData.category);
      if (formData.image) {
        data.append('images', formData.image);
      }

      // Determine whether it's a new post or editing a draft
      const url = `http://localhost:5000/api/blogger/updateDrafts/${draftId}`;

      // Make a POST request to save the draft
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setLoader(false)
        setIsDraftSaved(true);
        setResponseMessage('Draft saved successfully');
       
      } else {
        setLoader(false)
        setError('Error saving draft');
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
      setError('Error saving draft: ' + error.message);
      dispatch(logout);
    }
  };

  const handlePublishPost = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token');
      const data = new FormData();
      data.append('title', formData.title);
      data.append('content', formData.content);
      data.append('category', formData.category);
      if (formData.image) {
        data.append('images', formData.image);
      }
  
      // Determine whether it's a new post or editing a draft
      const url =  `http://localhost:5000/api/blogger/create` ;
  
      // Make a POST request to publish the post
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 201) {
        setLoading(false)
        setResponseMessage('Blog post published successfully');
        
        // Wait for the draft to be deleted before moving to the new page
        await deleteDraft();
  
        router.push('/');
      } else {
        setLoading(false)
        setError('Error publishing blog post');
        setLoader(false)
      }
    } catch (error) {
      setLoading(false)
      setError('Error publishing blog post: ' + error.message);
      dispatch(logout);
    }
  };
  



  const deleteDraft = async () => {
    try {
      const token = localStorage.getItem('token');
      const pathnameArray = window.location.pathname.split('/');
      const draftId = pathnameArray[pathnameArray.length - 1];
      const response = await axios.delete(`http://localhost:5000/api/blogger/delete-drafts/${draftId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        console.log('Draft deleted successfully');
      } else {
        console.error('Error deleting draft:', response.data);
        // Handle error deleting draft
      }
    } catch (error) {
      console.error('Error deleting draft:', error);
      // Handle error deleting draft
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
          <button className='save-draft' onClick={UpdateDraft} disabled={loader}>{loader ? (
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
    'Update Draft'
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

export default EditDraft;
