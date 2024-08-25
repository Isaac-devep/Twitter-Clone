// src/components/TweetBox.js
import React, { useState } from 'react';
import tweetService from '../services/tweetService';

const TweetBox = ({ onTweetPosted }) => {
  const [content, setContent] = useState('');

  const postTweet = async () => {
    if (content) {
      await tweetService.createTweet(content);
      setContent('');
      onTweetPosted(); // Refresca el feed al publicar un nuevo tweet
    }
  };

  return (
    <div className="p-4 bg-gray-900 rounded-lg text-white mb-4">
      <textarea
        className="bg-gray-800 p-2 w-full rounded-lg"
        placeholder="What’s happening?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button className="bg-blue-500 hover:bg-blue-600 p-2 mt-2 rounded-full" onClick={postTweet}>
        Tweet
      </button>
    </div>
  );
};

export default TweetBox;
