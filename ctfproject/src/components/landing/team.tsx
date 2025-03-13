import { Team } from "../types";
import { Mail } from "lucide-react";

export const TeamMember = ({ name, studentId, role, githubUrl, email, imageUrl }: Team) => (
    <div className="group relative pt-20">
      <div className="relative bg-white border-blue-600 border-2 shadow-md group-hover:shadow-lg rounded-xl px-8 pb-8 pt-20 ring-1 ring-gray-200/50 transform group-hover:scale-[1.01] transition duration-300">
        <div className="absolute -top-16 left-1/2 -translate-x-1/2">
          <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white bg-white shadow-xl transform group-hover:scale-105 transition duration-300">
            <img 
              src={imageUrl || "/api/placeholder/160/160"}
              alt={`${name}'s profile`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{name}</h3>
          <p className="text-primary font-medium mb-4">{studentId}</p>
          <div className="flex gap-2 flex-wrap justify-center mb-6">
            <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
              {role}
            </span>
          </div>
          <div className="flex space-x-4 items-center">
            <a 
              href={githubUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transform hover:scale-110 transition duration-300"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.162 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.16 22 16.42 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
              </svg>
            </a>
            <a 
              href={`mailto:${email}`}
              className="text-gray-600 hover:text-primary transform hover:scale-110 transition duration-300"
            >
              <Mail className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );