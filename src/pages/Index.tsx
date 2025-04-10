
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Initialize the vanilla JS iPad app when React component mounts
    const script = document.createElement('script');
    script.src = '/vanillaApp.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div id="ipad-container" className="w-full min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 p-4 flex items-center justify-center">
      {/* The vanilla JS will populate this container */}
    </div>
  );
};

export default Index;
