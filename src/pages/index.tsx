import { Suspense, lazy, useEffect } from "react";
import {
  LazyLoadComponent,
  ScrollPosition,
  trackWindowScroll,
} from "react-lazy-load-image-component";

import styles from "@/styles/Home.module.scss";
import { getGenreMovies } from "@/pages/api/getGenreMovies";
import { Genre, IMovie } from "@/models/movie";
import { BoxType } from "@/models/box";
import { getTypeMovies } from "./api/getTypeMovies";
import { getLatestMovies } from "./api/getLatestMovies";
import PopupTrailer from "@/components/movies/PopupTrailer";
import { useAppSelector } from "@/store/hooks";
import Movies from "@/components/movies/Movies";
import Banner from "@/components/movies/Banner";

function Home({
  bannerMoviesData,
  topRatedMoviesData,
  latestMoviesData,
  actionMoviesData,
  adventureMoviesData,
  comedyMoviesData,
  scrollPosition,
}: {
  bannerMoviesData: IMovie[];
  topRatedMoviesData: IMovie[];
  latestMoviesData: IMovie[];
  actionMoviesData: IMovie[];
  adventureMoviesData: IMovie[];
  comedyMoviesData: IMovie[];
  scrollPosition: ScrollPosition;
}) {
  const popupToggle = useAppSelector((state) => state.reducer.popupTrailer);

  return (
    <section id="home" className={styles["home-container"]}>
      <Banner title="" movies={bannerMoviesData} />

      <Movies
        urlBase="/series/topRatedSeries"
        urlBaseParams={null}
        title="Top rated series"
        movies={topRatedMoviesData}
        typeBox={BoxType.Medium}
      />

      <Movies
        urlBase="/genre/params"
        urlBaseParams={{
          genre: Genre[Genre.Action],
          index: Genre["Action"],
        }}
        title="Action"
        movies={actionMoviesData}
        typeBox={BoxType.Small}
      />

      <Movies
        urlBase="/genre/params"
        urlBaseParams={{
          genre: Genre[Genre.Adventure],
          index: Genre["Adventure"],
        }}
        title="Adventure"
        movies={adventureMoviesData}
        typeBox={BoxType.Small}
      />

      <Movies
        urlBase="/film/latestFilms"
        urlBaseParams={null}
        title="Latest"
        movies={latestMoviesData}
        typeBox={BoxType.Medium}
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

      {popupToggle.isActive && <PopupTrailer />}
    </section>
  );
}

export default trackWindowScroll(Home);

export async function getStaticProps() {
  const { validData: bannerMoviesData } = await getTypeMovies(
    1,
    "top_boxoffice_200",
    10,
    2005,
    2022,
    "movie"
  );
  const { validData: topRatedMoviesData } = await getTypeMovies(
    1,
    "top_rated_series_250",
    10,
    2005,
    2022,
    "tvSeries"
  );
  const { validData: latestMoviesData } = await getLatestMovies(1, 10);
  const { validData: actionMoviesData } = await getGenreMovies(
    1,
    Genre.Action,
    10,
    2005,
    2022
  );
  const { validData: adventureMoviesData } = await getGenreMovies(
    1,
    Genre.Adventure,
    10,
    2005,
    2022
  );
  const { validData: comedyMoviesData } = await getGenreMovies(
    1,
    Genre.Comedy,
    10,
    2005,
    2022
  );
  return {
    props: {
      bannerMoviesData,
      topRatedMoviesData,
      latestMoviesData,
      actionMoviesData,
      adventureMoviesData,
      comedyMoviesData,
    },
  };
}
