import type { SignInUserDTO, SignUpUserDTO } from "../types/dto";

class AuthService {
  async signUp(payload: SignUpUserDTO) {
    try {
      console.log(payload);
    } catch (error: any) {
      console.log(error);
    }
  }

  async signIn(payload: SignInUserDTO) {
    try {
      console.log(payload);
    } catch (error: any) {
      console.log(error);
    }
  }
}

export const authService = new AuthService();