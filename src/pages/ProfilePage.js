import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import TweetCard from '../components/TweetCard';

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]); // Asegurándonos de que esto sea un array vacío al inicio
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false); // Asegurándonos de que isFollowing sea un booleano al inicio

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const config = {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        };
        // Obtener detalles del usuario
        const response = await axios.get(`http://localhost:5000/api/users/${id}`, config);
        setUser(response.data);

        // Obtener los tweets del usuario
        const tweetsResponse = await axios.get(`http://localhost:5000/api/tweets/user/${id}`, config);
        setUser(response.data.user);
        setIsFollowing(response.data.isFollowing);
        setTweets(tweetsResponse.data || []); // Aseguramos que tweets sea un array
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleFollow = async () => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    try {
      if (isFollowing) {
        await axios.post(`http://localhost:5000/api/users/unfollow/${id}`, {}, config);
        setUser((prevUser) => ({
          ...prevUser,
          followers: prevUser.followers.filter(follower => follower._id !== currentUser._id),
        }));
      } else {
        await axios.post(`http://localhost:5000/api/users/follow/${id}`, {}, config);
        setUser((prevUser) => ({
          ...prevUser,
          followers: [...prevUser.followers, currentUser],
        }));
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Error following/unfollowing user:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="p-4">
      <button 
        onClick={() => navigate(-1)} // Navega a la página anterior
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Back
      </button>
      <div className="flex items-center mb-4">
        <img 
          src={user.profileImage || 'default_profile_image_url_here'} 
          alt={user.username} 
          className="w-16 h-16 rounded-full"
        />
        <div className="ml-4">
          <h1 className="text-2xl font-bold">{user.username}</h1>
          <p>{user.bio}</p>
          <button
            className={`mt-2 p-2 rounded ${isFollowing ? 'bg-red-500' : 'bg-blue-500'} text-white`}
            onClick={handleFollow}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        </div>
      </div>
      <div className="flex space-x-4">
        <div>
          <strong>{user.followers ? user.followers.length : 0}</strong> Followers
        </div>
        <div>
          <strong>{user.following ? user.following.length : 0}</strong> Following
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Tweets</h2>
        {tweets.length > 0 ? (
          tweets.map((tweet) => <TweetCard key={tweet._id} tweet={tweet} />)
        ) : (
          <p>No tweets yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
