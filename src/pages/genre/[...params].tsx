import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";

import { Genre, Genre as genreType, IMovie } from "@/models/movie";
import { getGenreMovies } from "@/pages/api/getGenreMovies";
import styles from "@/styles/GenreMovie.module.scss";
import { IParsedUrlQueryGenre, IParsedUrlQueryTypeMovie } from "@/models/route";
import CircleLoader from "@/components/loader/CircleLoader";
import PopupTrailer from "@/components/movies/PopupTrailer";
import { useAppSelector } from "@/store/hooks";
import ScrollableListMovies, {
  ScrollableItemProccess,
} from "@/components/movies/ScrollableListMovies";

function GenreMovie() {
  const router = useRouter();
  const [genre, setGenre] = useState<Genre | null>(null);
  const { data, error, fetchNextPage, status } = useInfiniteQuery({
    queryKey: [genre],
    queryFn: ({ pageParam = 1 }) =>
      getGenreMovies(pageParam, genre!, 20, 2005, 2022),
    enabled: false,
    staleTime: Infinity,
    keepPreviousData: true,
    cacheTime: Infinity,
  });

  const popupToggle = useAppSelector((state) => state.reducer.popupTrailer);
  let itemStatusMap: ScrollableItemProccess[] = [];

  const isItemLoaded = (index: number) => !!itemStatusMap[index];
  const loadMoreItems = (startIndex: number, stopIndex: number) => {
    const page: number = data?.pages.length! > 0 ? data?.pages.length! + 1 : 1;
    if (
      data &&
      data.pages.length > 0 &&
      !data.pages[data.pages.length - 1].hasNextItems
    )
      return;
    for (let index = startIndex; index <= stopIndex; index++) {
      itemStatusMap[index] = ScrollableItemProccess.LOADING;
    }
    return getDataMovieHandler(startIndex, stopIndex, page);
  };

  const getDataMovieHandler = async (
    startIndex: number,
    stopIndex: number,
    index: number
  ) => {
    await fetchNextPage({ pageParam: index });

    for (let index = startIndex; index <= stopIndex; index++) {
      itemStatusMap[index] = ScrollableItemProccess.LOADED;
    }
  };

  const mergeAlldata = () => {
    let movies: IMovie[] = [];
    data?.pages.forEach((page) => {
      movies.push(...page.validData);
    });

    return movies;
  };

  useEffect(() => {
    if (router.isReady) {
      const dataQuery = router.query as IParsedUrlQueryTypeMovie;
      const genreQuery = JSON.parse(dataQuery.data) as IParsedUrlQueryGenre;
      setGenre(Number(genreQuery.index) as genreType);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (genre != null) loadMoreItems(0, 0);
  }, [genre]);

  return (
    <section id="genre" className="container">
      <main className={styles["genre-movie-container"]}>
        <h2>{Genre[genre!]}</h2>
        {data?.pages && data.pages.length > 0 ? (
          <ScrollableListMovies
            dataF={mergeAlldata}
            loadMoreItems={loadMoreItems}
            isItemLoaded={isItemLoaded}
            itemStatusMap={itemStatusMap}
            hasNextItems={data.pages[data.pages.length - 1].hasNextItems}
          />
        ) : (
          <CircleLoader />
        )}
      </main>
      {popupToggle.isActive && <PopupTrailer />}
    </section>
  );
}

export default GenreMovie;
