import React from 'react';
import { SunSnow, CloudHail } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-gray-800/85 to-gray-900/85 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-center items-center">
          <div className="flex items-center">
            <SunSnow className="w-8 h-8 mr-3 text-stone-100" />
          </div>
          <h1 className="text-2xl font-bold text-stone-100">
          Weather Image Classifier
          </h1>
          <div className="flex items-center">
            <CloudHail className="w-8 h-8 ml-3 text-stone-100" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;