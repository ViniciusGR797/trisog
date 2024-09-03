type WeatherPeriod = {
  min: number;
  max: number;
};

export type Weather = {
  jan_feb: WeatherPeriod;
  mar_apr: WeatherPeriod;
  may_jun: WeatherPeriod;
  jul_aug: WeatherPeriod;
  sep_oct: WeatherPeriod;
  nov_dec: WeatherPeriod;
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
