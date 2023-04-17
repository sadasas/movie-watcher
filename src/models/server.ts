import { ICast, ICreator, IMovie, IRating } from "./movie";

export interface IResponseDataMovie {
  entries: number;
  next: number;
  results: IMovie[];
}

export interface IResponseDataCast {
  entries: number;
  results: [{ id: string; cast: { edges: ICast[]; __typename: string } }];
}

export interface IResponseDataCreator {
  entries: number;
  results: ICreator[];
}
