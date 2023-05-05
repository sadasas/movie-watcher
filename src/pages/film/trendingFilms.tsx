import { useEffect, useState } from "react";
import {
  ScrollPosition,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import dynamic from "next/dynamic";
import { FixedSizeGrid as Grid, GridChildComponentProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";

import { IMovie } from "@/models/movie";
import styles from "@/styles/GenreMovie.module.scss";
import { BoxType } from "@/models/box";
import MovieBoxLoader from "@/components/loader/MovieBoxLoader";
import { getTrendingFilms } from "../api/film/getTrendingFilms";
import CircleLoader from "@/components/loader/CircleLoader";
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
    right:
      columnIndex === columnCount
        ? style.right
        : Number(style.right) + columnIndex * cellGap,
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

function TrendingFilm({ scrollPosition }: { scrollPosition: ScrollPosition }) {
  const [movies, setMovies] = useState<IMovie[]>();

  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextItems, setHasNextItems] = useState(true);

  const isItemLoaded = (index: number) => !!itemStatusMap[index];
  const loadMoreItems = (startIndex: number, stopIndex: number) => {
    for (let index = startIndex; index <= stopIndex; index++) {
      itemStatusMap[index] = LOADING;
    }
    return getDataMovieHandler(startIndex, stopIndex, currentPage, 12);
  };

  const getDataMovieHandler = async (
    startIndex: number,
    stopIndex: number,
    index: number,
    length: number
  ) => {
    const { validData, hasNextItems } = await getTrendingFilms(index, length);
    if (movies) setMovies([...movies!, ...validData]);
    else setMovies(validData);
    setHasNextItems(hasNextItems);
    setCurrentPage((i) => i + 1);
    for (let index = startIndex; index <= stopIndex; index++) {
      itemStatusMap[index] = LOADED;
    }
  };

  useEffect(() => {
    if (hasNextItems) {
      setCurrentPage((i) => i + 1);
      getDataMovieHandler(0, 0, currentPage, 12);
    }
  }, []);

  return (
    <section id="trending-film" className="container">
      <main className={styles["genre-movie-container"]}>
        <h2>Trending</h2>

        {movies && movies.length > 0 ? (
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
                <AutoSizer>
                  {({ height, width }) => {
                    let columnCount = 2;
                    let rowCount: number;
                    let itemHeigth = 135;
                    let itemWidth = 100;
                    const cellGap = 10;
                    let widthBorder: number;

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
                      width! -
                        (columnCount * itemWidth + (columnCount - 1) * cellGap)
                    );

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
                </AutoSizer>
              );
            }}
          </InfiniteLoader>
        ) : (
          <CircleLoader />
        )}
      </main>
    </section>
  );
}

export default trackWindowScroll(TrendingFilm);
