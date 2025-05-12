import type { CreateWeightEntryDTO } from "../types/dto";
import type { WeightEntry } from "../types/types";
import apiClient from "./api.client.service";

class WeightEntryService {
      async createWeightEntry(payload: CreateWeightEntryDTO) {
    try {
      const response = await apiClient.post("/weight-entries", payload);
      return response.data;
    } catch (error: any) {
      console.error("Error while creating weight entry: ", error);
      return {
        success: false,
        message: error.response.data.message,
      };
    }
  }

  async findAllWeightEntry(userId: string) {
    try {
      const response = await apiClient.get(`/weight-entries?userId=${userId}`);
      return response.data;
    } catch (error: any) {
      console.error("Error while finding weight entry: ", error);
      return {
        success: false,
        message: error.response.data.message,
      };
    }
  }

  async findWeightEntryById(id: string) {
    try {
      const response = await apiClient.get(`/weight-entries/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Error while finding weight entry by id: ", error);
      return {
        success: false,
        message: error.response.data.message,
      };
    }
  }

  async updateWeightEntry(id: string, payload: Partial<WeightEntry>) {
    try {
      const response = await apiClient.patch(`/weight-entries/${id}`, payload);
      return response.data;
    } catch (error: any) {
      console.error("Error while updating weight entry: ", error);
    }
  }

  async deleteWeightEntry(id: string) {
    try {
      const response = await apiClient.delete(`/weight-entries/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Error while deleting weight entry: ", error);
      return {
        success: false,
        message: error.response.data.message,
      };
    }
  }
}

export const weightEntryService = new WeightEntryService();
