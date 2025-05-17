import React, {useState} from 'react';
import '../styles/TabNavigation.css';
import CameraView from "./CameraView";
import MonitorGrid from "./MonitorGrid";
import VideoUpload from "./VideoUpload";
import VideoStreaming from "./VideoStreaming";
import Settings from "./Settings";

const TabNavigation: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('home');
    const [fallDetected, setFallDetected] = React.useState(false);

    const tabs = [
        {id: 'home', label: 'Home Page'},
        {id: 'live', label: 'Video Streaming'},
        {id: 'settings', label: 'Settings / Utility'}
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
                {activeTab === 'home' && (
                    <div className="dashboard-main">
                        <VideoUpload/>
                        <MonitorGrid personFallen={false}/>
                    </div>
                )}
                {activeTab === 'live' && (
                    <div className="dashboard-main">
                        <VideoStreaming
                            onFallConfirmed={() => setFallDetected(true)}
                            onFallEnded={() => setFallDetected(false)}
                        />
                        <MonitorGrid personFallen={fallDetected} />
                    </div>
                )}
                {activeTab === 'settings' && (
                    <div className="dashboard-main">
                        <Settings/>
                        <MonitorGrid personFallen={false}/>
                    </div>
                    )}
            </div>
        </div>
    );
};

export default TabNavigation;