import axios from "axios";

import { IResponseDataMovie } from "@/models/server";

export const getTrendingSeries = async (page: number) => {
  const options = {
    method: "GET",
    url: "https://moviesdatabase.p.rapidapi.com/titles",
    params: { limit: "10", list: "most_pop_series" },
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
