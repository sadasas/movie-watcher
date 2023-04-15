import axios from "axios";

import { IResponseDataMovie } from "@/models/server";
import { Genre } from "@/models/movie";

export const getGenreFilms = async (page: number, genre: string) => {
  const options = {
    method: "GET",
    url: "https://moviesdatabase.p.rapidapi.com/titles",
    params: { page: "1", endYear: "2022", sort: "year.decr", genre: genre },
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST,
    },
  };

  const res = await axios
    .request<void, IResponseDataMovie>(options)
    .catch(function (error) {
      console.error(error);
    });

  if (res == undefined) return null;
  const { data } = res;

  return data.results;
};
