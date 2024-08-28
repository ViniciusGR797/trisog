import axios from "axios";
import { api } from "./api";

class ExperienceService {
  async getExperiences(): Promise<any> {
    try {
      const response = await api.get("/experiences");
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }

  async getExperienceById(experience_id: string): Promise<any> {
    try {
      const response = await api.get(`/experiences/${experience_id}`);
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }

  async createExperience(
    title: string,
    city: string,
    image: string,
    video: string,
    gallery: string,
    map_link: string,
    start_date: string,
    end_date: string,
    duration: string,
    is_activity: boolean,
    max_people: number,
    min_age: number,
    over_view: string,
    include: string[],
    exclude: string[],
    default_price: number,
    custom_prices: object,
    categories_id: string[],
    plans_id: string[],
    destination_id: string,
  ): Promise<any> {
    try {
      const response = await api.post("/experiences", {
        title,
        city,
        image,
        video,
        gallery,
        map_link,
        start_date,
        end_date,
        duration,
        is_activity,
        max_people,
        min_age,
        over_view,
        include,
        exclude,
        default_price,
        custom_prices,
        categories_id,
        plans_id,
        destination_id,
      });
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }

  async updateExperience(
    title: string,
    city: string,
    image: string,
    video: string,
    gallery: string,
    map_link: string,
    start_date: string,
    end_date: string,
    duration: string,
    is_activity: boolean,
    max_people: number,
    min_age: number,
    over_view: string,
    include: string[],
    exclude: string[],
    default_price: number,
    custom_prices: object,
    categories_id: string[],
    plans_id: string[],
    destination_id: string,
    experience_id: string
  ): Promise<any> {
    try {
      const response = await api.put(`/experiences/${experience_id}`, {
        title,
        city,
        image,
        video,
        gallery,
        map_link,
        start_date,
        end_date,
        duration,
        is_activity,
        max_people,
        min_age,
        over_view,
        include,
        exclude,
        default_price,
        custom_prices,
        categories_id,
        plans_id,
        destination_id,
      });
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }

  async deleteExperience(experience_id: string): Promise<any> {
    try {
      const response = await api.delete(`/experiences/${experience_id}`);
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }
}

export default new ExperienceService();
