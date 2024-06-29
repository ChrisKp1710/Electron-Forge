// src/app.tsx
import React from "react";
import { Link } from "react-router-dom";

const App: React.FC = () => (
  <div>
    <h1>Welcome to TestApp+DB</h1>
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/auth">Auth</Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default App;
