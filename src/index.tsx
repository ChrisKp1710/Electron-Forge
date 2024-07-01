// src/index.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "./routes"; // Assicurati di importare AppRoutes
import "./styles/tailwind.css";

// Assicurati che nel tuo file HTML ci sia un elemento con id 'root'
const container = document.getElementById("root");

if (container !== null) {
  const root = createRoot(container);
  root.render(<AppRoutes />);
}
