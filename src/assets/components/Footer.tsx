import React from 'react';
import { Github, Youtube } from 'lucide-react';

interface TeamMember {
  name: string;
  github: string;
  role: string;
}

const Footer: React.FC = () => {
  const teamMembers: TeamMember[] = [
    { name: "Juan Arango", github: "https://github.com/JuanArango30", role: "Backend Developer" },
    { name: "Carlos Guerrero", github: "https://github.com/ClusterMax", role: "Fullstack Developer" },
    { name: "John Marulanda", github: "https://github.com/JohnMarulanda", role: "Frontend Developer" },
    { name: "Miguel Rivera", github: "https://github.com/BitzKort", role: "ML Developer" },
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Team Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold border-b border-gray-700 pb-2">Our Team</h3>
            <div className="grid grid-cols-2 gap-4">
              {teamMembers.map((member, index) => (
                <a
                  key={index}
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:text-blue-400 transition-colors group"
                >
                  <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-xs text-gray-400">{member.role}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Project Links Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold border-b border-gray-700 pb-2">Project Links</h3>
            <div className="space-y-3">
              <a
                href="https://github.com/JohnMarulanda/MLServiceCloud-Frontend"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-emerald-700 transition-colors group"
              >
                <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>Frontend Repository</span>
              </a>
              <a
                href="https://github.com/JohnMarulanda/MLServiceCloud-Backend"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-emerald-700 transition-colors group"
              >
                <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>Backend Repository</span>
              </a>
            </div>
          </div>

          {/* Project Demo Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold border-b border-gray-700 pb-2">Project Demo</h3>
            <a
              href="https://youtu.be/lvb8Gw3CL24"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-red-400 transition-colors group"
            >
              <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Watch Demo Video</span>
            </a>
            <a
              href="https://youtu.be/dQw4w9WgXcQ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-red-400 transition-colors group"
            >
              <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Watch Presentation</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-700 text-center text-sm text-gray-400">
          <p> {new Date().getFullYear()} - Te amamos, Cardel.</p>
          <p> Att: La secta de Cardel.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;