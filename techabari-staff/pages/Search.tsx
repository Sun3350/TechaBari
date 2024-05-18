import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './page.css';
import Link from 'next/link';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(true);
  const adminIsLoggedIn = localStorage.getItem('adminIsLoggedIn') === 'true';

  useEffect(() => {
    const handleSearch = async () => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        let url = adminIsLoggedIn ? 'http://localhost:5000/api/blogger/search-admin' : 'http://localhost:5000/api/blogger/search';
        const token = localStorage.getItem('token');
        const response = await axios.get(`${url}?query=${encodeURIComponent(query)}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error searching:', error);
      }
    };

    handleSearch();
  }, [query,  adminIsLoggedIn]);
  const handleResultClick = () => {
    setShowResults(false); // Hide the search results container
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for blogs..."
        className='search-bar'
      />
       {searchResults.length > 0 && query.trim() && showResults && (
        <div className='search-result'>
          {searchResults.map((blog, index) => (
            <Link href={`/blogger/myblogs/singlePage/${blog._id}`} onClick={handleResultClick}>
            <div key={blog._id} className='search-result-content'>
          {blog.title.split(' ').map((word, index) => (
                <span key={index} style={{ color: word.toLowerCase().includes(query.toLowerCase()) ? 'blue' : 'var(--text-color)' }}>
                  {word}{' '}
                </span>
              ))}
               {index !== searchResults.length - 1 && <hr className="line-divider" />}
            </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
