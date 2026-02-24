export type UserRole = "CUSTOMER" | "ORGANIZER";

export interface User {
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  message: string;
  accessToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
