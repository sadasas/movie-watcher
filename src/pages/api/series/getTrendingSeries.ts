import axios from "axios";

import { IResponseDataMovie } from "@/models/server";
import { IMovie } from "@/models/movie";

async function getData(index: number) {
  const options = {
    method: "GET",
    url: "https://moviesdatabase.p.rapidapi.com/titles",
    params: { info: "base_info", limit: "50", list: "most_pop_series" },
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

  return data;
}

export const getTrendingSeries = async (page: number) => {
  let validData: IMovie[] = [];
  let nextPage = page;
  let isNext = true;
  while (validData.length < 10 && isNext) {
    const data = await getData(nextPage);

    validData = validData.concat(
      data!.results.filter(
        (movie) =>
          movie.primaryImage != null &&
          movie.plot != null &&
          movie.plot.plotText != null
      )
    );
    isNext =
      data?.next != null || data?.next != "" || data.next != undefined
        ? true
        : false;
    nextPage++;
  }

  return validData;
};
