'use client'
/**import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';

const CreateBlogPost = () => {
  const params = useParams();
  const router = useRouter();
  const draftId = params.draftId;
 
  useEffect(() => {
    const fetchDraftData = async () => {
      if (draftId) {
        try {
          const response = await axios.get(`http://localhost:5000/api/blogger/drafts/${draftId}`);
          console.log('Draft Data:', response.data);
          setDraftData(response.data);
        } catch (error) {
          console.error('Error fetching draft data:', error);
        }
      }
    };

    fetchDraftData();
  }, [draftId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDraftData({
      ...draftData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!title || !content || !image || !category) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      let response;
      if (draftId) {
        // Update the blog post
        response = await axios.put(`http://localhost:5000/api/blogger/update/${draftId}`, draftData);
      } else {
        // Create a new blog post
        response = await axios.post('http://localhost:5000/api/blogger/create', draftData);
      }

      console.log('Blog post created/updated successfully:', response.data);

      // Redirect to the updated post or another page
      const queryParams = queryString.parse(location.search);
      const redirectUrl = `/blog/${response.data.slug}`;
      if (queryParams.redirect) {
        router.push(queryParams.redirect);
      } else {
        router.push(redirectUrl);
      }
    } catch (error) {
      console.error('Error creating/updating blog post:', error);
      alert('An error occurred while creating/updating the blog post.');
    }
  };

  return (
    <div>
      <h1>Create Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={title} onChange={handleChange} />
        </div>
        
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default CreateBlogPost;**/


import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

const DraftDetails = () => {
  const [draft, setDraft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDraftData = async () => {
      try {
        // Extract draftId from the URL using window.location
        const pathnameArray = window.location.pathname.split('/');
        const draftId = pathnameArray[pathnameArray.length - 1];

        // Retrieve the token from local storage
        const accessToken = localStorage.getItem('token');

        if (!accessToken) {
          throw new Error('Access token not found in local storage');
        }

        // Use the obtained token to make the actual request for draft data
        const response = await axios.get(`http://localhost:5000/api/blogger/drafts/${draftId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        setDraft(response.data);
      } catch (error) {
        console.error('Error fetching draft data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDraftData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDraft((prevDraft) => ({
      ...prevDraft,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add logic to send the draft data to the backend for saving
      // Example: await axios.put(`http://localhost:5000/api/blogger/drafts/${draftId}`, draft);

      console.log('Draft successfully updated:', draft);
    } catch (error) {
      console.error('Error updating draft:', error);
      // Handle error state if needed
    }
  };

  // Render loading state or the actual draft details
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Edit Draft</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={draft.title} onChange={handleInputChange} />
        </div>
        <div>
          <label>Content:</label>
          <textarea name="content" value={draft.content} onChange={handleInputChange} />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" name="category" value={draft.category} onChange={handleInputChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
      {/* Render other draft details as needed */}
    </div>
  );
};

export default DraftDetails;
