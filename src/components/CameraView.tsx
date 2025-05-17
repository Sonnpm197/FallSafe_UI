import React from 'react';
import '../styles/CameraView.css';
import VideoUpload from "./VideoUpload";
import VideoStreaming from "./VideoStreaming";

const CameraView: React.FC = () => {
  // Normally this would be fetched from an API
  const monitorData = {
    id: '355344422',
    location: 'Balcony - 2B Long Street',
    description: 'This camera is positioned to monitor fall activity on the balcony. It transmits real-time footage and transmits data for fall detection analysis. Note: This feed is linked to the AI-powered alert system for emergency response.'
  };

  return (
    <div className="camera-view-container">
      <div className="camera-view">
        <img
          src="/big1.jpeg"
          alt="Camera view of monitoring area"
          className="camera-feed"
        />
      </div>
      <div className="monitor-details">
        <div className="monitor-header">
          <h3>Monitor ID: {monitorData.id} <span className="success-tag">Link Successfully</span></h3>
        </div>
        <div className="monitor-info">
          <h4>Location:</h4>
          <p>{monitorData.location}</p>
        </div>
        <div className="monitor-info">
          <h4>Detail description:</h4>
          <p>{monitorData.description}</p>
        </div>


      </div>

      {/*<VideoUpload/>*/}
      {/*<VideoStreaming/>*/}
    </div>
  );
};

export default CameraView; 