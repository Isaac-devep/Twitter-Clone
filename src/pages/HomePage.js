import React from 'react';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Widgets from '../components/Widgets';

const HomePage = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <Feed />
      <Widgets />
    </div>
  );
};

export default HomePage;
