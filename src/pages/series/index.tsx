import { Suspense, lazy } from "react";

import styles from "@/styles/Home.module.scss";
import { getTrendingSeries } from "@/pages/api/series/getTrendingSeries";
import { getLatestSeries } from "../api/series/getLatestSeries";
import { getGenreSeries } from "../api/series/getGenreSeries";
import { Genre, IMovie, MovieType } from "@/models/movie";
import { BoxType } from "@/models/box";
import ListMoviesLoader from "@/components/loader/ListMoviesLoader";
const Movies = lazy(() => import("@/components/movies/Movies"));

function Series({
  trendingMoviesData,
  latesMoviesData,
  dramaMoviesData,
  familyMoviesData,
  animationMoviesData,
  documentaryMoviesData,
}: {
  trendingMoviesData: IMovie[];
  latesMoviesData: IMovie[];
  dramaMoviesData: IMovie[];
  familyMoviesData: IMovie[];
  animationMoviesData: IMovie[];
  documentaryMoviesData: IMovie[];
}) {
  return (
    <section id="series" className={styles["home-container"]}>
      <Suspense fallback={<ListMoviesLoader row={1} column={2} width={900} />}>
        <Movies
          urlBase="/series/trendingSeries"
          urlBaseParams={null}
          title="Trending series"
          movies={trendingMoviesData}
          typeBox={BoxType.Large}
        />
      </Suspense>

      <Suspense fallback={<ListMoviesLoader row={1} column={5} width={900} />}>
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
      <Suspense fallback={<ListMoviesLoader row={1} column={5} width={900} />}>
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
      <Suspense fallback={<ListMoviesLoader row={1} column={5} width={900} />}>
        <Movies
          urlBase="/series/latestSeries"
          urlBaseParams={null}
          title="Lates series"
          movies={latesMoviesData}
          typeBox={BoxType.Medium}
        />
      </Suspense>
      <Suspense fallback={<ListMoviesLoader row={1} column={5} width={900} />}>
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
      <Suspense fallback={<ListMoviesLoader row={1} column={5} width={900} />}>
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
    </section>
  );
}

export default Series;

export async function getStaticProps() {
  const { validData: trendingMoviesData } = await getTrendingSeries(1, 10);
  const { validData: latesMoviesData } = await getLatestSeries(1, 10);
  const { validData: dramaMoviesData } = await getGenreSeries(
    1,
    Genre.Drama,
    10
  );
  const { validData: familyMoviesData } = await getGenreSeries(
    1,
    Genre.Family,
    10
  );
  const { validData: animationMoviesData } = await getGenreSeries(
    1,
    Genre.Animation,
    10
  );
  const { validData: documentaryMoviesData } = await getGenreSeries(
    1,
    Genre.Documentary,
    10
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
