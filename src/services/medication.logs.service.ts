import type { CreateMedicationLogDTO } from "../types/dto";
import type { MedicationLog } from "../types/types";
import apiClient from "./api.client.service";

class MedicationLogsService {
  async createMedicationLog(payload: CreateMedicationLogDTO) {
    try {
      const response = await apiClient.post("/medications/logs", payload);
      return response.data;
    } catch (error: any) {
      console.error("Error while creating medication logs: ", error);
      return {
        success: false,
        message: error.response.data.message,
      };
    }
  }

  async findAllMedicationLogByUserId(userId: string) {
    try {
      const response = await apiClient.get(
        `/medications/logs?userId=${userId}`
      );
      return response.data;
    } catch (error: any) {
      console.error("Error while finding medication logs: ", error);
      return {
        success: false,
        message: error.response.data.message,
      };
    }
  }

  async findAllMedicationLogByMedicationId(medicationId: string) {
    try {
      const response = await apiClient.get(
        `/medications/logs?userId=${medicationId}`
      );
      return response.data;
    } catch (error: any) {
      console.error("Error while finding medication logs: ", error);
      return {
        success: false,
        message: error.response.data.message,
      };
    }
  }

  async findMedicationLogById(id: string) {
    try {
      const response = await apiClient.get(`/medications/logs/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Error while finding medication logs by id: ", error);
      return {
        success: false,
        message: error.response.data.message,
      };
    }
  }

  async updateMedicationLog(id: string, payload: Partial<MedicationLog>) {
    try {
      const response = await apiClient.patch(
        `/medications/logs/${id}`,
        payload
      );
      return response.data;
    } catch (error: any) {
      console.error("Error while updating medication logs: ", error);
    }
  }

  async deleteMedicationLog(id: string) {
    try {
      const response = await apiClient.delete(`/medications/logs/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Error while deleting medication logs: ", error);
      return {
        success: false,
        message: error.response.data.message,
      };
    }
  }
}

export const medicationLogsService = new MedicationLogsService();
