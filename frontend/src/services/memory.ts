import axios from "axios";
import type { Memory, CreatePhoto } from "../types/memories";

const api = axios.create({
  baseURL: "https://mementos-vbpq.onrender.com",
});

export const getAllMemories = async (query: string) => {
  const params = {
    query,
  };
  const { data } = await api.get<Memory[]>("", { params });

  return data;
};

export const createMemory = async (body: CreatePhoto) => {
  await api.post("", body);
};

export const deleteCardById = async (id: Memory["_id"]) => {
  await api.delete(`/${id}`);
};
