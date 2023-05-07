import { IResponseDataMovie } from "@/models/server";
import { IMovie } from "@/models/movie";
import { movieApi } from "@/pages/api/movieApi";

async function getData(
  index: number,
  list: string,
  limit: number,
  startYear: number,
  endYear: number,
  titleType: string
) {
  try {
    const { data } = await movieApi.get<IResponseDataMovie>("/titles", {
      params: {
        limit: limit,
        startYear: startYear,
        info: "base_info",
        endYear: endYear,
        sort: "year.decr",
        page: index,
        list: list,
        titleType: titleType,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getTypeMovies(
  page: number,
  list: string,
  length: number,
  startYear: number,
  endYear: number,
  titleType: string
) {
  let validData: IMovie[] = [];
  let nextPage = page;
  let isNext = true;

  while (validData.length < length && isNext) {
    const data = await getData(
      nextPage,
      list,
      length,
      startYear,
      endYear,
      titleType
    );

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
  if (validData.length > length) validData = validData.slice(0, length);
  return { validData, hasNextItems: isNext };
}
