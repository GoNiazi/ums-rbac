export interface User {
  _id: string;
  username: string;
  email: string;
  roles: Role[];
}
export interface FormUser {
  username: string;
  email: string;
  password: string;
  roles: string[];
}
export interface Role {
  _id: string;
  name: string;
  permissions: Permission[];
}
export interface FormRole {
  name: string;
  permissions: string[];
}
export interface Permission {
  _id: string;
  name: string;
  description?: string;
}

export interface AuthUser {
  id: string;
  username: string;
  roles: Role[];
  token: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}
