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
  token: string | null;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthState>({
    isAuthenticated: false,
    token: '0x58e1A9Ad77367c528B5445d46fF9b2C0Be6673E8',
    // token: null,
  });

  useEffect(() => {
    if (user.token) {
      axios.defaults.headers.common['User-Addr'] = user.token;
    }
  }, [user.token]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
