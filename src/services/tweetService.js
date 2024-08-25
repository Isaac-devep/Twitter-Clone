import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tweets';

const getTweets = async () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || !user.token) {
    throw new Error('User not authenticated');
  }

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const response = await axios.get(`${API_URL}/feed`, config);
  return response.data;
};

const createTweet = async (content) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const response = await axios.post(API_URL, { content }, config);
  return response.data;
};

const getUserTweets = async (userId) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || !user.token) {
    throw new Error('User not authenticated');
  }

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const response = await axios.get(`${API_URL}user/${userId}`, config);
  return response.data;
};

export default {
  getTweets,
  createTweet,
  getUserTweets,
};
