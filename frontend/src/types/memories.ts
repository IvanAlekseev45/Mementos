export interface Season {
  _id: string;
  season: string;
  createdAt: string;
  updatedAt: string;
}

export interface SeasonCount {
  count: number;
  season: string;
}

export interface Memory {
  _id: string;
  image?: string;
  title: string;
  description: string;
  location: string;
  date: string;
  season: Season;
}

export interface GetMemoryResponse {
  page: number;
  totalPages: number;
  totalItems: number;
  filterItems: number;
  perPage: number;
  seasonCounts: SeasonCount[];
  memories: Memory[];
}

export interface CreatePhoto {
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
}

export interface UpdateMemoryObj {
  title?: string;
  description?: string;
  location?: string;
  date?: string;
}

export interface ApiValidationError {
  statusCode: number;
  error: string;
  message: string;
  validation: {
    body: {
      source: string;
      keys: string[];
      message: string;
    };
  };
}

export type SeasonCategory = "spring" | "summer" | "autumn" | "winter" | "";

export type DateSort = "" | "asc" | "desc";
