// src/components/Widgets.js
import React from 'react';
import UserSearch from './UserSearch';

const Widgets = () => {
  return (
    <div className="p-4 bg-gray-900 text-white space-y-4">
      {/* Barra de búsqueda de usuarios */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="font-bold text-lg">Search Users</h2>
        <UserSearch />
      </div>

      {/* Tendencias */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="font-bold text-lg">What’s happening</h2>
        {/* Añade tendencias aquí */}
      </div>

      {/* Sugerencias de seguimiento */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="font-bold text-lg">Who to follow</h2>
        {/* Añade sugerencias de seguidores aquí */}
      </div>
    </div>
  );
};

export default Widgets;
