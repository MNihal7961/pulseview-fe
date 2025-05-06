import { createContext, useContext, useState, type ReactNode } from "react";

type LoaderContextType = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  loadingMessage: string | null;
  setLoadingMessage: (message: string | null) => void;
};

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

type LoaderProviderProps = {
  children: ReactNode;
};

export const LoaderProvider = ({ children }: LoaderProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);

  return (
    <LoaderContext.Provider
      value={{ loading, setLoading, loadingMessage, setLoadingMessage }}
    >
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = (): LoaderContextType => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
};
