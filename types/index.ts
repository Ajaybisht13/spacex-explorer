export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  success: boolean | null;
  links: {
    patch: { small: string | null };
  };
  launchpad: string;
}

export interface Launchpad {
  id: string;
  name: string;
  locality: string;
  region: string;
  latitude: number;
  longitude: number;
}

export interface PaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}