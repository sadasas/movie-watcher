import { ParsedUrlQuery } from "querystring";

export interface IParsedUrlQueryMovie extends ParsedUrlQuery {
  movie: string;
}

export interface IParsedUrlQueryTypeMovie extends ParsedUrlQuery {
  data: string;
}
export interface IParsedUrlQueryGenre extends ParsedUrlQuery {
  genre: string;
  index: string;
}
