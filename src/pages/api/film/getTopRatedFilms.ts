import { IResponseDataMovie } from "@/models/server";
import { IMovie } from "@/models/movie";
import { movieApi } from "@/pages/api/movieApi";

async function getData(index: number) {
  try {
    const { data } = await movieApi.get<IResponseDataMovie>("/titles", {
      params: {
        limit: "50",
        info: "base_info",
        sort: "year.decr",
        page: index,
        list: "top_rated_250",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getTopRatedFilms(page: number, length: number) {
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
