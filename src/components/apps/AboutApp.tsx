
import React from 'react';

interface AboutAppProps {
  onClose: () => void;
}

export const AboutApp: React.FC<AboutAppProps> = ({ onClose }) => {
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
          <h1 className="text-xl font-semibold">About Me</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img 
                className="h-48 w-full object-cover md:w-48" 
                src="https://source.unsplash.com/random/200x200/?developer,portrait" 
                alt="Profile" 
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-blue-500 font-semibold">iOS Developer</div>
              <h2 className="mt-1 text-2xl font-bold text-gray-900">John Appleseed</h2>
              <p className="mt-2 text-gray-600">
                Passionate iOS developer with 5+ years of experience creating beautiful, 
                intuitive applications that users love.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">My Journey</h3>
          <div className="space-y-6 text-gray-600">
            <p>
              I began my programming journey during college, where I discovered my passion for 
              mobile development. What started as a hobby quickly evolved into a career as I 
              published my first app to the App Store during my sophomore year.
            </p>
            <p>
              After graduating with a degree in Computer Science, I joined a startup where I 
              led the development of several successful iOS applications. This experience taught 
              me not only technical skills but also the importance of user-centered design and 
              business considerations in app development.
            </p>
            <p>
              Today, I specialize in creating polished iOS experiences that combine beautiful 
              design with flawless functionality. I'm particularly passionate about SwiftUI, 
              animations, and leveraging Apple's latest frameworks to create apps that feel 
              truly native and delightful.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Philosophy</h3>
          <div className="space-y-6 text-gray-600">
            <p>
              I believe that the best apps are those that feel invisible—they work so 
              intuitively that users hardly notice the interface. They just accomplish what 
              they need to do without friction or confusion.
            </p>
            <p>
              My development approach focuses on three core principles:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><span className="font-medium">User-Centered Design</span>: Understanding user needs and behaviors before writing a single line of code.</li>
              <li><span className="font-medium">Attention to Detail</span>: Obsessing over the small things that make a big difference in how an app feels.</li>
              <li><span className="font-medium">Continuous Learning</span>: Staying ahead of iOS development trends and best practices.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
