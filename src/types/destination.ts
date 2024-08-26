export type Weather = {
  jan_fev: number;
  mar_apr: number;
  may_jun: number;
  jul_ago: number;
  sep_oct: number;
  nov_dec: number;
};

export type Destination = {
  id: string;
  name: string;
  about: string;
  continent: string;
  map_link: string;
  weather: Weather;
  language: string[];
  currency: string;
  area: number;
  population: number;
  time_zone: string;
  time_to_travel: string[];
  images: string[];
  travel_count: number;
};
