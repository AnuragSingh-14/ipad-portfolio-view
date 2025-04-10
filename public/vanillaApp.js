
document.addEventListener('DOMContentLoaded', function() {
  // Variables to track state
  let isLocked = true;
  let brightness = 100;
  let batteryLevel = 90;
  let currentApp = null;
  let isLandscape = window.innerWidth > window.innerHeight;
  let showControlCenter = false;
  
  // Initialize the iPad
  initializeIPad();
  
  // Add event listeners for orientation changes
  window.addEventListener('resize', function() {
    isLandscape = window.innerWidth > window.innerHeight;
    renderIPad();
  });
  
  // Set up clock updates
  setInterval(updateClock, 1000);
  
  function initializeIPad() {
    renderIPad();
    updateClock();
  }
  
  function renderIPad() {
    const container = document.getElementById('ipad-container');
    if (!container) return;
    
    // Create iPad frame
    container.innerHTML = `
      <div class="ipad-frame relative bg-[#e2e2e7] max-w-5xl w-full ${
        isLandscape ? 'aspect-[4/3]' : 'aspect-[3/4]'
      } mx-auto rounded-[44px] shadow-2xl" style="filter: brightness(${brightness}%)">
        <!-- Power Button -->
        <div class="absolute top-10 right-0 h-12 w-2 bg-[#c8c8c8] rounded-r-md"></div>
        
        <!-- Volume Buttons -->
        <div class="absolute top-32 right-0 h-16 w-2 bg-[#c8c8c8] rounded-r-md"></div>
        <div class="absolute top-52 right-0 h-16 w-2 bg-[#c8c8c8] rounded-r-md"></div>
        
        <!-- Front Camera -->
        <div class="absolute top-8 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-[#333]"></div>

        <!-- iPad Screen -->
        <div id="ipad-screen" class="ipad-screen absolute inset-3 bg-black rounded-[32px] overflow-hidden">
          ${renderScreen()}
        </div>
        
        <!-- Home Button -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 h-5 w-5 rounded-full border-2 border-[#c8c8c8]"></div>
      </div>
    `;
    
    addScreenEventListeners();
  }
  
  function renderScreen() {
    if (isLocked) {
      return renderLockScreen();
    } else if (currentApp) {
      return renderApp(currentApp);
    } else {
      return renderHomeScreen();
    }
  }
  
  function renderLockScreen() {
    const date = new Date();
    const formattedTime = date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    
    const formattedDate = date.toLocaleDateString([], {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
    
    return `
      <div class="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 flex flex-col justify-between" id="lock-screen">
        <!-- Status Bar -->
        <div class="flex justify-between items-center p-3 text-white">
          <div>${formattedTime}</div>
          <div class="flex items-center space-x-2">
            <div class="text-xs">${batteryLevel}%</div>
            <div class="w-6 h-3 border border-white rounded-sm relative">
              <div class="absolute inset-0 bg-white mr-1" style="width: ${batteryLevel}%"></div>
            </div>
          </div>
        </div>

        <!-- Time & Date -->
        <div class="flex flex-col items-center justify-center text-white p-8 ${isLandscape ? 'pb-16' : 'pb-32'}">
          <div class="text-6xl font-thin mb-2">${formattedTime}</div>
          <div class="text-xl">${formattedDate}</div>
        </div>

        <!-- Unlock Indicator -->
        <div class="flex flex-col items-center pb-12 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 animate-bounce">
            <path d="m18 15-6-6-6 6"/>
          </svg>
          <div class="mt-2 text-sm">Swipe up to unlock</div>
        </div>
        
        ${showControlCenter ? renderControlCenter() : ''}
      </div>
    `;
  }
  
  function renderControlCenter() {
    return `
      <div class="absolute inset-x-0 top-0 h-64 bg-black/70 backdrop-blur-md text-white rounded-b-3xl p-4" id="control-center">
        <div class="absolute right-4 top-4 cursor-pointer" id="close-control-center">Close</div>
        <div class="mt-8">
          <div class="text-sm mb-2">Brightness</div>
          <input 
            type="range" 
            min="20" 
            max="100" 
            value="${brightness}" 
            id="brightness-slider"
            class="w-full"
          />
        </div>
      </div>
    `;
  }
  
  function renderHomeScreen() {
    const date = new Date();
    const formattedTime = date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    
    // Define app icons for home screen
    const apps = [
      { id: 'projects', name: 'Projects', color: 'from-blue-500 to-blue-600', icon: '📱' },
      { id: 'about', name: 'About Me', color: 'from-purple-500 to-purple-600', icon: '👨‍💻' },
      { id: 'skills', name: 'Skills', color: 'from-green-500 to-green-600', icon: '🛠️' },
      { id: 'contact', name: 'Contact', color: 'from-yellow-500 to-yellow-600', icon: '📧' },
    ];
    
    // Create app icon HTML
    const appIconsHTML = apps.map(app => `
      <div class="flex flex-col items-center cursor-pointer app-icon" data-app="${app.id}">
        <div class="ios-icon w-16 h-16 bg-gradient-to-br ${app.color} flex items-center justify-center text-white text-3xl mb-1 rounded-[22%] shadow-md transform transition-transform active:scale-95">
          ${app.icon}
        </div>
        <div class="text-xs text-white font-medium text-center bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm">
          ${app.name}
        </div>
      </div>
    `).join('');
    
    return `
      <div class="w-full h-full bg-cover bg-center overflow-hidden" style="background-image: url(https://source.unsplash.com/random/1200x900/?minimal,abstract)">
        <!-- Status Bar -->
        <div class="flex justify-between items-center p-3 text-white bg-black/20 backdrop-blur-sm">
          <div>${formattedTime}</div>
          <div class="flex items-center space-x-2">
            <div class="text-xs">${batteryLevel}%</div>
            <div class="w-6 h-3 border border-white rounded-sm relative">
              <div class="absolute inset-0 bg-white mr-1" style="width: ${batteryLevel}%"></div>
            </div>
          </div>
        </div>

        <!-- App Grid -->
        <div class="grid ${isLandscape ? 'grid-cols-8' : 'grid-cols-4'} gap-6 p-8">
          ${appIconsHTML}
        </div>

        <!-- Dock -->
        <div class="absolute bottom-0 inset-x-0 p-4">
          <div class="flex justify-center space-x-4 bg-white/20 backdrop-blur-md p-4 rounded-3xl">
            <div 
              class="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center text-white cursor-pointer"
              id="lock-button"
            >
              🔒
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  function renderApp(appId) {
    const appContent = {
      projects: renderProjectsApp(),
      about: renderAboutApp(),
      skills: renderSkillsApp(),
      contact: renderContactApp()
    };
    
    return appContent[appId] || '';
  }
  
  function renderProjectsApp() {
    const projects = [
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
    
    // Generate project cards HTML
    const projectsHTML = projects.map(project => `
      <div class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer project-card" data-project-id="${project.id}">
        <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover">
        <div class="p-4">
          <h2 class="text-xl font-bold mb-2">${project.title}</h2>
          <p class="text-gray-600 line-clamp-2">${project.description}</p>
        </div>
      </div>
    `).join('');
    
    return `
      <div class="w-full h-full app-launch overflow-y-auto bg-gray-100">
        <!-- App Header -->
        <div class="sticky top-0 z-10 bg-white shadow-sm">
          <div class="flex justify-between items-center p-4">
            <button class="text-blue-500 hover:text-blue-700 home-button">← Home</button>
            <h1 class="text-xl font-semibold">Projects</h1>
            <div class="w-16"></div>
          </div>
        </div>

        <div id="projects-list" class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          ${projectsHTML}
        </div>
        
        <div id="project-detail" class="hidden p-4">
          <!-- Project detail will be dynamically populated -->
        </div>
      </div>
    `;
  }
  
  function renderProjectDetail(projectId) {
    const projects = [
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
    
    const project = projects.find(p => p.id === parseInt(projectId));
    if (!project) return '';
    
    const technologiesHTML = project.technologies.map(tech => 
      `<span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">${tech}</span>`
    ).join('');
    
    return `
      <button class="text-blue-500 mb-4 back-to-projects">← Back to Projects</button>
      
      <div class="bg-white rounded-xl overflow-hidden shadow-lg">
        <img src="${project.image}" alt="${project.title}" class="w-full h-64 object-cover">
        
        <div class="p-6">
          <h2 class="text-2xl font-bold mb-4">${project.title}</h2>
          
          <p class="text-gray-700 mb-6">${project.description}</p>
          
          <div class="mb-6">
            <h3 class="text-lg font-semibold mb-2">Technologies Used</h3>
            <div class="flex flex-wrap gap-2">
              ${technologiesHTML}
            </div>
          </div>
          
          ${project.appStoreLink ? `
            <a href="${project.appStoreLink}" class="inline-block bg-black text-white px-6 py-3 rounded-full font-medium">
              View on App Store
            </a>
          ` : ''}
        </div>
      </div>
    `;
  }
  
  function renderAboutApp() {
    return `
      <div class="w-full h-full app-launch overflow-y-auto bg-gray-100">
        <!-- App Header -->
        <div class="sticky top-0 z-10 bg-white shadow-sm">
          <div class="flex justify-between items-center p-4">
            <button class="text-blue-500 hover:text-blue-700 home-button">← Home</button>
            <h1 class="text-xl font-semibold">About Me</h1>
            <div class="w-16"></div>
          </div>
        </div>

        <div class="max-w-4xl mx-auto p-6">
          <div class="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div class="md:flex">
              <div class="md:flex-shrink-0">
                <img 
                  class="h-48 w-full object-cover md:w-48" 
                  src="https://source.unsplash.com/random/200x200/?developer,portrait" 
                  alt="Profile" 
                />
              </div>
              <div class="p-8">
                <div class="uppercase tracking-wide text-sm text-blue-500 font-semibold">iOS Developer</div>
                <h2 class="mt-1 text-2xl font-bold text-gray-900">John Appleseed</h2>
                <p class="mt-2 text-gray-600">
                  Passionate iOS developer with 5+ years of experience creating beautiful, 
                  intuitive applications that users love.
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-lg overflow-hidden p-8 mb-8">
            <h3 class="text-xl font-bold text-gray-900 mb-4">My Journey</h3>
            <div class="space-y-6 text-gray-600">
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

          <div class="bg-white rounded-xl shadow-lg overflow-hidden p-8 mb-8">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Philosophy</h3>
            <div class="space-y-6 text-gray-600">
              <p>
                I believe that the best apps are those that feel invisible—they work so 
                intuitively that users hardly notice the interface. They just accomplish what 
                they need to do without friction or confusion.
              </p>
              <p>
                My development approach focuses on three core principles:
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <li><span class="font-medium">User-Centered Design</span>: Understanding user needs and behaviors before writing a single line of code.</li>
                <li><span class="font-medium">Attention to Detail</span>: Obsessing over the small things that make a big difference in how an app feels.</li>
                <li><span class="font-medium">Continuous Learning</span>: Staying ahead of iOS development trends and best practices.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  function renderSkillsApp() {
    const skills = [
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
    
    // Generate skills HTML by category
    const skillsCategoriesHTML = categories.map(category => {
      const categorySkills = skills
        .filter(skill => skill.category === category.id)
        .sort((a, b) => b.level - a.level);
        
      const skillsHTML = categorySkills.map(skill => `
        <div class="space-y-2">
          <div class="flex items-center">
            <span class="text-2xl mr-3">${skill.icon}</span>
            <span class="font-medium">${skill.name}</span>
            <span class="ml-auto text-gray-500">${skill.level}%</span>
          </div>
          
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              class="bg-blue-600 h-2.5 rounded-full" 
              style="width: ${skill.level}%"
            ></div>
          </div>
        </div>
      `).join('');
      
      return `
        <div class="bg-white rounded-xl shadow-lg overflow-hidden p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">${category.name}</h2>
          
          <div class="space-y-6">
            ${skillsHTML}
          </div>
        </div>
      `;
    }).join('');
    
    return `
      <div class="w-full h-full app-launch overflow-y-auto bg-gray-100">
        <!-- App Header -->
        <div class="sticky top-0 z-10 bg-white shadow-sm">
          <div class="flex justify-between items-center p-4">
            <button class="text-blue-500 hover:text-blue-700 home-button">← Home</button>
            <h1 class="text-xl font-semibold">Skills</h1>
            <div class="w-16"></div>
          </div>
        </div>

        <div class="max-w-4xl mx-auto p-6 space-y-8">
          ${skillsCategoriesHTML}

          <div class="bg-white rounded-xl shadow-lg overflow-hidden p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Additional Expertise</h2>
            
            <div class="grid grid-cols-2 gap-4">
              <div class="border border-gray-200 rounded-lg p-4">
                <h3 class="font-medium text-gray-900 mb-2">App Architecture</h3>
                <ul class="text-gray-600 space-y-1">
                  <li>• MVVM, MVC patterns</li>
                  <li>• Clean Architecture</li>
                  <li>• Dependency Injection</li>
                  <li>• Protocol-Oriented Programming</li>
                </ul>
              </div>
              
              <div class="border border-gray-200 rounded-lg p-4">
                <h3 class="font-medium text-gray-900 mb-2">App Store Optimization</h3>
                <ul class="text-gray-600 space-y-1">
                  <li>• App Analytics</li>
                  <li>• A/B Testing</li>
                  <li>• Performance Optimization</li>
                  <li>• Review Management</li>
                </ul>
              </div>
              
              <div class="border border-gray-200 rounded-lg p-4">
                <h3 class="font-medium text-gray-900 mb-2">Testing</h3>
                <ul class="text-gray-600 space-y-1">
                  <li>• Unit Testing (XCTest)</li>
                  <li>• UI Testing</li>
                  <li>• TDD Methodology</li>
                  <li>• TestFlight Distribution</li>
                </ul>
              </div>
              
              <div class="border border-gray-200 rounded-lg p-4">
                <h3 class="font-medium text-gray-900 mb-2">UI/UX Design</h3>
                <ul class="text-gray-600 space-y-1">
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
    `;
  }
  
  function renderContactApp() {
    return `
      <div class="w-full h-full app-launch overflow-y-auto bg-gray-100">
        <!-- App Header -->
        <div class="sticky top-0 z-10 bg-white shadow-sm">
          <div class="flex justify-between items-center p-4">
            <button class="text-blue-500 hover:text-blue-700 home-button">← Home</button>
            <h1 class="text-xl font-semibold">Contact</h1>
            <div class="w-16"></div>
          </div>
        </div>

        <div class="max-w-4xl mx-auto p-6">
          <div class="bg-white rounded-xl shadow-lg overflow-hidden p-8 mb-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 class="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                <p class="text-gray-600 mb-6">
                  Interested in working together? Have a question about my work?
                  I'd love to hear from you. Fill out the form or reach out through 
                  the contact methods below.
                </p>
                
                <div class="space-y-4">
                  <div class="flex items-center">
                    <div class="bg-blue-100 p-3 rounded-full mr-4">
                      <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-medium text-gray-900">Email</h3>
                      <p class="text-gray-600">john@example.com</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center">
                    <div class="bg-blue-100 p-3 rounded-full mr-4">
                      <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-medium text-gray-900">Phone</h3>
                      <p class="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center">
                    <div class="bg-blue-100 p-3 rounded-full mr-4">
                      <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-medium text-gray-900">Social</h3>
                      <div class="flex space-x-4 mt-1">
                        <a href="#" class="text-gray-600 hover:text-blue-500">LinkedIn</a>
                        <a href="#" class="text-gray-600 hover:text-blue-500">GitHub</a>
                        <a href="#" class="text-gray-600 hover:text-blue-500">Twitter</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <form id="contact-form" class="space-y-6">
                  <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows="5"
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="How can I help you?"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    id="submit-contact"
                    class="w-full py-3 px-6 text-white font-medium rounded-md shadow-sm bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Send Message
                  </button>
                  
                  <div id="contact-success" class="hidden p-4 bg-green-100 text-green-700 rounded-md text-center">
                    Thank you for your message! I'll get back to you soon.
                  </div>
                  
                  <div id="contact-error" class="hidden p-4 bg-red-100 text-red-700 rounded-md text-center">
                    There was an error sending your message. Please try again.
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <iframe 
              title="Location Map"
              class="w-full h-64 border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555663244!2d-122.50764037544076!3d37.75781499669495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sus!4v1618456636014!5m2!1sen!2sus"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    `;
  }
  
  function addScreenEventListeners() {
    const screen = document.getElementById('ipad-screen');
    if (!screen) return;
    
    // Lock screen events
    if (isLocked) {
      // Swipe up to unlock
      let touchStartY = 0;
      
      screen.addEventListener('mousedown', function(e) {
        touchStartY = e.clientY;
      });
      
      screen.addEventListener('mousemove', function(e) {
        if (e.buttons > 0 && touchStartY - e.clientY > 150) {
          isLocked = false;
          renderIPad();
        }
      });
      
      screen.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
      });
      
      screen.addEventListener('touchmove', function(e) {
        if (touchStartY - e.touches[0].clientY > 150) {
          isLocked = false;
          renderIPad();
        }
      });
      
      // Swipe down for control center
      const lockScreen = document.getElementById('lock-screen');
      if (lockScreen) {
        lockScreen.addEventListener('mousedown', function(e) {
          touchStartY = e.clientY;
        });
        
        lockScreen.addEventListener('mousemove', function(e) {
          if (e.buttons > 0 && e.clientY - touchStartY > 50) {
            showControlCenter = true;
            renderIPad();
          }
        });
        
        // Close control center
        const closeControlCenter = document.getElementById('close-control-center');
        if (closeControlCenter) {
          closeControlCenter.addEventListener('click', function() {
            showControlCenter = false;
            renderIPad();
          });
        }
        
        // Brightness slider
        const brightnessSlider = document.getElementById('brightness-slider');
        if (brightnessSlider) {
          brightnessSlider.addEventListener('input', function(e) {
            brightness = parseInt(e.target.value);
            renderIPad();
          });
        }
      }
    }
    // Home screen events
    else if (!currentApp) {
      // App icons
      const appIcons = document.querySelectorAll('.app-icon');
      appIcons.forEach(icon => {
        icon.addEventListener('click', function() {
          const appId = this.getAttribute('data-app');
          currentApp = appId;
          renderIPad();
        });
      });
      
      // Lock button
      const lockButton = document.getElementById('lock-button');
      if (lockButton) {
        lockButton.addEventListener('click', function() {
          isLocked = true;
          renderIPad();
        });
      }
    }
    // App events
    else {
      // Home buttons
      const homeButtons = document.querySelectorAll('.home-button');
      homeButtons.forEach(button => {
        button.addEventListener('click', function() {
          currentApp = null;
          renderIPad();
        });
      });
      
      // Contact form
      if (currentApp === 'contact') {
        const contactForm = document.getElementById('contact-form');
        const contactSuccess = document.getElementById('contact-success');
        const contactError = document.getElementById('contact-error');
        const submitButton = document.getElementById('submit-contact');
        
        if (contactForm && submitButton) {
          contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
              submitButton.textContent = 'Send Message';
              submitButton.disabled = false;
              
              // Show success message
              if (contactSuccess) {
                contactSuccess.classList.remove('hidden');
                
                // Clear form
                contactForm.reset();
                
                // Hide success message after 3 seconds
                setTimeout(() => {
                  contactSuccess.classList.add('hidden');
                }, 3000);
              }
            }, 1500);
          });
        }
      }
      
      // Projects navigation
      if (currentApp === 'projects') {
        const projectsList = document.getElementById('projects-list');
        const projectDetail = document.getElementById('project-detail');
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
          card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project-id');
            
            // Hide projects list and show project detail
            if (projectsList && projectDetail) {
              projectsList.classList.add('hidden');
              projectDetail.classList.remove('hidden');
              projectDetail.innerHTML = renderProjectDetail(projectId);
              
              // Add back button listener
              const backButton = document.querySelector('.back-to-projects');
              if (backButton) {
                backButton.addEventListener('click', function() {
                  projectsList.classList.remove('hidden');
                  projectDetail.classList.add('hidden');
                });
              }
            }
          });
        });
      }
    }
  }
  
  function updateClock() {
    const formattedTime = new Date().toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    
    const timeElements = document.querySelectorAll('.time');
    timeElements.forEach(el => {
      el.textContent = formattedTime;
    });
    
    // Only re-render if showing lock screen to update time
    if (isLocked) {
      renderIPad();
    }
  }
});

// Add CSS to support the vanilla JS app
(() => {
  const style = document.createElement('style');
  style.textContent = `
    /* iPad frame styles */
    .ipad-frame {
      border-radius: 44px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }

    .ipad-screen {
      border-radius: 32px;
      overflow: hidden;
    }

    .ios-icon {
      border-radius: 22%;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    /* Animations */
    @keyframes app-launch {
      0% {
        transform: scale(0.8);
        opacity: 0;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }

    .app-launch {
      animation: app-launch 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    .animate-bounce {
      animation: bounce 1s infinite;
    }

    /* Utility classes */
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);
})();
