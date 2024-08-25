// src/pages/ProfilePage.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const config = {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        };
        const response = await axios.get(`http://localhost:5000/api/users/${id}`, config);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <img 
          src={user.profileImage || 'default_profile_image_url_here'} 
          alt={user.username} 
          className="w-16 h-16 rounded-full"
        />
        <div className="ml-4">
          <h1 className="text-2xl font-bold">{user.username}</h1>
          <p>{user.bio}</p>
        </div>
      </div>
      <div className="flex space-x-4">
        <div>
          <strong>{user.followers.length}</strong> Followers
        </div>
        <div>
          <strong>{user.following.length}</strong> Following
        </div>
      </div>
      {/* Aquí podrías agregar más detalles del usuario o sus tweets */}
    </div>
  );
};

export default ProfilePage;
