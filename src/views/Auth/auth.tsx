// src/views/Auth/auth.tsx
import React from "react";
import { Link } from "react-router-dom";

export const Auth: React.FC = () => {
  return (
    <div>
      <h2>Auth Page</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Go to Home Page</Link>
          </li>
          <li>
            <Link to="/form">Go to Form Page</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
