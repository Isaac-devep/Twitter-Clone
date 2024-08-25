import React from 'react';
import { ChatIcon, RefreshIcon, HeartIcon, UploadIcon } from '@heroicons/react/outline';

const TweetCard = ({ tweet }) => {
  return (
    <div className="bg-black border-gray-700 p-4 rounded-lg mb-4 shadow-md">
      <div className="flex items-center space-x-2">
        <img src={tweet.author.profileImage || '/default-avatar.jpg'} alt={tweet.author.username} className="h-10 w-10 rounded-full" />
        <div>
          <h4 className="text-sm font-semibold text-gray-300">{tweet.author.username}</h4>
          <p className="text-xs text-gray-500">@{tweet.author.username}</p>
        </div>
      </div>
      <p className="mt-2 text-gray-300">{tweet.content}</p>
      <div className="flex justify-between mt-4 text-gray-500">
        <button className="flex items-center space-x-1">
          <ChatIcon className="h-4 w-4" />
          <span>10</span>
        </button>
        <button className="flex items-center space-x-1">
          <RefreshIcon className="h-4 w-4" />
          <span>5</span>
        </button>
        <button className="flex items-center space-x-1">
          <HeartIcon className="h-4 w-4" />
          <span>20</span>
        </button>
        <button className="flex items-center space-x-1">
          <UploadIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default TweetCard;
