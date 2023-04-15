import axios from "axios";

import { IResponseDataCast } from "@/models/server";

export const getMainActors = async (id: string) => {
  const options = {
    method: "GET",
    url: "https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids",
    headers: {
      "X-RapidAPI-Key": "bcf62e5e45msh2eee34009386b14p199dc3jsn52392703a308",
      "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
    },

    params: { idsList: id, info: "extendedCast" },
  };

  const res = await axios
    .request<void, IResponseDataCast>(options)
    .catch(function (error) {
      console.error(error);
    });

  if (res == undefined) return null;
  const { data } = res;

  return data.results[0].cast.edges;
};
