export interface SignUpUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInUserDTO {
  email: string;
  password: string;
}
