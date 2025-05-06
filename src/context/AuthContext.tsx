import { createContext, useEffect, useReducer, type ReactNode } from "react";
import type { User } from "../types/types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

type AuthAction =
  | { type: "LOGIN_START" }
  | {
      type: "LOGIN_SUCCESS";
      payload: {
        user: User;
        role: string;
        accessToken: string;
        refreshToken: string;
      };
    }
  | { type: "LOGOUT" };

const initialState: AuthState = {
  user:
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user") as string)
      : null,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
};

export const authContext = createContext<{
  user: AuthState["user"];
  accessToken: AuthState["accessToken"];
  refreshToken: AuthState["refreshToken"];
  dispatch: React.Dispatch<AuthAction>;
}>({
  user: initialState.user,
  accessToken: initialState.accessToken,
  refreshToken: initialState.refreshToken,
  dispatch: () => null,
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        accessToken: null,
        refreshToken: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case "LOGOUT":
      return {
        user: null,
        accessToken: null,
        refreshToken: null,
      };
    default:
      return state;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    console.log("Auth state updated:", state);
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("accessToken", state.accessToken || "");
    localStorage.setItem("refreshToken", state.refreshToken || "");
  }, [state]);

  return (
    <authContext.Provider
      value={{
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
