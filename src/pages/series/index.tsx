import { Suspense, lazy } from "react";
import {
  LazyLoadComponent,
  ScrollPosition,
  trackWindowScroll,
} from "react-lazy-load-image-component";

import styles from "@/styles/Home.module.scss";
import { getLatestSeries } from "../api/series/getLatestSeries";
import { getGenreSeries } from "../api/series/getGenreSeries";
import { Genre, IMovie } from "@/models/movie";
import { BoxType } from "@/models/box";
import ListMoviesLoader from "@/components/loader/ListMoviesLoader";
import { getTypeMovies } from "../api/getTypeMovies";
import PopupTrailer from "@/components/movies/PopupTrailer";
import { useAppSelector } from "@/store/hooks";
import Movies from "@/components/movies/Movies";

function Series({
  trendingMoviesData,
  latesMoviesData,
  dramaMoviesData,
  familyMoviesData,
  animationMoviesData,
  documentaryMoviesData,
  scrollPosition,
}: {
  trendingMoviesData: IMovie[];
  latesMoviesData: IMovie[];
  dramaMoviesData: IMovie[];
  familyMoviesData: IMovie[];
  animationMoviesData: IMovie[];
  documentaryMoviesData: IMovie[];
  scrollPosition: ScrollPosition;
}) {
  const popupToggle = useAppSelector((state) => state.reducer.popupTrailer);

  return (
    <section id="series" className={styles["home-container"]}>
      <Movies
        urlBase="/series/trendingSeries"
        urlBaseParams={null}
        title="Trending series"
        movies={trendingMoviesData}
        typeBox={BoxType.Large}
      />

      <Movies
        urlBase="/genre/params"
        urlBaseParams={{
          genre: Genre[Genre.Drama],
          index: Genre["Drama"],
        }}
        title="Drama series"
        movies={dramaMoviesData}
        typeBox={BoxType.Small}
      />

      <Movies
        urlBase="/genre/params"
        urlBaseParams={{
          genre: Genre[Genre.Family],
          index: Genre["Family"],
        }}
        title="Family series"
        movies={familyMoviesData}
        typeBox={BoxType.Small}
      />

      <Movies
        urlBase="/series/latestSeries"
        urlBaseParams={null}
        title="Lates series"
        movies={latesMoviesData}
        typeBox={BoxType.Medium}
      />

      <Movies
        urlBase="/genre/params"
        urlBaseParams={{
          genre: Genre[Genre.Animation],
          index: Genre["Animation"],
        }}
        title="Animation series"
        movies={animationMoviesData}
        typeBox={BoxType.Small}
      />

      <Movies
        urlBase="/genre/params"
        urlBaseParams={{
          genre: Genre[Genre.Documentary],
          index: Genre["Documentary"],
        }}
        title="Documentary"
        movies={documentaryMoviesData}
        typeBox={BoxType.Small}
      />

      {popupToggle.isActive && <PopupTrailer />}
    </section>
  );
}

export default trackWindowScroll(Series);

export async function getStaticProps() {
  const { validData: trendingMoviesData } = await getTypeMovies(
    1,
    "most_pop_series",
    10,
    2005,
    2022,
    "tvSeries"
  );
  const { validData: latesMoviesData } = await getLatestSeries(1, 10);
  const { validData: dramaMoviesData } = await getGenreSeries(
    1,
    Genre.Drama,
    10,
    2005,
    2022
  );
  const { validData: familyMoviesData } = await getGenreSeries(
    1,
    Genre.Family,
    10,
    2005,
    2022
  );
  const { validData: animationMoviesData } = await getGenreSeries(
    1,
    Genre.Animation,
    10,
    2005,
    2022
  );
  const { validData: documentaryMoviesData } = await getGenreSeries(
    1,
    Genre.Documentary,
    10,
    2005,
    2022
  );
  return {
    props: {
      trendingMoviesData,
      latesMoviesData,
      dramaMoviesData,
      familyMoviesData,
      animationMoviesData,
      documentaryMoviesData,
    },
  };
}
