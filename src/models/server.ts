import { IMovie, IRating } from "./movie";

interface IDataRating {
  results: IRating;
}

export interface IResponseDataRating {
  data: IDataRating;
  status: number;
  statusText: string;
}

export interface IResponseDataMovie {
  data: IDataMovies;
  status: number;
  statusText: string;
}
interface IDataMovies {
  entries: number;
  next: string;
  results: IMovie[];
}
