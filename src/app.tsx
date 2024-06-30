// src/app.tsx
/* import React from "react";
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
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const App: React.FC = () => {
  const [users, setUsers] = useState<{ id: number; name: string; email: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await window.api.fetchUsers();
      setUsers(result);
    };

    fetchData();
  }, []);

  return (
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
      <div className="mt-4">
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Users</h2>
        <ul>
          {users.map(user => (
            <li key={user.id} className="text-lg text-gray-900">
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
