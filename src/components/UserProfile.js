// src/components/UserProfile.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
  const { id } = useParams(); // Obtén el id del usuario desde la URL
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${id}`, config);
        setUser(response.data.user);
        setIsFollowing(response.data.isFollowing);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [id]);

  const handleFollow = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      if (isFollowing) {
        await axios.post(`http://localhost:5000/api/users/unfollow/${id}`, {}, config);
      } else {
        await axios.post(`http://localhost:5000/api/users/follow/${id}`, {}, config);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Error following/unfollowing user:', error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="flex items-center">
        <img src={user.profileImage} alt={user.username} className="w-20 h-20 rounded-full" />
        <div className="ml-4">
          <h2 className="text-xl font-bold">{user.username}</h2>
          <p>{user.bio}</p>
          <button
            className={`mt-2 p-2 rounded ${isFollowing ? 'bg-red-500' : 'bg-blue-500'} text-white`}
            onClick={handleFollow}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-bold">Tweets</h3>
        {/* Muestra los tweets del usuario aquí */}
      </div>
    </div>
  );
};

export default UserProfile;
