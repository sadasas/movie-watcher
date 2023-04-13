import { Movie } from "./movie";

export interface ServerResponse {
  data: string;
  status: number;
  statusText: string;
}

export interface ServerData {
  data: string;
  status: number;
  statusText: string;
}

export interface ResponseDataMovie {
  entries: number;
  next: string;
  results: Movie[];
}
