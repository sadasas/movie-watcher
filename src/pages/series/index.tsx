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
const Movies = lazy(() => import("@/components/movies/Movies"));

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
  return (
    <section id="series" className={styles["home-container"]}>
      <LazyLoadComponent
        scrollPosition={scrollPosition}
        placeholder={<ListMoviesLoader row={1} column={2} width={900} />}
      >
        <Suspense
          fallback={<ListMoviesLoader row={1} column={2} width={900} />}
        >
          <Movies
            urlBase="/series/trendingSeries"
            urlBaseParams={null}
            title="Trending series"
            movies={trendingMoviesData}
            typeBox={BoxType.Large}
          />
        </Suspense>
      </LazyLoadComponent>
      <LazyLoadComponent
        scrollPosition={scrollPosition}
        placeholder={<ListMoviesLoader row={1} column={5} width={900} />}
      >
        <Suspense
          fallback={<ListMoviesLoader row={1} column={5} width={900} />}
        >
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
        </Suspense>
      </LazyLoadComponent>
      <LazyLoadComponent
        scrollPosition={scrollPosition}
        placeholder={<ListMoviesLoader row={1} column={5} width={900} />}
      >
        <Suspense
          fallback={<ListMoviesLoader row={1} column={5} width={900} />}
        >
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
        </Suspense>
      </LazyLoadComponent>
      <LazyLoadComponent
        scrollPosition={scrollPosition}
        placeholder={<ListMoviesLoader row={1} column={3} width={900} />}
      >
        <Suspense
          fallback={<ListMoviesLoader row={1} column={3} width={900} />}
        >
          <Movies
            urlBase="/series/latestSeries"
            urlBaseParams={null}
            title="Lates series"
            movies={latesMoviesData}
            typeBox={BoxType.Medium}
          />
        </Suspense>
      </LazyLoadComponent>
      <LazyLoadComponent
        scrollPosition={scrollPosition}
        placeholder={<ListMoviesLoader row={1} column={5} width={900} />}
      >
        <Suspense
          fallback={<ListMoviesLoader row={1} column={5} width={900} />}
        >
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
        </Suspense>
      </LazyLoadComponent>
      <LazyLoadComponent
        scrollPosition={scrollPosition}
        placeholder={<ListMoviesLoader row={1} column={5} width={900} />}
      >
        <Suspense
          fallback={<ListMoviesLoader row={1} column={5} width={900} />}
        >
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
        </Suspense>
      </LazyLoadComponent>
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
