import React, { createContext, useContext } from "react";
import { notification } from "antd";

const NotificationContext = createContext<ReturnType<typeof notification.useNotification> | null>(null);

const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  return (
    <NotificationContext.Provider value={[api, contextHolder]}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

// Hook to use notification API
export const useNotificationApi = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotificationApi must be used within NotificationProvider");
  return context[0];
};

export default NotificationProvider;
