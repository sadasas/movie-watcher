import { Suspense, lazy } from "react";
import {
  LazyLoadComponent,
  ScrollPosition,
  trackWindowScroll,
} from "react-lazy-load-image-component";

import styles from "@/styles/Home.module.scss";
import { getLatestFilms } from "@/pages/api/film/getLatesFilms";
import { getGenreFilms } from "@/pages/api/film/getGenreFilms";
import { Genre, IMovie, MovieType } from "@/models/movie";
import { BoxType } from "@/models/box";
import ListMoviesLoader from "@/components/loader/ListMoviesLoader";
import { getTypeMovies } from "../api/getTypeMovies";
import PopupTrailer from "@/components/movies/PopupTrailer";
import { useAppSelector } from "@/store/hooks";
import Movies from "@/components/movies/Movies";

function Home({
  trendingMoviesData,
  latesMoviesData,
  comedyMoviesData,
  romanceMoviesData,
  topRatedMoviesData,
  hororMoviesData,
  fantasyMoviesData,
  scrollPosition,
}: {
  trendingMoviesData: IMovie[];
  latesMoviesData: IMovie[];
  comedyMoviesData: IMovie[];
  romanceMoviesData: IMovie[];
  topRatedMoviesData: IMovie[];
  hororMoviesData: IMovie[];
  fantasyMoviesData: IMovie[];
  scrollPosition: ScrollPosition;
}) {
  const popupToggle = useAppSelector((state) => state.reducer.popupTrailer);

  return (
    <section id="films" className={styles["home-container"]}>
      <Movies
        urlBase="/film/trendingFilms"
        urlBaseParams={null}
        title="Trending film"
        movies={trendingMoviesData}
        typeBox={BoxType.Large}
      />

      <Movies
        urlBase="/film/latestFilms"
        urlBaseParams={null}
        title="Latest film"
        movies={latesMoviesData}
        typeBox={BoxType.Small}
      />

      <Movies
        urlBase="/genre/params"
        urlBaseParams={{
          genre: Genre[Genre.Comedy],
          index: Genre["Comedy"],
        }}
        title="Comedy"
        movies={comedyMoviesData}
        typeBox={BoxType.Small}
      />

      <Movies
        urlBase="/genre/params"
        urlBaseParams={{
          genre: Genre[Genre.Romance],
          index: Genre["Romance"],
        }}
        title="Romance"
        movies={romanceMoviesData}
        typeBox={BoxType.Small}
      />

      <Movies
        urlBase="/film/topRatedFilms"
        urlBaseParams={null}
        title="Top Rated"
        movies={topRatedMoviesData}
        typeBox={BoxType.Medium}
      />

      <Movies
        urlBase="/genre/params"
        urlBaseParams={{
          genre: Genre[Genre.Horror],
          index: Genre["Horror"],
        }}
        title="Horror"
        movies={hororMoviesData}
        typeBox={BoxType.Small}
      />

      <Movies
        urlBase="/genre/params"
        urlBaseParams={{
          genre: Genre[Genre.Fantasy],
          index: Genre["Fantasy"],
        }}
        title="Fantasy"
        movies={fantasyMoviesData}
        typeBox={BoxType.Small}
      />

      {popupToggle.isActive && <PopupTrailer />}
    </section>
  );
}

export default trackWindowScroll(Home);

export async function getStaticProps() {
  const { validData: trendingMoviesData } = await getTypeMovies(
    1,
    "most_pop_movies",
    10,
    2005,
    2022,
    "movie"
  );
  const { validData: latesMoviesData } = await getLatestFilms(1, 10);
  const { validData: topRatedMoviesData } = await getTypeMovies(
    1,
    "top_rated_250",
    10,
    2005,
    2022,
    "movie"
  );
  const { validData: comedyMoviesData } = await getGenreFilms(
    1,
    Genre.Comedy,
    10,
    2005,
    2022
  );
  const { validData: romanceMoviesData } = await getGenreFilms(
    1,
    Genre.Romance,
    10,
    2005,
    2022
  );
  const { validData: hororMoviesData } = await getGenreFilms(
    1,
    Genre.Horror,
    10,
    2005,
    2022
  );
  const { validData: fantasyMoviesData } = await getGenreFilms(
    1,
    Genre.Fantasy,
    10,
    2005,
    2022
  );
  return {
    props: {
      trendingMoviesData,
      latesMoviesData,
      comedyMoviesData,
      romanceMoviesData,
      topRatedMoviesData,
      hororMoviesData,
      fantasyMoviesData,
    },
  };
}
