import { IMovie } from "@/models/movie";
import { useAppSelector } from "@/store/hooks";

export default function IsMovieBookmarked(movie: IMovie) {
  const movies = useAppSelector((state) => state.bookmark.value);
  let isSame = false;
  movies.forEach((m) => {
    if (m.id === movie.id) {
      isSame = true;
    }
  });

  return isSame;
}
