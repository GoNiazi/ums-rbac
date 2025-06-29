import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { AuthUser, User } from "../types";
import {
  getCurrentUser,
  login as apiLogin,
  register as apiRegister,
} from "../api/auth";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: AuthUser | null;
  login: (data: { username: string; password: string }) => Promise<void>;
  register: (data: {
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const login = async (data: { username: string; password: string }) => {
    const authUser = await apiLogin(data);
    console.log("authuser", authUser);

    localStorage.setItem("token", authUser.token);
    localStorage.setItem("user", JSON.stringify(authUser));
    setUser(authUser);
    navigate("/dashboard");
  };

  const register = async (data: {
    username: string;
    email: string;
    password: string;
  }) => {
    await apiRegister(data);
    navigate("/login");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    console.log("user", user);

    return user?.roles.some((role) =>
      role?.permissions.some((p) => p.name === permission)
    );
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, hasPermission }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
