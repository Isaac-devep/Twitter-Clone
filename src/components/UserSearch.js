// src/components/UserSearch.js

import React, { useState } from 'react';
import axios from 'axios';

const UserSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const response = await axios.get(`http://localhost:5000/api/users/search?q=${query}`, config);
      setResults(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search users"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 w-full rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 mt-2 rounded">Search</button>
      </form>
      <div className="mt-4">
        {results.map((user) => (
          <div key={user._id} className="p-2 border-b">
            <img src={user.profileImage} alt={user.username} className="w-10 h-10 rounded-full inline-block mr-2"/>
            <span>{user.username}</span>
            <p>{user.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSearch;
