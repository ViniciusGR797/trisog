import axios from "axios";
import { api } from "./api";

class PlanService {
  async getPlans(): Promise<any> {
    try {
      const response = await api.get("/plans");
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }

  async getPlanById(plan_id: string): Promise<any> {
    try {
      const response = await api.get(`/plans/${plan_id}`);
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }

  async createPlan(
    time: string,
    title: string,
    description: string,
    topics: string[]
  ): Promise<any> {
    try {
      const response = await api.post("/plans", {
        time,
        title,
        description,
        topics,
      });
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }

  async updatePlan(
    time: string,
    title: string,
    description: string,
    topics: string[],
    plan_id: string
  ): Promise<any> {
    try {
      const response = await api.put(`/plans/${plan_id}`, {
        time,
        title,
        description,
        topics,
      });
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }

  async deletePlan(plan_id: string): Promise<any> {
    try {
      const response = await api.delete(`/plans/${plan_id}`);
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }
}

export default new PlanService();
