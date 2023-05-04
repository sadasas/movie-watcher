import { Suspense, lazy } from "react";
import {
  LazyLoadComponent,
  ScrollPosition,
  trackWindowScroll,
} from "react-lazy-load-image-component";

import styles from "@/styles/Home.module.scss";
import { getTopRatedFilms } from "./api/film/getTopRatedFilms";
import { getTopRatedSeries } from "@/pages/api/series/getTopRatedSeries";
import { getLatestMovies } from "@/pages/api/getLatestMovies";
import { getGenreMovies } from "@/pages/api/getGenreMovies";
import { Genre, IMovie } from "@/models/movie";
import { BoxType } from "@/models/box";
import BannerLoader from "@/components/loader/BannerLoader";
import ListMoviesLoader from "@/components/loader/ListMoviesLoader";
const Banner = lazy(() => import("@/components/movies/Banner"));
const Movies = lazy(() => import("@/components/movies/Movies"));

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
  return (
    <section id="home" className={styles["home-container"]}>
      <LazyLoadComponent
        placeholder={<BannerLoader width={900} height={400} />}
        scrollPosition={scrollPosition}
      >
        <Banner title="" movies={bannerMoviesData} />
      </LazyLoadComponent>

      <LazyLoadComponent
        placeholder={<ListMoviesLoader row={1} column={3} width={900} />}
        scrollPosition={scrollPosition}
      >
        <Suspense
          fallback={<ListMoviesLoader row={1} column={3} width={900} />}
        >
          <Movies
            urlBase="/series/topRatedSeries"
            urlBaseParams={null}
            title="Top rated series"
            movies={topRatedMoviesData}
            typeBox={BoxType.Medium}
          />
        </Suspense>
      </LazyLoadComponent>
      <LazyLoadComponent
        placeholder={<ListMoviesLoader row={1} column={5} width={900} />}
        scrollPosition={scrollPosition}
      >
        <Suspense
          fallback={<ListMoviesLoader row={1} column={5} width={900} />}
        >
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
        </Suspense>
      </LazyLoadComponent>
      <LazyLoadComponent
        placeholder={<ListMoviesLoader row={1} column={5} width={900} />}
        scrollPosition={scrollPosition}
      >
        <Suspense
          fallback={<ListMoviesLoader row={1} column={5} width={900} />}
        >
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
        </Suspense>
      </LazyLoadComponent>
      <LazyLoadComponent
        placeholder={<ListMoviesLoader row={1} column={5} width={900} />}
        scrollPosition={scrollPosition}
      >
        <Suspense
          fallback={<ListMoviesLoader row={1} column={3} width={900} />}
        >
          <Movies
            urlBase="/film/latestFilms"
            urlBaseParams={null}
            title="Latest"
            movies={latestMoviesData}
            typeBox={BoxType.Medium}
          />
        </Suspense>
      </LazyLoadComponent>
      <LazyLoadComponent
        placeholder={<ListMoviesLoader row={1} column={5} width={900} />}
        scrollPosition={scrollPosition}
      >
        <Suspense
          fallback={<ListMoviesLoader row={1} column={5} width={900} />}
        >
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
        </Suspense>
      </LazyLoadComponent>
    </section>
  );
}

export default trackWindowScroll(Home);

export async function getStaticProps() {
  const { validData: bannerMoviesData } = await getTopRatedFilms(1, 10);
  const { validData: topRatedMoviesData } = await getTopRatedSeries(1, 10);
  const { validData: latestMoviesData } = await getLatestMovies(1, 10);
  const { validData: actionMoviesData } = await getGenreMovies(
    1,
    Genre.Action,
    10
  );
  const { validData: adventureMoviesData } = await getGenreMovies(
    1,
    Genre.Adventure,
    10
  );
  const { validData: comedyMoviesData } = await getGenreMovies(
    1,
    Genre.Comedy,
    10
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
