export type QueryOption = {
  page: string;
  limit: string;
  title?: string;
  price?: string;
  categoriesId?: string;
  destinationsId?: string;
  rating?: string;
  date?: string;
  guests?: string;
  isActivity?: boolean;
  sortBy: string;
  order: "asc" | "desc";
};
