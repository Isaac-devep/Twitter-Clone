import React from 'react';
import { HomeIcon, HashtagIcon, BellIcon, MailIcon, BookmarkIcon, UserIcon, DotsHorizontalIcon } from '@heroicons/react/outline';

const Sidebar = () => {
  return (
    <div className="w-64 p-4 border-r border-gray-700 h-screen bg-gray-900 text-white">
      <nav className="space-y-4">
        <div className="flex items-center space-x-2 p-4 hover:bg-gray-800 rounded-full">
          <HomeIcon className="mr-2 h-6 w-6" />
          <span>Home</span>
        </div>
        <div className="flex items-center space-x-2 p-4 hover:bg-gray-800 rounded-full">
          <HashtagIcon className="mr-2 h-6 w-6" />
          <span>Explore</span>
        </div>
        <div className="flex items-center space-x-2 p-4 hover:bg-gray-800 rounded-full">
          <BellIcon className="mr-2 h-6 w-6" />
          <span>Notifications</span>
        </div>
        <div className="flex items-center space-x-2 p-4 hover:bg-gray-800 rounded-full">
          <MailIcon className="mr-2 h-6 w-6" />
          <span>Messages</span>
        </div>
        <div className="flex items-center space-x-2 p-4 hover:bg-gray-800 rounded-full">
          <BookmarkIcon className="mr-2 h-6 w-6" />
          <span>Bookmarks</span>
        </div>
        <div className="flex items-center space-x-2 p-4 hover:bg-gray-800 rounded-full">
          <UserIcon className="mr-2 h-6 w-6" />
          <span>Profile</span>
        </div>
      </nav>
      <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 p-4 rounded-full text-white">
        Post
      </button>
    </div>
  );
};

export default Sidebar;
