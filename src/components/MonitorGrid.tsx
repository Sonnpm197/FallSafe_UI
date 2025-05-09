import React from 'react';
import '../styles/MonitorGrid.css';

interface Monitor {
  id: string;
  status: 'Linked' | 'Offline';
}

const MonitorGrid: React.FC = () => {
  // Mock data for monitor thumbnails
  const monitors: Monitor[] = Array(8).fill(null).map((_, index) => ({
    id: '435555',
    status: 'Linked'
  }));

  return (
    <div className="monitor-grid-container">
      <div className="monitor-grid">
        {monitors.map((monitor, index) => {
          let imgSrc = '';
          if ((index % 3) === 0) imgSrc = '/monitor1.png';
          else if ((index % 3) === 1) imgSrc = '/monitor2.png';
          else imgSrc = '/monitor3.jpg';
          return (
            <div key={index} className="monitor-thumbnail">
              <img 
                src={imgSrc} 
                alt={`Monitor ${monitor.id}`} 
                className="thumbnail-image"
              />
              <div className="thumbnail-info">
                <span className="monitor-id">Monitor ID: {monitor.id}</span>
                <div className="status">
                  <span className="status-label">Status: {monitor.status}</span>
                  <span className={`status-indicator ${monitor.status === 'Linked' ? 'active' : 'inactive'}`}></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pagination-controls">
        <button className="pagination-arrow prev">
          <span>&#8249;</span>
        </button>
        <button className="pagination-arrow next">
          <span>&#8250;</span>
        </button>
      </div>
    </div>
  );
};

export default MonitorGrid; 