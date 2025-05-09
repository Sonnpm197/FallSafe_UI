import React, { useState } from 'react';
import '../styles/TabNavigation.css';

const TabNavigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('fallDetection');

  const tabs = [
    { id: 'camera', label: 'Camera Control' },
    { id: 'fallDetection', label: 'Fall Detection Control' },
    { id: 'settings', label: 'Settings / Utility' }
  ];

  return (
    <div className="tab-navigation">
      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {activeTab === 'camera' && (
          <div className="control-buttons">
            <button className="control-button">Start Camera</button>
            <button className="control-button">Stop Camera</button>
            <button className="control-button">Snapshot</button>
            <button className="control-button">Switch</button>
          </div>
        )}
        {activeTab === 'fallDetection' && (
          <div className="control-buttons">
            <button className="control-button">Enable Detection</button>
            <button className="control-button">Disable Detection</button>
            <button className="control-button">Manual Alarm</button>
            <button className="control-button">Test Alarm</button>
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="control-buttons">
            <button className="control-button">Auto Alarm: ON</button>
            <button className="control-button">Sensitivity Settings</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabNavigation; 