import { api } from ".";
import { User, FormUser } from "../types";

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");
  return response.data;
};

export const createUser = async (
  user: Omit<FormUser, "_id">
): Promise<User> => {
  const response = await api.post("/users", user);
  return response.data;
};

export const updateUser = async (
  id: string,
  user: Partial<FormUser>
): Promise<User> => {
  const response = await api.put(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};
