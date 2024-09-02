import axios from "axios";
import { api } from "./api";

class CategoryService {
  async getCategories(): Promise<any> {
    try {
      const response = await api.get("/categories");
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }

  async getCategoryById(category_id: string): Promise<any> {
    try {
      const response = await api.get(`/categories/${category_id}`);
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }

  async createCategory(name: string, icon: string): Promise<any> {
    try {
      const response = await api.post("/categories", {
        name,
        icon,
      });
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }

  async updateCategory(
    name: string,
    icon: string,
    category_id: string,
  ): Promise<any> {
    try {
      const response = await api.put(`/categories/${category_id}`, {
        name,
        icon,
      });
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }

  async deleteCategory(category_id: string): Promise<any> {
    try {
      const response = await api.delete(`/categories/${category_id}`);
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }
}

export default new CategoryService();
