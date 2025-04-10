
import React, { useState, useEffect } from 'react';
import { LockScreen } from './LockScreen';
import { HomeScreen } from './HomeScreen';
import { ProjectsApp } from './apps/ProjectsApp';
import { AboutApp } from './apps/AboutApp';
import { SkillsApp } from './apps/SkillsApp';
import { ContactApp } from './apps/ContactApp';

type App = 'projects' | 'about' | 'skills' | 'contact' | null;

interface IPadScreenProps {
  isLandscape: boolean;
  brightness: number;
  setBrightness: (value: number) => void;
}

export const IPadScreen: React.FC<IPadScreenProps> = ({ isLandscape, brightness, setBrightness }) => {
  const [isLocked, setIsLocked] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [openApp, setOpenApp] = useState<App>(null);
  const [batteryLevel, setBatteryLevel] = useState(90);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState('right');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleUnlock = () => {
    setIsLocked(false);
  };

  const handleLock = () => {
    setOpenApp(null);
    setIsLocked(true);
  };

  const openAppWithAnimation = (app: App) => {
    if (openApp === app) return;
    
    setSlideDirection('right');
    setIsTransitioning(true);
    
    setTimeout(() => {
      setOpenApp(app);
      setIsTransitioning(false);
    }, 300);
  };

  const closeApp = () => {
    setSlideDirection('left');
    setIsTransitioning(true);
    
    setTimeout(() => {
      setOpenApp(null);
      setIsTransitioning(false);
    }, 300);
  };

  const renderAppContent = () => {
    if (isTransitioning) {
      return <div className={`absolute inset-0 bg-black ${slideDirection === 'left' ? 'slide-out-left' : 'slide-in-right'}`}></div>;
    }

    switch (openApp) {
      case 'projects':
        return <ProjectsApp onClose={closeApp} />;
      case 'about':
        return <AboutApp onClose={closeApp} />;
      case 'skills':
        return <SkillsApp onClose={closeApp} />;
      case 'contact':
        return <ContactApp onClose={closeApp} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {isLocked ? (
        <LockScreen 
          currentTime={currentTime} 
          onUnlock={handleUnlock} 
          isLandscape={isLandscape}
          batteryLevel={batteryLevel}
          brightness={brightness}
          setBrightness={setBrightness}
        />
      ) : openApp ? (
        renderAppContent()
      ) : (
        <HomeScreen 
          openApp={openAppWithAnimation} 
          onLock={handleLock} 
          isLandscape={isLandscape}
          batteryLevel={batteryLevel}
          currentTime={currentTime}
        />
      )}
    </div>
  );
};
