import axios from "axios";

import { IResponseDataMovie } from "@/models/server";
import { Genre, IMovie } from "@/models/movie";

async function getData(index: number, genre: Genre) {
  const options = {
    method: "GET",
    url: "https://moviesdatabase.p.rapidapi.com/titles",
    params: {
      genre: Genre[genre],
      limit: "50",
      startYear: "2022",
      info: "base_info",
      endYear: "2023",
      sort: "year.decr",
      titleType: "tvSeries",
      page: index,
    },
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

export const getGenreSeries = async (index: number, genre: Genre) => {
  let validData: IMovie[] = [];
  let nextPage = index;
  let isNext = true;

  while (validData.length < 10 && isNext) {
    const data = await getData(nextPage, genre);

    validData = validData.concat(
      data!.results.filter(
        (movie) =>
          movie.primaryImage != null &&
          movie.plot != null &&
          movie.plot.plotText != null &&
          movie.releaseDate != null &&
          movie.releaseDate.day != null &&
          movie.releaseDate.month != null
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
