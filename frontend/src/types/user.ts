export interface UserCreate {
  full_name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface UserPublic {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
}

export interface UserList {
  users: UserPublic[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: "bearer";
}
