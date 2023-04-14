import axios from "axios";

import { ResponseDataMovie, ServerData, ServerResponse } from "@/models/server";
import { Movie } from "@/models/movie";

export const getUpcomingFilms = async (page: number) => {
  const options = {
    method: "GET",
    url: "https://moviesdatabase.p.rapidapi.com/titles/x/upcoming",
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST,
    },
    transformResponse: (r: ServerResponse) => r,
  };

  const res = await axios
    .request<void, ServerData>(options)
    .catch(function (error) {
      console.error(error);
    });

  if (res == undefined) return null;

  const { data } = res as ServerData;

  const result = JSON.parse(data) as ResponseDataMovie;
  const movies = result.results as Movie[];

  return movies;
};
