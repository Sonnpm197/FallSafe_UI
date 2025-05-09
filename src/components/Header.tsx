import React from 'react';
import '../styles/Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo-container">
        {/* <button className="menu-button">
          <div className="menu-icon"></div>
        </button> */}
        <div className="logo">
          <img src="/fallsafe-logo.png" alt="FallSafe Logo" className="logo-img" />
          {/* <span className="logo-text">FallSafe</span> */}
        </div>
      </div>
      
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search Monitor ID" 
          className="search-input"
        />
        <button className="search-button">
          <span className="search-icon">🔍</span>
        </button>
      </div>
      
      <div className="header-actions">
        <button className="action-button">
          <span className="tag-icon">🏷️</span>
        </button>
        <button className="action-button">
          <span className="video-icon">📹</span>
        </button>
        <button className="action-button">
          <span className="notification-icon">🔔</span>
        </button>
        <div className="user-avatar">
          <span role="img" aria-label="User">👤</span>
        </div>
      </div>
    </header>
  );
};

export default Header; 