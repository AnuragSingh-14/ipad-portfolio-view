
import React from 'react';
import { AppIcon } from './AppIcon';

interface HomeScreenProps {
  openApp: (app: 'projects' | 'about' | 'skills' | 'contact') => void;
  onLock: () => void;
  isLandscape: boolean;
  batteryLevel: number;
  currentTime: Date;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ 
  openApp, 
  onLock, 
  isLandscape,
  batteryLevel,
  currentTime
}) => {
  const formattedTime = currentTime.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  const apps = [
    { id: 'projects', name: 'Projects', color: 'from-blue-500 to-blue-600', icon: '📱' },
    { id: 'about', name: 'About Me', color: 'from-purple-500 to-purple-600', icon: '👨‍💻' },
    { id: 'skills', name: 'Skills', color: 'from-green-500 to-green-600', icon: '🛠️' },
    { id: 'contact', name: 'Contact', color: 'from-yellow-500 to-yellow-600', icon: '📧' },
  ];

  return (
    <div 
      className="w-full h-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: 'url(https://source.unsplash.com/random/1200x900/?minimal,abstract)' }}
    >
      {/* Status Bar */}
      <div className="flex justify-between items-center p-3 text-white bg-black/20 backdrop-blur-sm">
        <div>{formattedTime}</div>
        <div className="flex items-center space-x-2">
          <div className="text-xs">
            {batteryLevel}%
          </div>
          <div className="w-6 h-3 border border-white rounded-sm relative">
            <div 
              className="absolute inset-0 bg-white mr-1" 
              style={{ width: `${batteryLevel}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* App Grid */}
      <div className={`grid ${isLandscape ? 'grid-cols-8' : 'grid-cols-4'} gap-6 p-8`}>
        {apps.map((app) => (
          <AppIcon
            key={app.id}
            name={app.name}
            color={app.color}
            icon={app.icon}
            onClick={() => openApp(app.id as any)}
          />
        ))}
      </div>

      {/* Dock */}
      <div className="absolute bottom-0 inset-x-0 p-4">
        <div className="flex justify-center space-x-4 bg-white/20 backdrop-blur-md p-4 rounded-3xl">
          <div 
            className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center text-white cursor-pointer"
            onClick={onLock}
          >
            🔒
          </div>
        </div>
      </div>
    </div>
  );
};
