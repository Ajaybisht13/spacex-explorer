import axios from "axios";
import { Launch, Launchpad, PaginatedResponse } from "../types";

const api = axios.create({ baseURL: "https://api.spacexdata.com" });

export const getLaunches = async (
  page = 1,
  limit = 10
): Promise<PaginatedResponse<Launch>> => {
  const res = await api.post("/v5/launches/query", {
    query: {},
    options: { page, limit, sort: { date_utc: "desc" } },
  });
  return res.data;
};

export const getLaunchpad = async (id: string): Promise<Launchpad> => {
  const res = await api.get(`/v4/launchpads/${id}`);
  return res.data;
};
