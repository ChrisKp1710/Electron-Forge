// src/views/Home/home.tsx
import React from "react";
import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/auth">Go to Auth Page</Link>
          </li>
          <li>
            <Link to="/form">Go to Form Page</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
