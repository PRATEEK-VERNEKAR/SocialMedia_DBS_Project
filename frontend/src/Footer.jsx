import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoHomeSharp } from "react-icons/io5";
import { IoImages } from "react-icons/io5";
import { HiMiniUsers } from "react-icons/hi2";
import { MdOutlineExplore } from "react-icons/md";




const Footer = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div>
      <div className='flex justify-between w-full px-4 pb-2 mt-3'>
        <button className='text-2xl' onClick={() => navigateTo('/')}><IoHomeSharp /></button>
        <button className='text-2xl' onClick={() => navigateTo('/allPosts')}><IoImages/></button>
        <button className='text-2xl' onClick={() => navigateTo('/allUsers')}><MdOutlineExplore/></button>
        <button className='text-2xl' onClick={() => navigateTo('/profile')}><HiMiniUsers /></button>
      </div>
    </div>
  );
};

export default Footer;
