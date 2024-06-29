// src/app.tsx
import React from "react";
import { Link } from "react-router-dom";

const App: React.FC = () => (
  <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
    <h1 className="text-4xl font-bold text-blue-500 mb-4">
      Welcome to TestApp+DB
    </h1>
    <nav>
      <ul className="space-y-2">
        <li>
          <Link to="/home" className="text-xl text-blue-700 hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/auth" className="text-xl text-blue-700 hover:underline">
            Auth
          </Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default App;
