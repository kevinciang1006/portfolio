import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// The production build pre-renders the page into #root; hydrate it. In dev it's empty.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
