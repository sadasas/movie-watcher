import { IResponseDataMovie } from "@/models/server";
import { Genre, IMovie } from "@/models/movie";
import { movieApi } from "@/pages/api/movieApi";

async function getData(index: number, genre: Genre, length: number) {
  try {
    const { data } = await movieApi.get<IResponseDataMovie>("/titles", {
      params: {
        genre: Genre[genre],
        limit: length,
        startYear: "2005",
        info: "base_info",
        endYear: "2022",
        sort: "year.decr",
        titleType: "tvSeries",
        page: index,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getGenreSeries(
  index: number,
  genre: Genre,
  length: number
) {
  let validData: IMovie[] = [];
  let nextPage = index;
  let isNext = true;

  while (validData.length < 10 && isNext) {
    const data = await getData(nextPage, genre, length);

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
