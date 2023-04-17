import { IResponseDataMovie } from "@/models/server";
import { Genre, IMovie } from "@/models/movie";
import { movieApi } from "@/pages/api/movieApi";

async function getData(index: number, genre: Genre) {
  try {
    const { data } = await movieApi.get<IResponseDataMovie>("/titles", {
      params: {
        genre: Genre[genre],
        limit: "50",
        startYear: "2022",
        info: "base_info",
        endYear: "2023",
        sort: "year.decr",
        titleType: "movie",
        page: index,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getGenreFilms(index: number, genre: Genre) {
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
}
