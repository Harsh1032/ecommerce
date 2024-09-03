import React, { useState, useEffect, useRef } from 'react';
import { CiMenuBurger } from 'react-icons/ci';
import CreateMainCourse from './CreateMainCourse';
import CreateSnacks from './CreateSnacks';
import CreateDrinks from './CreateDrinks';
import CreateServices from './CreateServices';
import OrderNotifications from './OrderNotifications';

const AdminHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Order Notifications');
  const sidebarRef = useRef();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
    if (window.innerWidth < 768) { // Close sidebar on small screens
      setIsOpen(false);
    }
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex md:flex-row h-screen overflow-hidden xs:flex-col">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative z-50`}
      >
        <div className="p-4 font-bold text-lg">
          {/* Sidebar Header */}
          <span>Dashboard</span>
        </div>
        <nav className="flex flex-col space-y-2">
          <a
            href="#"
            className={`p-4 hover:bg-gray-700 ${activeItem === 'Order Notifications' ? 'bg-gray-700' : ''}`}
            onClick={() => handleItemClick('Order Notifications')}
          >
            Order Notifications
          </a>
          <a
            href="#"
            className={`p-4 hover:bg-gray-700 ${activeItem === 'Snacks' ? 'bg-gray-700' : ''}`}
            onClick={() => handleItemClick('Snacks')}
          >
            Snacks
          </a>
          <a
            href="#"
            className={`p-4 hover:bg-gray-700 ${activeItem === 'Main Course' ? 'bg-gray-700' : ''}`}
            onClick={() => handleItemClick('Main Course')}
          >
            Main Course
          </a>
          <a
            href="#"
            className={`p-4 hover:bg-gray-700 ${activeItem === 'Drinks' ? 'bg-gray-700' : ''}`}
            onClick={() => handleItemClick('Drinks')}
          >
            Drinks
          </a>
          <a
            href="#"
            className={`p-4 hover:bg-gray-700 ${activeItem === 'Services' ? 'bg-gray-700' : ''}`}
            onClick={() => handleItemClick('Services')}
          >
            Services
          </a>
        </nav>
      </div>

      {/* Hamburger Menu for Smaller Screens */}
      <div className="md:hidden p-4">
        <button onClick={toggleSidebar}>
          <CiMenuBurger size={32} />
        </button>
      </div>

      <div className={`flex-1 md:p-8 bg-gray-100 transition-all duration-300 ease-in-out ${isOpen ? '' : 'w-full'}`}>
        {activeItem === 'Order Notifications' && <><OrderNotifications/></>}
        {activeItem === 'Snacks' && <><CreateSnacks/></>}
        {activeItem === 'Main Course' && <><CreateMainCourse /></>}
        {activeItem === 'Drinks' && <><CreateDrinks/></>}
        {activeItem === 'Services' && <><CreateServices/></>}
      </div>
    </div>
  );
};

export default AdminHome;
