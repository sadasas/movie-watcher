import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";
import {
  ScrollPosition,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import { FixedSizeGrid as Grid, GridChildComponentProps } from "react-window";
import dynamic from "next/dynamic";

import styles from "@/styles/GenreMovie.module.scss";
import MovieBoxLoader from "../loader/MovieBoxLoader";
import { IMovie } from "@/models/movie";
import { BoxType } from "@/models/box";
const MoviesBox = dynamic(() => import("@/components/movies/MoviesBox"), {
  loading: () => <MovieBoxLoader row={1} column={1} width={150} />,
});

export enum ScrollableItemProccess {
  LOADING,
  LOADED,
}

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
    itemStatusMap,
    hasNextItems,
    rowCount,
  }: {
    rowCount: number;
    hasNextItems: boolean;
    movies: IMovie[];
    scrollPosition: ScrollPosition;
    columnCount: number;
    cellGap: number;
    widthBorder: number;
    itemStatusMap: ScrollableItemProccess[];
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
      {rowIndex == rowCount - 1 && hasNextItems ? (
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

function ScrollableListMovies({
  dataF,
  hasNextItems,
  isItemLoaded,
  loadMoreItems,
  scrollPosition,
  itemStatusMap,
}: {
  hasNextItems: boolean;
  dataF: () => IMovie[];
  isItemLoaded: (index: number) => boolean;
  loadMoreItems: (
    startIndex: number,
    stopIndex: number
  ) => void | Promise<void>;
  scrollPosition: ScrollPosition;
  itemStatusMap: ScrollableItemProccess[];
}) {
  return (
    <AutoSizer>
      {({ height, width }) => {
        let columnCount = 2;
        let rowCount: number = 0;
        let itemHeigth = 135;
        let itemWidth = 100;
        const cellGap = 10;
        let widthBorder: number;
        let movies = dataF();
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
                  overscanRowCount={1}
                  onItemsRendered={newItemsRendered}
                  ref={ref}
                  itemData={{
                    hasNextItems: hasNextItems,
                    scrollPosition: scrollPosition,
                    widthBorder: widthBorder,
                    movies: movies,
                    columnCount: columnCount,
                    cellGap: cellGap,
                    itemStatusMap: itemStatusMap,
                    rowCount: rowCount,
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
  );
}

export default trackWindowScroll(ScrollableListMovies);
