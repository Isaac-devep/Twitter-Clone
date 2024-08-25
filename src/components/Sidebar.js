// src/components/Sidebar.js
import React from 'react';
import { HomeIcon, HashtagIcon, BellIcon, MailIcon, BookmarkIcon, UserIcon, XIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 p-4 border-r border-gray-700 h-screen bg-black text-white">
      <XIcon className="w-8 h-8 mb-4" />
      <nav className="space-y-4">
        <Link to="/" className="flex items-center space-x-2 p-4 hover:bg-gray-800 rounded-full">
          <HomeIcon className="h-6 w-6" />
          <span>Home</span>
        </Link>
        <Link to="/explore" className="flex items-center space-x-2 p-4 hover:bg-gray-800 rounded-full">
          <HashtagIcon className="h-6 w-6" />
          <span>Explore</span>
        </Link>
        <Link to="/notifications" className="flex items-center space-x-2 p-4 hover:bg-gray-800 rounded-full">
          <BellIcon className="h-6 w-6" />
          <span>Notifications</span>
        </Link>
        <Link to="/messages" className="flex items-center space-x-2 p-4 hover:bg-gray-800 rounded-full">
          <MailIcon className="h-6 w-6" />
          <span>Messages</span>
        </Link>
        <Link to="/bookmarks" className="flex items-center space-x-2 p-4 hover:bg-gray-800 rounded-full">
          <BookmarkIcon className="h-6 w-6" />
          <span>Bookmarks</span>
        </Link>
        <Link to="/profile" className="flex items-center space-x-2 p-4 hover:bg-gray-800 rounded-full">
          <UserIcon className="h-6 w-6" />
          <span>Profile</span>
        </Link>
      </nav>
      <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full">
        Post
      </button>
    </div>
  );
};

export default Sidebar;
