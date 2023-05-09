import { useEffect } from "react";
import { useInfiniteQuery } from "react-query";

import { IMovie } from "@/models/movie";
import styles from "@/styles/GenreMovie.module.scss";
import CircleLoader from "@/components/loader/CircleLoader";
import { getLatestSeries } from "../api/series/getLatestSeries";
import PopupTrailer from "@/components/movies/PopupTrailer";
import { useAppSelector } from "@/store/hooks";
import ScrollableListMovies, {
  ScrollableItemProccess,
} from "@/components/movies/ScrollableListMovies";

function LatestSeries() {
  const { data, error, fetchNextPage, status } = useInfiniteQuery({
    queryKey: ["latestSeries"],
    queryFn: ({ pageParam = 1 }) => getLatestSeries(pageParam, 20),
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

    return getDataMovieHandler(startIndex, stopIndex, page);
  };

  const getDataMovieHandler = async (
    startIndex: number,
    stopIndex: number,
    index: number
  ) => {
    for (let index = startIndex; index <= stopIndex; index++) {
      itemStatusMap[index] = ScrollableItemProccess.LOADING;
    }
    await fetchNextPage({ pageParam: index });
    if (status === "success") {
      for (let index = startIndex; index <= stopIndex; index++) {
        itemStatusMap[index] = ScrollableItemProccess.LOADED;
      }
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
    if (data?.pages.length! > 0) return;

    loadMoreItems(0, 19);
  }, []);

  return (
    <section id="latest-series" className="container">
      <main className={styles["genre-movie-container"]}>
        <h2>Latest</h2>

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

export default LatestSeries;
