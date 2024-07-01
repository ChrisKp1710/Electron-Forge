// src/routes.tsx
import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./views/Home/home";
import { Auth } from "./views/Auth/auth";
import App from "./app";

const AppRoutes: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;
