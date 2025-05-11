import type { CreateGoalDTO } from "../types/dto";
import type { Goal } from "../types/types";
import apiClient from "./api.client.service";

class GoalsService {
  async createGoal(payload: CreateGoalDTO) {
    try {
      const response = await apiClient.post("/goals", payload);
      return response.data;
    } catch (error: any) {
      console.error("Error while creating goal: ", error);
      return {
        success: false,
        message: error.response.data.message,
      };
    }
  }

  async findAllGoals(userId: string) {
    try {
      const response = await apiClient.get(`/goals?userId=${userId}`);
      return response.data;
    } catch (error: any) {
      console.error("Error while finding goals: ", error);
      return {
        success: false,
        message: error.response.data.message,
      };
    }
  }

  async findGoalById(id: string) {
    try {
      const response = await apiClient.get(`/goals/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Error while finding goal by id: ", error);
      return {
        success: false,
        message: error.response.data.message,
      };
    }
  }

  async updateGoal(id: string, payload: Partial<Goal>) {
    try {
      const response = await apiClient.patch(`/goals/${id}`, payload);
      return response.data;
    } catch (error: any) {
      console.error("Error while updating goal: ", error);
    }
  }

  async deleteGoal(id: string) {
    try {
      const response = await apiClient.delete(`/goals/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Error while deleting goal: ", error);
      return {
        success: false,
        message: error.response.data.message,
      };
    }
  }
}

export const goalsService = new GoalsService();
