import axios from "axios";
import { api } from "./api";

class TestimonialService {
  async getTestimonials(): Promise<any> {
    try {
      const response = await api.get("/testimonials");
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }

  async getTestimonialById(testimonial_id: string): Promise<any> {
    try {
      const response = await api.get(`/testimonials/${testimonial_id}`);
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }

  async createTestimonial(
    message: string,
    author: string,
  ): Promise<any> {
    try {
      const response = await api.post("/testimonials", {
        message,
        author,
      });
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }

  async updateTestimonial(
    message: string,
    author: string,
    testimonial_id: string
  ): Promise<any> {
    try {
      const response = await api.put(`/testimonials/${testimonial_id}`, {
        message,
        author,
      });
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }

  async deleteTestimonial(testimonial_id: string): Promise<any> {
    try {
      const response = await api.delete(`/testimonials/${testimonial_id}`);
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }
}

export default new TestimonialService();
