import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import "./index.css";
import { LoaderProvider } from "./context/LoaderContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <LoaderProvider>
        <App />
      </LoaderProvider>
    </AuthContextProvider>
  </StrictMode>
);
