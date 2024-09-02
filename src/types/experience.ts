import { Category } from "./category";
import { Destination } from "./destination";
import { Plan } from "./plan";
import { Ratings } from "./review";

export type CustomPrice = {
  date: Date;
  price: number;
};

export type Experience = {
  id: string;
  title: string;
  city: string;
  image: string;
  video: string;
  gallery: string;
  map_link: string;
  start_date: Date;
  end_date: Date;
  duration: number;
  is_activity: boolean;
  max_people: number;
  min_age: number;
  over_view: string;
  include: string[];
  exclude: string[];
  ratings: Ratings;
  review_count: number;
  default_price: number;
  custom_prices?: CustomPrice[];
  categories: Category[];
  plans: Plan[];
  destination: Destination;
};

export type PaginatedExperiences = {
  page: number;
  limit: number;
  total_pages: number;
  total_experiences: number;
  experiences: Experience[];
};
