import React from 'react';
import Header from '../components/Header';
import TabNavigation from '../components/TabNavigation';
import CameraView from '../components/CameraView';
import MonitorGrid from '../components/MonitorGrid';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <Header />
      <main className="dashboard-content">
        <TabNavigation />
        <div className="dashboard-main">
          <CameraView />
          <MonitorGrid />
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 