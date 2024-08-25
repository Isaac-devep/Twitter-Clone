// src/components/Feed.js

import React, { useEffect, useState } from 'react';
import TweetBox from './TweetBox';
import tweetService from '../services/tweetService';
import TweetCard from './TweetCard';

const Feed = () => {
  const [tweets, setTweets] = useState([]);

  const fetchTweets = async () => {
    try {
      const data = await tweetService.getTweets();
      console.log('Tweets fetched:', data);
      setTweets(data);
    } catch (error) {
      console.error('Error fetching tweets:', error);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  const handleTweetPosted = () => {
    fetchTweets();
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <TweetBox onTweetPosted={handleTweetPosted} />
      {tweets.map((tweet) => (
        <TweetCard key={tweet._id} tweet={tweet} />
      ))}
    </div>
  );
};

export default Feed;
