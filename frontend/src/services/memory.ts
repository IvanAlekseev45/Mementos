import axios from "axios";
import type { Memory, CreatePhoto, UpdateMemoryObj, GetMemoryResponse, SeasonCategory, DateSort } from "../types/memories";

const global_url = "https://mementos-vbpq.onrender.com";

// const devUrl = "http://localhost:3001";

const api = axios.create({
  baseURL: global_url,
});

interface RequestParams {
  query: string;
  seasonsCategory?: SeasonCategory;
  page?: number;
  sortBy?: "date";
  sortOrder?: "asc" | "desc";
}

export const getAllMemories = async (query: string, seasonsCategory?: SeasonCategory, page?: number, dateSort?: DateSort) => {
  const params: RequestParams = {
    query,
    seasonsCategory,
    page,
  };

  if (dateSort) {
    params.sortBy = "date";
    params.sortOrder = dateSort;
  }

  const { data } = await api.get<GetMemoryResponse>("/memories", {
    params,
  });

  return data;
};

export const getMemoryById = async (id: Memory["_id"]) => {
  const { data } = await api.get<Memory>(`/memories/${id}`);
  return data;
};

interface UpdateMemory {
  id?: Memory["_id"];
  body: UpdateMemoryObj;
}

export const updateMemory = async (info: UpdateMemory) => {
  const { data } = await api.patch<Memory>(`/memories/${info.id}`, info.body);
  return data;
};

export const createMemory = async (body: CreatePhoto) => {
  await api.post("/memories", body);
};

export const deleteCardById = async (id: Memory["_id"]) => {
  await api.delete(`/memories/${id}`);
};
