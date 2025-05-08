import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import "./index.css";
import { LoaderProvider } from "./context/LoaderContext.tsx";
import NotificationProvider from "./components/Notification.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotificationProvider>
      <AuthContextProvider>
        <LoaderProvider>
          <App />
        </LoaderProvider>
      </AuthContextProvider>
    </NotificationProvider>
  </StrictMode>
);
