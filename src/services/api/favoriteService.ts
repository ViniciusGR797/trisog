import axios from "axios";
import { api } from "./api";

class FavoriteService {
  async getFavorite(): Promise<any> {
    try {
      const response = await api.get("/favorites");
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }

  async createFavorite(experience_id: string): Promise<any> {
    try {
      const response = await api.post("/favorites", {
        experience_id,
      });
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }

  async deleteFavorite(experience_id: string): Promise<any> {
    try {
      const response = await api.delete(`/favorites/${experience_id}`);
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }
}

export default new FavoriteService();
