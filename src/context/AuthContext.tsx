import { createContext, useEffect, useReducer, type ReactNode } from "react";
import type { User } from "../types/types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
}

type AuthAction =
  | { type: "LOGIN_START" }
  | {
      type: "LOGIN_SUCCESS";
      payload: {
        user: User;
        accessToken: string;
      };
    }
  | { type: "LOGOUT" };

const initialState: AuthState = {
  user:
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user") as string)
      : null,
  accessToken: localStorage.getItem("accessToken") || null,
};

export const authContext = createContext<{
  user: AuthState["user"];
  accessToken: AuthState["accessToken"];
  dispatch: React.Dispatch<AuthAction>;
}>({
  user: initialState.user,
  accessToken: initialState.accessToken,
  dispatch: () => null,
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        accessToken: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };
    case "LOGOUT":
      return {
        user: null,
        accessToken: null,
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
  }, [state]);

  return (
    <authContext.Provider
      value={{
        user: state.user,
        accessToken: state.accessToken,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
