
import React, { useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  appStoreLink?: string;
}

interface ProjectsAppProps {
  onClose: () => void;
}

export const ProjectsApp: React.FC<ProjectsAppProps> = ({ onClose }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "FitTracker Pro",
      description: "A fitness tracking app with workout plans, nutrition tracking, and progress analytics. Features custom Apple Watch integration for real-time heart rate monitoring.",
      image: "https://source.unsplash.com/random/600x400/?fitness,app",
      technologies: ["Swift", "SwiftUI", "HealthKit", "CoreML"],
      appStoreLink: "#"
    },
    {
      id: 2,
      title: "CryptoWallet",
      description: "Secure cryptocurrency wallet with real-time market data and trading capabilities. Implements biometric authentication and secure offline storage.",
      image: "https://source.unsplash.com/random/600x400/?crypto,finance",
      technologies: ["Swift", "UIKit", "Core Data", "CryptoKit"],
      appStoreLink: "#"
    },
    {
      id: 3,
      title: "MindfulMoments",
      description: "Meditation and mindfulness app with guided sessions, breathing exercises, and sleep stories. Features beautiful visualizations and spatial audio.",
      image: "https://source.unsplash.com/random/600x400/?meditation,calm",
      technologies: ["Swift", "SwiftUI", "AVFoundation", "CloudKit"],
      appStoreLink: "#"
    },
    {
      id: 4,
      title: "RecipeGenius",
      description: "AI-powered recipe app that suggests meals based on ingredients you have. Includes step-by-step cooking instructions and voice commands.",
      image: "https://source.unsplash.com/random/600x400/?food,cooking",
      technologies: ["Swift", "Vision", "Core ML", "SiriKit"],
      appStoreLink: "#"
    }
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
          <h1 className="text-xl font-semibold">Projects</h1>
          <div className="w-16"></div>
        </div>
      </div>

      {selectedProject ? (
        <div className="p-4">
          <button 
            className="text-blue-500 mb-4"
            onClick={() => setSelectedProject(null)}
          >
            ← Back to Projects
          </button>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <img 
              src={selectedProject.image} 
              alt={selectedProject.title} 
              className="w-full h-64 object-cover"
            />
            
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{selectedProject.title}</h2>
              
              <p className="text-gray-700 mb-6">{selectedProject.description}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {selectedProject.appStoreLink && (
                <a 
                  href={selectedProject.appStoreLink}
                  className="inline-block bg-black text-white px-6 py-3 rounded-full font-medium"
                >
                  View on App Store
                </a>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{project.title}</h2>
                <p className="text-gray-600 line-clamp-2">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
