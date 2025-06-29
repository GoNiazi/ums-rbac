import { api } from ".";
import { Role, Permission, FormRole } from "../types";

export const getRoles = async (): Promise<Role[]> => {
  const response = await api.get("/roles");
  return response.data;
};

export const createRole = async (
  role: Omit<FormRole, "_id">
): Promise<Role> => {
  const response = await api.post("/roles", role);
  return response.data;
};

export const updateRole = async (
  id: string,
  role: Partial<FormRole>
): Promise<Role> => {
  const response = await api.put(`/roles/${id}`, role);
  return response.data;
};

export const createPermission = async (
  permission: Omit<Permission, "_id">
): Promise<Permission> => {
  const response = await api.post("/roles/permissions", permission);
  return response.data;
};
export const deleteRole = async (id: string): Promise<void> => {
  await api.delete(`/roles/${id}`);
};

export const getPermissions = async (): Promise<Permission[]> => {
  const response = await api.get("/roles/permissions");
  return response.data;
};
