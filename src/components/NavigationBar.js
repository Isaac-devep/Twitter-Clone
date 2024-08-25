// src/components/NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav className="bg-twitterBlue text-white p-4 fixed top-0 w-full z-10">
      <ul className="flex justify-around">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/explore">Explore</Link></li>
        <li><Link to="/notifications">Notifications</Link></li>
        <li><Link to="/messages">Messages</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
