import React from 'react';
import UserSearch from './UserSearch';

const Widgets = () => {
  return (
    <div className="w-80 p-4 bg-gray-900 text-white space-y-4">
      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <h2 className="font-bold text-lg">Search Users</h2>
        <UserSearch />
      </div>

      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <h2 className="font-bold text-lg">What's happening</h2>
        {/* Contenido del widget de tendencias */}
      </div>

      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="font-bold text-lg">Who to follow</h2>
        {/* Contenido del widget de sugerencias de seguimiento */}
      </div>
    </div>
  );
};

export default Widgets;
