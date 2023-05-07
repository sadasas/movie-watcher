import { useEffect, useState } from "react";
import {
  ScrollPosition,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import dynamic from "next/dynamic";
import { FixedSizeGrid as Grid, GridChildComponentProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import { useInfiniteQuery } from "react-query";

import { IMovie } from "@/models/movie";
import styles from "@/styles/GenreMovie.module.scss";
import { BoxType } from "@/models/box";
import MovieBoxLoader from "@/components/loader/MovieBoxLoader";
import CircleLoader from "@/components/loader/CircleLoader";
import { getTypeMovies } from "../api/getTypeMovies";

const MoviesBox = dynamic(() => import("@/components/movies/MoviesBox"), {
  loading: () => <MovieBoxLoader row={1} column={1} width={150} />,
});

let itemStatusMap: number[] = [];
const LOADING = 1;
const LOADED = 2;

const Cell = ({
  data,
  columnIndex,
  rowIndex,
  style,
}: GridChildComponentProps) => {
  const {
    movies,
    scrollPosition,
    columnCount,
    cellGap,
    widthBorder,
  }: {
    movies: IMovie[];
    scrollPosition: ScrollPosition;
    columnCount: number;
    cellGap: number;
    widthBorder: number;
  } = data;

  const currentIndex = rowIndex * columnCount + columnIndex;

  const gapStyle = {
    ...style,
    left:
      columnIndex === 0
        ? widthBorder > 0
          ? Number(style.left) + Math.floor(widthBorder / 2)
          : style.left
        : widthBorder > 0
        ? Number(style.left) +
          columnIndex * cellGap +
          Math.floor(widthBorder / 2)
        : Number(style.left) + columnIndex * cellGap,
    right: columnIndex === columnCount ? style.right : columnIndex * cellGap,
    top: rowIndex === 0 ? style.top : Number(style.top) + rowIndex * cellGap,
  };
  return (
    <div className={styles["box"]} style={gapStyle}>
      {itemStatusMap[currentIndex] === LOADING ? (
        <MovieBoxLoader row={1} column={1} width={150} />
      ) : (
        <MoviesBox
          scrollPosition={scrollPosition}
          movie={movies[currentIndex]}
          boxType={BoxType.Small}
        />
      )}
    </div>
  );
};

function TopRatedSeries({
  scrollPosition,
}: {
  scrollPosition: ScrollPosition;
}) {
  const { data, error, fetchNextPage, status } = useInfiniteQuery({
    queryKey: ["topRatedSeries"],
    queryFn: ({ pageParam = 1 }) =>
      getTypeMovies(
        pageParam,
        "top_rated_series_250",
        20,
        2005,
        2022,
        "tvSeries"
      ),
    enabled: false,
    staleTime: Infinity,
    keepPreviousData: true,
    cacheTime: Infinity,
  });

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
      itemStatusMap[index] = LOADING;
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
      itemStatusMap[index] = LOADED;
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
    console.log("first");
    loadMoreItems(0, 0);
  }, []);

  return (
    <section id="top-rated-series" className="container">
      <main className={styles["genre-movie-container"]}>
        <h2>Top Rated</h2>

        {data?.pages && data.pages.length > 0 ? (
          <AutoSizer>
            {({ height, width }) => {
              let columnCount = 2;
              let rowCount: number;
              let itemHeigth = 135;
              let itemWidth = 100;
              const cellGap = 10;
              let widthBorder: number;
              let movies = mergeAlldata();
              if (width! > 378 && width! <= 430) {
                itemHeigth = 135;
                itemWidth = 100;
              } else if (width! > 430 && width! <= 480) {
                itemHeigth = 135;
                itemWidth = 100;
              } else if (width! > 480 && width! <= 630) {
                itemHeigth = 195;
                itemWidth = 150;
              } else if (width! > 630 && width! <= 790) {
                itemHeigth = 195;
                itemWidth = 150;
              } else if (width! > 790 && width! <= 961) {
                itemHeigth = 195;
                itemWidth = 150;
                columnCount = 5;
              } else if (width! > 961) {
                itemHeigth = 195;
                itemWidth = 150;
              }
              const count = Math.floor(width! / (itemWidth + cellGap));
              columnCount = count > movies.length ? movies.length : count;

              rowCount = movies.length / columnCount;
              widthBorder = Math.floor(
                width! - (columnCount * itemWidth + (columnCount - 1) * cellGap)
              );
              return (
                <InfiniteLoader
                  isItemLoaded={isItemLoaded}
                  itemCount={movies.length}
                  loadMoreItems={loadMoreItems}
                >
                  {({ onItemsRendered, ref }: any) => {
                    const newItemsRendered = (gridData: any) => {
                      const useOverscanForLoading = true;
                      const {
                        visibleRowStartIndex,
                        visibleRowStopIndex,
                        visibleColumnStopIndex,
                        overscanRowStartIndex,
                        overscanRowStopIndex,
                        overscanColumnStopIndex,
                      } = gridData;

                      const endCol =
                        (useOverscanForLoading || true
                          ? overscanColumnStopIndex
                          : visibleColumnStopIndex) + 1;

                      const startRow =
                        useOverscanForLoading || true
                          ? overscanRowStartIndex
                          : visibleRowStartIndex;
                      const endRow =
                        useOverscanForLoading || true
                          ? overscanRowStopIndex
                          : visibleRowStopIndex;

                      const visibleStartIndex = startRow * endCol;
                      const visibleStopIndex = endRow * endCol;

                      onItemsRendered({
                        //call onItemsRendered from InfiniteLoader so it can load more if needed
                        visibleStartIndex,
                        visibleStopIndex,
                      });
                    };

                    return (
                      <Grid
                        className={styles["genre-movie-grid-container"]}
                        columnCount={columnCount}
                        columnWidth={itemWidth}
                        height={height!}
                        rowCount={rowCount}
                        rowHeight={itemHeigth}
                        width={width!}
                        onItemsRendered={newItemsRendered}
                        ref={ref}
                        itemData={{
                          scrollPosition: scrollPosition,
                          widthBorder: widthBorder,
                          movies: movies,
                          columnCount: columnCount,
                          cellGap: cellGap,
                        }}
                      >
                        {Cell}
                      </Grid>
                    );
                  }}
                </InfiniteLoader>
              );
            }}
          </AutoSizer>
        ) : (
          <CircleLoader />
        )}
      </main>
    </section>
  );
}

export default trackWindowScroll(TopRatedSeries);
