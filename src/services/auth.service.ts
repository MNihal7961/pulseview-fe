import type { SignInUserDTO, SignUpUserDTO } from "../types/dto";
import type { FailedAPIResponse, GetUserAPIResponse, SignInAPIResponse, SignUpAPIResponse } from "../types/types";
import apiClient from "./api.client.service";

class AuthService {
  async signUp(
    payload: SignUpUserDTO
  ): Promise<SignUpAPIResponse | FailedAPIResponse> {
    try {
      const response = await apiClient.post("/auth/signup", payload);
      return response.data;
    } catch (error: any) {
      console.error("Error while signing up: ", error);
      return {
        success: false,
        message: error.response.data.message,
      };
    }
  }

  async signIn(payload: SignInUserDTO): Promise<SignInAPIResponse | null> {
    try {
      const response = await apiClient.post("/auth/signin", payload);
      return response.data;
    } catch (error: any) {
      console.error("Error while signing in:", error);
      return null;
    }
  }

  async findUserById(id: string): Promise<GetUserAPIResponse | FailedAPIResponse> {
    try{
      const response = await apiClient.get(`/auth/users/${id}`);
      return response.data;
    }catch(error:any){
      console.error("Error while finding user by id: ", error);
      return {
        success: false,
        message: error.response.data.message,
      };
    }
  }
}

export const authService = new AuthService();
