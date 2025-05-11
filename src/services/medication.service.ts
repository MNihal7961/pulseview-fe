import type { CreateMedicationDTO } from "../types/dto";
import type { Medication } from "../types/types";
import apiClient from "./api.client.service";

class MedicationService {
  async createMedication(payload: CreateMedicationDTO) {
    try {
      const response = await apiClient.post("/medications", payload);
      return response.data;
    } catch (error: any) {
      console.error("Error while creating medication: ", error);
      return {
        success: false,
        message: error.response.data.message,
      };
    }
  }

  async findAllMedication(userId: string) {
    try {
      const response = await apiClient.get(`/medications?userId=${userId}`);
      return response.data;
    } catch (error: any) {
      console.error("Error while finding medication: ", error);
      return {
        success: false,
        message: error.response.data.message,
      };
    }
  }

  async findMedicationById(id: string) {
    try {
      const response = await apiClient.get(`/medications/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Error while finding medication by id: ", error);
      return {
        success: false,
        message: error.response.data.message,
      };
    }
  }

  async updateMedication(id: string, payload: Partial<Medication>) {
    try {
      const response = await apiClient.patch(`/medications/${id}`, payload);
      return response.data;
    } catch (error: any) {
      console.error("Error while updating medication: ", error);
    }
  }

  async deleteMedication(id: string) {
    try {
      const response = await apiClient.delete(`/medications/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Error while deleting medication: ", error);
      return {
        success: false,
        message: error.response.data.message,
      };
    }
  }
}

export const medicationService = new MedicationService();
