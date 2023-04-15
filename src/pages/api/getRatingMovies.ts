import axios from "axios";

import { IResponseDataRating } from "@/models/server";

export const getRatingMovies = async (id: string) => {
  const options = {
    method: "GET",
    url: "https://moviesdatabase.p.rapidapi.com/titles/tt0000002/ratings",
    headers: {
      "X-RapidAPI-Key": "bcf62e5e45msh2eee34009386b14p199dc3jsn52392703a308",
      "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
    },
  };
  const res = await axios
    .request<void, IResponseDataRating>(options)
    .catch(function (error) {
      console.error(error);
    });

  if (res == undefined) return null;

  const { data } = res;
  return data.results;
};
