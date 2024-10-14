import axios from "axios";
import { api } from "./api";
import { Ticket } from "@/types/booking";

class BookingService {
  async getBookings(): Promise<any> {
    try {
      const response = await api.get("/bookings");
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }

  async getBookingsStatsCount(): Promise<any> {
    try {
      const response = await api.get("/bookings/stats/count");
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }

  async getBookingById(booking_id: string): Promise<any> {
    try {
      const response = await api.get(`/bookings/${booking_id}`);
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }

  async createBooking(
    date: string,
    time: string,
    ticket: Ticket,
    experience_id: string
  ): Promise<any> {
    try {
      const response = await api.post("/bookings", {
        date,
        time,
        ticket,
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

  async updateBooking(
    date: string,
    time: string,
    ticket: Ticket,
    experience_id: string,
    booking_id: string
  ): Promise<any> {
    try {
      const response = await api.put(`/bookings/${booking_id}`, {
        date,
        time,
        ticket,
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

  async deleteBooking(booking_id: string): Promise<any> {
    try {
      const response = await api.delete(`/bookings/${booking_id}`);
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
      return null;
    }
  }
}

export default new BookingService();
