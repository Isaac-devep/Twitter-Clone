import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faRetweet, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';

const TweetCard = ({ tweet }) => {
  return (
    <div className="bg-black text-white rounded-lg p-4 mb-4 shadow-md">
      <div className="flex items-start mb-2">
        <img 
          src={tweet.author.profileImage || 'default_profile_image_url_here'} 
          alt={tweet.author.username} 
          className="rounded-full w-12 h-12 mr-3"
        />
        <div className="flex-grow">
          <div className="flex items-center">
            <span className="font-bold mr-1">{tweet.author.username}</span>
            {tweet.author.verified && <span className="text-blue-500"><i className="fas fa-check-circle"></i></span>}
            <span className="text-gray-400 ml-1">@{tweet.author.username} · {new Date(tweet.createdAt).toLocaleDateString()}</span>
          </div>
          <p className="text-sm">{tweet.content}</p>
          {tweet.image && (
            <img src={tweet.image} alt="Tweet content" className="mt-2 rounded-lg"/>
          )}
          <div className="flex justify-between text-gray-500 mt-2">
            <button className="hover:text-blue-500 flex items-center">
              <FontAwesomeIcon icon={faComment} className="mr-2"/>
              {tweet.comments || 0}
            </button>
            <button className="hover:text-green-500 flex items-center">
              <FontAwesomeIcon icon={faRetweet} className="mr-2"/>
              {tweet.retweets || 0}
            </button>
            <button className="hover:text-red-500 flex items-center">
              <FontAwesomeIcon icon={faHeart} className="mr-2"/>
              {tweet.likes || 0}
            </button>
            <button className="hover:text-blue-500 flex items-center">
              <FontAwesomeIcon icon={faShare} className="mr-2"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
