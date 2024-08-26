import axios from "axios";
import { api } from "./api";

class DestinationService {
  async getDestinations(): Promise<any> {
    try {
      const response = await api.get("/destinations");
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }

  async getDestinationById(destination_id: string): Promise<any> {
    try {
      const response = await api.get(`/destinations/${destination_id}`);
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }

  async createDestination(
    name: string,
    about: string,
    continent: string,
    map_link: string,
    language: string[],
    currency: string,
    area: number,
    population: number,
    time_zone: string,
    time_to_travel: string[],
    images: string[],
    weather: object
  ): Promise<any> {
    try {
      const response = await api.post("/destinations", {
        name,
        about,
        continent,
        map_link,
        language,
        currency,
        area,
        population,
        time_zone,
        time_to_travel,
        images,
        weather,
      });
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }

  async updateDestination(
    name: string,
    about: string,
    continent: string,
    map_link: string,
    language: string[],
    currency: string,
    area: number,
    population: number,
    time_zone: string,
    time_to_travel: string[],
    images: string[],
    weather: object,
    destination_id: string
  ): Promise<any> {
    try {
      const response = await api.put(`/destinations/${destination_id}`, {
        name,
        about,
        continent,
        map_link,
        language,
        currency,
        area,
        population,
        time_zone,
        time_to_travel,
        images,
        weather,
      });
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }

  async deleteDestination(destination_id: string): Promise<any> {
    try {
      const response = await api.delete(`/destinations/${destination_id}`);
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }
}

export default new DestinationService();
