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
    <div className="flex items-start space-x-4 mb-4">
      <img 
        src="/placeholder-avatar.jpg" 
        alt="User Avatar" 
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1">
        <textarea
          className="bg-transparent border border-gray-700 w-full p-2 rounded-lg"
          placeholder="What's happening?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="flex justify-between items-center mt-2">
          <div className="flex space-x-2">
            <button className="flex items-center text-blue-500 hover:text-blue-600">
              <img src="/media-icon.svg" alt="Media" className="mr-2 h-6 w-6" />
              Media
            </button>
            <button className="flex items-center text-blue-500 hover:text-blue-600">
              <img src="/gif-icon.svg" alt="GIF" className="mr-2 h-6 w-6" />
              GIF
            </button>
            <button className="flex items-center text-blue-500 hover:text-blue-600">
              <img src="/poll-icon.svg" alt="Poll" className="mr-2 h-6 w-6" />
              Poll
            </button>
          </div>
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full" 
            onClick={postTweet}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default TweetBox;
