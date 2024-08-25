import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

  const handleFollow = async (userId, isFollowing) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      if (isFollowing) {
        await axios.post(`http://localhost:5000/api/users/unfollow/${userId}`, {}, config);
      } else {
        await axios.post(`http://localhost:5000/api/users/follow/${userId}`, {}, config);
      }
      // Actualizar la lista de resultados después de seguir/dejar de seguir
      const updatedResults = results.map((result) =>
        result._id === userId ? { ...result, isFollowing: !isFollowing } : result
      );
      setResults(updatedResults);
    } catch (error) {
      console.error('Error following/unfollowing user:', error);
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
          className="p-2 w-full rounded text-black" 
        />
        <button type="submit" className="bg-blue-500 text-white p-2 mt-2 rounded">Search</button>
      </form>
      <div className="mt-4">
        {results.map((user) => (
          <div key={user._id} className="p-2 border-b">
            <img src={user.profileImage} alt={user.username} className="w-10 h-10 rounded-full inline-block mr-2"/>
            <span><Link to={`/profile/${user._id}`}>{user.username}</Link></span>
            <p>{user.bio}</p>
            <button
              className={`mt-2 p-2 rounded ${user.isFollowing ? 'bg-red-500' : 'bg-blue-500'} text-white`}
              onClick={() => handleFollow(user._id, user.isFollowing)}
            >
              {user.isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSearch;
