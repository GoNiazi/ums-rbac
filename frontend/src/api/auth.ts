import { api } from ".";
import { LoginData, RegisterData, AuthUser } from "../types";

export const login = async (data: LoginData): Promise<AuthUser> => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const register = async (data: RegisterData): Promise<void> => {
  await api.post("/auth/register", data);
};

export const getCurrentUser = (): AuthUser | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return { ...user, token };
  } catch (error) {
    return null;
  }
};
