
import React from 'react';

interface AppIconProps {
  name: string;
  color: string;
  icon: string;
  onClick: () => void;
}

export const AppIcon: React.FC<AppIconProps> = ({ name, color, icon, onClick }) => {
  return (
    <div className="flex flex-col items-center" onClick={onClick}>
      <div 
        className={`ios-icon w-16 h-16 bg-gradient-to-br ${color} flex items-center justify-center text-white text-3xl mb-1 cursor-pointer transform transition-transform active:scale-95`}
      >
        {icon}
      </div>
      <div className="text-xs text-white font-medium text-center bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm">
        {name}
      </div>
    </div>
  );
};
