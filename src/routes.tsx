// src/routes.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./views/Home/home";
import { Auth } from "./views/Auth/auth";
import App from "./app";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect per percorsi non corrispondenti */}
        <Route path="*" element={<Navigate to="/" />} />{" "}
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
