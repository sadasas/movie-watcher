import { ParsedUrlQuery } from "querystring";

export interface ParsedUrlQueryMovie extends ParsedUrlQuery {
  id: string;
  imgUrl: string;
  releaseDate: string;
  titleText: string;
  rating: string;
  description: string;
  cast: string;
}
