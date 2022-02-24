import axios from 'axios';
import React, {
  useState,
  useContext,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

type AuthContextType = {
  user: AuthState;
  setUser: Dispatch<SetStateAction<AuthState>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuthContext = () => useContext(AuthContext);

interface AuthState {
  isAuthenticated: boolean;
  token: string | undefined;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthState>({
    isAuthenticated: false,
    token: undefined,
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
