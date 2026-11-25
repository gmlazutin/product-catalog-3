import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Application root element not found");
}

createRoot(root).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
