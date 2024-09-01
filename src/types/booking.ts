export type Ticket = {
  adults: number;
  kids: number;
  children: number;
};

export type Booking = {
  id: string;
  date: string;
  time: string;
  ticket: Ticket;
  total_price: number;
  experience_id: string;
};
