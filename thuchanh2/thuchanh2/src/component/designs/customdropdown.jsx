

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomDropdown.css';

export const CustomDropdown = ({ label, items = [] }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setOpen(prev => !prev);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (item) => {
    setOpen(false);
    navigate(`/${item.toLowerCase()}`); 
  };
 
  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <a className="dropdown-toggle" onClick={toggleDropdown}>
        {label}
      </a>
      {open && (
        <ul className="dropdown-menu">
          {items.map((item, i) => (
            <li key={i} onClick={() => handleItemClick(item)}>
              <span className="dropdown-item">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};