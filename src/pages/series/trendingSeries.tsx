import { useEffect, useState } from "react";
import { FixedSizeGrid as Grid, GridChildComponentProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import { useInfiniteQuery } from "react-query";

import { IMovie } from "@/models/movie";
import styles from "@/styles/GenreMovie.module.scss";
import CircleLoader from "@/components/loader/CircleLoader";
import { getTypeMovies } from "../api/getTypeMovies";
import { useAppSelector } from "@/store/hooks";
import PopupTrailer from "@/components/movies/PopupTrailer";
import ScrollableListMovies, {
  ScrollableItemProccess,
} from "@/components/movies/ScrollableListMovies";

function TrendingSeries() {
  const { data, error, fetchNextPage, status } = useInfiniteQuery({
    queryKey: ["trendingSeries"],
    queryFn: ({ pageParam = 1 }) =>
      getTypeMovies(pageParam, "most_pop_series", 20, 2005, 2022, "tvSeries"),
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
      itemStatusMap[index] = ScrollableItemProccess.LOADING;
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
    loadMoreItems(0, 0);
  }, []);

  return (
    <section id="trending-series" className="container">
      <main className={styles["genre-movie-container"]}>
        <h2>Trending</h2>

        {data?.pages && data.pages.length > 0 ? (
          <ScrollableListMovies
            dataF={mergeAlldata}
            loadMoreItems={loadMoreItems}
            isItemLoaded={isItemLoaded}
            itemStatusMap={itemStatusMap}
          />
        ) : (
          <CircleLoader />
        )}
      </main>
      {popupToggle.isActive && <PopupTrailer />}
    </section>
  );
}

export default TrendingSeries;
