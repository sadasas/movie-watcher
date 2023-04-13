import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Box from "./Box";
import { getTrendingMovies } from "@/pages/api/trendingMovie";
import { Movie } from "@/models/movie";
import styles from "@/styles/list_movies/ListMovies.module.scss";

function TrendingMovies() {
  const EmptyImg = "";

  const defaultMovie: Movie = {
    id: "",
    primaryImage: { url: "", width: 0, height: 0, caption: { plainText: "" } },
    releaseDate: { day: 0, month: 0, year: 0 },
    titleText: { text: "" },
    titleType: {
      isSeries: false,
      isEpisode: false,
    },
    rating: "",
    description: "",
    cast: "",
  };

  const width = 600;
  const [IsFetching, setIsFetching] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([
    defaultMovie,
    defaultMovie,
    defaultMovie,
    defaultMovie,
    defaultMovie,
    defaultMovie,
    defaultMovie,
    defaultMovie,
    defaultMovie,
    defaultMovie,
  ]);

  const slideLeft = () => {
    let slider = document.getElementById("slider-trending");
    slider!.scrollLeft = slider!.scrollLeft - width - 10;
  };

  const slideRight = () => {
    let slider = document.getElementById("slider-trending");
    slider!.scrollLeft = slider!.scrollLeft + width + 10;
  };

  const getDataHndler = async (page: number) => {
    setIsFetching(true);
    const data = await getTrendingMovies(page);
    setIsFetching(false);
    console.log(data);
    setMovies(data!);
  };

  useEffect(() => {
    getDataHndler(1);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles["upcomingMovies-container"]}>
        <h2 className={styles.title}>Trending movies</h2>
        <div className={styles["slider-container"]}>
          <div className={styles["btns-scroll"]}>
            <IoIosArrowBack onClick={slideLeft} />
            <IoIosArrowForward onClick={slideRight} />
          </div>
          <div
            className={styles["slider-content-container"]}
            id="slider-trending"
          >
            {movies.length > 0 &&
              movies.map((movie, index) => (
                <Box key={index} movie={movie} width={width} height={400}></Box>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrendingMovies;
