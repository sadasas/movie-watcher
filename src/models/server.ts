import { ICast, IMovie, IRating } from "./movie";

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

export interface IResponseDataCast {
  data: IDataCast;
  status: number;
  statusText: string;
}

interface IDataCast {
  entries: number;
  results: [{ id: string; cast: { edges: ICast[]; __typename: string } }];
}

interface IDataMovies {
  entries: number;
  next: number;
  results: IMovie[];
}
