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
    <div className="flex-1 overflow-auto p-4 max-w-xl mx-auto">
      <header className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Home</h1>
      </header>
      <div className="p-4">
        <TweetBox onTweetPosted={handleTweetPosted} />
        {tweets.length > 0 ? (
          tweets.map((tweet) => (
            <TweetCard key={tweet._id} tweet={tweet} />
          ))
        ) : (
          <p>No tweets available.</p>
        )}
      </div>
    </div>
  );
};

export default Feed;
