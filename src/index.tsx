/* import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app"; // Assicurati che il percorso sia corretto

// Assicurati che nel tuo file HTML ci sia un elemento con id 'root'
const container = document.getElementById("root");

// Utilizza createRoot per montare l'applicazione React
if (container !== null) {
  const root = createRoot(container);
  root.render(<App />);
}
 */
// src/index.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "./routes"; // Assicurati di importare AppRoutes

// Assicurati che nel tuo file HTML ci sia un elemento con id 'root'
const container = document.getElementById("root");

if (container !== null) {
  const root = createRoot(container);
  root.render(<AppRoutes />);
}
