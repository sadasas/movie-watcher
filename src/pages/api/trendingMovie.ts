import axios from "axios";

import { ServerData, ServerResponse } from "@/models/server";

export const getTrendingMovies = async (page: number) => {
  const options = {
    method: "GET",
    url: "https://moviesdatabase.p.rapidapi.com/titles",
    params: { limit: "10", list: "most_pop_movies" },
    headers: {
      "X-RapidAPI-Key": "bcf62e5e45msh2eee34009386b14p199dc3jsn52392703a308",
      "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
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
  const { results } = JSON.parse(data);
  return results;
};
