// src/components/Sidebar.js
import React from 'react';
import { HomeIcon, HashtagIcon, BellIcon, MailIcon } from '@heroicons/react/outline';

const Sidebar = () => {
  return (
    <div className="bg-gray-900 h-screen p-4 text-white flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-2 p-4 hover:bg-gray-800 rounded-full">
          <HomeIcon className="h-6 w-6" />
          <span>Home</span>
        </div>
        <div className="flex items-center space-x-2 p-4 hover:bg-gray-800 rounded-full">
          <HashtagIcon className="h-6 w-6" />
          <span>Explore</span>
        </div>
        <div className="flex items-center space-x-2 p-4 hover:bg-gray-800 rounded-full">
          <BellIcon className="h-6 w-6" />
          <span>Notifications</span>
        </div>
        <div className="flex items-center space-x-2 p-4 hover:bg-gray-800 rounded-full">
          <MailIcon className="h-6 w-6" />
          <span>Messages</span>
        </div>
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 p-4 rounded-full w-full text-center">Post</button>
    </div>
  );
};

export default Sidebar;
