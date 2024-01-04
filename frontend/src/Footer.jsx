import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div>
      <div className='flex justify-between w-full px-4 pb-2'>
        <button onClick={() => navigateTo('/')}>Home</button>
        <button onClick={() => navigateTo('/allPosts')}>Posts</button>
        <button onClick={() => navigateTo('/allUsers')}>All</button>
      </div>
    </div>
  );
};

export default Footer;
