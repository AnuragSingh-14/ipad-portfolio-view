
import React, { useState, useEffect } from 'react';
import { IPadScreen } from './IPadScreen';

export const IPadFrame: React.FC = () => {
  const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);
  const [brightness, setBrightness] = useState(100);

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4 bg-gradient-to-b from-slate-100 to-slate-200">
      <div
        className={`ipad-frame relative bg-[#e2e2e7] max-w-5xl w-full ${
          isLandscape ? 'aspect-[4/3]' : 'aspect-[3/4]'
        } mx-auto`}
        style={{ filter: `brightness(${brightness}%)` }}
      >
        {/* Power Button */}
        <div className="absolute top-10 right-0 h-12 w-2 bg-[#c8c8c8] rounded-r-md"></div>
        
        {/* Volume Buttons */}
        <div className="absolute top-32 right-0 h-16 w-2 bg-[#c8c8c8] rounded-r-md"></div>
        <div className="absolute top-52 right-0 h-16 w-2 bg-[#c8c8c8] rounded-r-md"></div>
        
        {/* Front Camera */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-[#333]"></div>

        {/* iPad Screen */}
        <div className="ipad-screen absolute inset-3 bg-black">
          <IPadScreen isLandscape={isLandscape} brightness={brightness} setBrightness={setBrightness} />
        </div>
        
        {/* Home Button */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 h-5 w-5 rounded-full border-2 border-[#c8c8c8]"></div>
      </div>
    </div>
  );
};

export default IPadFrame;
