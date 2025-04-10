
import React, { useState } from 'react';
import { ChevronUp } from 'lucide-react';

interface LockScreenProps {
  currentTime: Date;
  onUnlock: () => void;
  isLandscape: boolean;
  batteryLevel: number;
  brightness: number;
  setBrightness: (value: number) => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ 
  currentTime, 
  onUnlock, 
  isLandscape,
  batteryLevel,
  brightness,
  setBrightness 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragCurrentY, setDragCurrentY] = useState(0);
  const [showControlCenter, setShowControlCenter] = useState(false);

  const formattedTime = currentTime.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
  
  const formattedDate = currentTime.toLocaleDateString([], {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const handleDragStart = (clientY: number) => {
    setIsDragging(true);
    setDragStartY(clientY);
    setDragCurrentY(clientY);
  };

  const handleDragMove = (clientY: number) => {
    if (isDragging) {
      setDragCurrentY(clientY);
      
      // For control center
      if (dragStartY > clientY && dragStartY - clientY > 50) {
        setShowControlCenter(true);
      }
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    
    // If drag up passed threshold, unlock
    if (dragStartY - dragCurrentY > 150) {
      onUnlock();
    }
    
    // Reset
    setDragStartY(0);
    setDragCurrentY(0);
  };

  const dragDistance = isDragging ? Math.max(0, dragStartY - dragCurrentY) : 0;
  const unlockOpacity = Math.min(dragDistance / 150, 1);

  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientY);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientY);
  };

  return (
    <div 
      className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 flex flex-col justify-between"
      onMouseDown={handleMouseDown}
      onMouseMove={isDragging ? handleMouseMove : undefined}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleDragEnd}
    >
      {/* Status Bar */}
      <div className="flex justify-between items-center p-3 text-white">
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

      {/* Time & Date */}
      <div className={`flex flex-col items-center justify-center text-white p-8 ${isLandscape ? 'pb-16' : 'pb-32'}`}>
        <div className="text-6xl font-thin mb-2">{formattedTime}</div>
        <div className="text-xl">{formattedDate}</div>
      </div>

      {/* Unlock Indicator */}
      <div 
        className="flex flex-col items-center pb-12 text-white transition-all duration-300"
        style={{ 
          transform: `translateY(${-dragDistance * 0.5}px)`,
          opacity: 1 - unlockOpacity 
        }}
      >
        <ChevronUp className="h-6 w-6 animate-bounce" />
        <div className="mt-2 text-sm">Swipe up to unlock</div>
      </div>

      {/* Control Center */}
      {showControlCenter && (
        <div className="absolute inset-x-0 top-0 h-64 bg-black/70 backdrop-blur-md text-white rounded-b-3xl p-4">
          <div 
            className="absolute right-4 top-4" 
            onClick={() => setShowControlCenter(false)}
          >
            Close
          </div>
          <div className="mt-8">
            <div className="text-sm mb-2">Brightness</div>
            <input 
              type="range" 
              min="20" 
              max="100" 
              value={brightness}
              onChange={(e) => setBrightness(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};
