import axios from "axios";
import type { Memory, CreatePhoto } from "../types/memories";

const api = axios.create({
  baseURL: "http://localhost:3001",
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
