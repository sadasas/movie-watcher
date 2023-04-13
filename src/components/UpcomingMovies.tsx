import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Box from "./Box";
import { getUpcomingMovies } from "@/pages/api/upcomingMovie";
import { Movie } from "@/models/movie";
import styles from "@/styles/list_movies/ListMovies.module.scss";

function UpcomingMovies() {
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

  const width = 200;
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
    let slider = document.getElementById("slider-upcoming");
    slider!.scrollLeft = slider!.scrollLeft - width - 10;
  };

  const slideRight = () => {
    let slider = document.getElementById("slider-upcoming");
    slider!.scrollLeft = slider!.scrollLeft + width + 10;
  };

  const getDataHndler = async (page: number) => {
    setIsFetching(true);
    const data = await getUpcomingMovies(page);
    setIsFetching(false);
    setMovies(data);
  };

  useEffect(() => {
    getDataHndler(1);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles["upcomingMovies-container"]}>
        <h2 className={styles.title}>Upcoming movies</h2>
        <div className={styles["slider-container"]}>
          <div className={styles["btns-scroll"]}>
            <IoIosArrowBack onClick={slideLeft} />
            <IoIosArrowForward onClick={slideRight} />
          </div>
          <div
            className={styles["slider-content-container"]}
            id="slider-upcoming"
          >
            {movies.length > 0 &&
              movies.map((movie, index) => (
                <Box key={index} movie={movie} width={width} height={250}></Box>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpcomingMovies;
