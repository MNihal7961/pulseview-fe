export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
}

export interface FailedAPIResponse {
  success: boolean;
  message: string;
}

export interface SignUpAPIResponse {
  success: boolean;
  user: User;
  accessToken: string;
  message: string;
}

export interface SignInAPIResponse {
  success: boolean;
  user: User;
  accessToken: string;
  message: string;
}

export interface GetUserAPIResponse {
  success: boolean;
  users: User;
  message: string;
}

