
import React from 'react';

interface Skill {
  name: string;
  level: number; // 0-100
  category: 'languages' | 'frameworks' | 'tools';
  icon: string;
}

interface SkillsAppProps {
  onClose: () => void;
}

export const SkillsApp: React.FC<SkillsAppProps> = ({ onClose }) => {
  const skills: Skill[] = [
    // Languages
    { name: 'Swift', level: 95, category: 'languages', icon: '🔶' },
    { name: 'Objective-C', level: 85, category: 'languages', icon: '©️' },
    { name: 'JavaScript', level: 80, category: 'languages', icon: '🟨' },
    { name: 'TypeScript', level: 75, category: 'languages', icon: '🔷' },
    
    // Frameworks
    { name: 'UIKit', level: 90, category: 'frameworks', icon: '📱' },
    { name: 'SwiftUI', level: 85, category: 'frameworks', icon: '🎨' },
    { name: 'Core Data', level: 80, category: 'frameworks', icon: '💾' },
    { name: 'ARKit', level: 70, category: 'frameworks', icon: '👓' },
    { name: 'Metal', level: 65, category: 'frameworks', icon: '⚡' },
    { name: 'Core ML', level: 75, category: 'frameworks', icon: '🧠' },
    
    // Tools
    { name: 'Xcode', level: 95, category: 'tools', icon: '🛠️' },
    { name: 'Git', level: 90, category: 'tools', icon: '📊' },
    { name: 'Figma', level: 75, category: 'tools', icon: '🎯' },
    { name: 'Firebase', level: 85, category: 'tools', icon: '🔥' },
    { name: 'AppStore Connect', level: 90, category: 'tools', icon: '🔄' }
  ];

  const categories = [
    { id: 'languages', name: 'Programming Languages' },
    { id: 'frameworks', name: 'Frameworks & Libraries' },
    { id: 'tools', name: 'Tools & Technologies' }
  ];

  return (
    <div className="w-full h-full app-launch overflow-y-auto bg-gray-100">
      {/* App Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="flex justify-between items-center p-4">
          <button 
            onClick={onClose}
            className="text-blue-500 hover:text-blue-700"
          >
            ← Home
          </button>
          <h1 className="text-xl font-semibold">Skills</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{category.name}</h2>
            
            <div className="space-y-6">
              {skills
                .filter(skill => skill.category === category.id)
                .sort((a, b) => b.level - a.level)
                .map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{skill.icon}</span>
                      <span className="font-medium">{skill.name}</span>
                      <span className="ml-auto text-gray-500">{skill.level}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Expertise</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">App Architecture</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• MVVM, MVC patterns</li>
                <li>• Clean Architecture</li>
                <li>• Dependency Injection</li>
                <li>• Protocol-Oriented Programming</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">App Store Optimization</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• App Analytics</li>
                <li>• A/B Testing</li>
                <li>• Performance Optimization</li>
                <li>• Review Management</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Testing</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Unit Testing (XCTest)</li>
                <li>• UI Testing</li>
                <li>• TDD Methodology</li>
                <li>• TestFlight Distribution</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">UI/UX Design</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Human Interface Guidelines</li>
                <li>• Animations & Transitions</li>
                <li>• Accessibility</li>
                <li>• Responsive Layouts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
