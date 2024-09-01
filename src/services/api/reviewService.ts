import axios from "axios";
import { api } from "./api";
import { Scores } from "@/types/review";

class ReviewService {
  async getReviews(): Promise<any> {
    try {
      const response = await api.get("/reviews");
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }

  async getReviewById(review_id: string): Promise<any> {
    try {
      const response = await api.get(`/reviews/${review_id}`);
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }

  async createReview(
    name: string,
    email: string,
    comment: string,
    image: string,
    scores: string,
    experience_id: Scores,
  ): Promise<any> {
    try {
      const response = await api.post("/reviews", {
        name,
        email,
        comment,
        image,
        scores,
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

  async updateReview(
    name: string,
    email: string,
    comment: string,
    image: string,
    scores: string,
    experience_id: Scores,
    review_id: string
  ): Promise<any> {
    try {
      const response = await api.put(`/reviews/${review_id}`, {
        name,
        email,
        comment,
        image,
        scores,
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

  async deleteReview(review_id: string): Promise<any> {
    try {
      const response = await api.delete(`/reviews/${review_id}`);
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }
}

export default new ReviewService();
