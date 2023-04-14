import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Box from "@/components/movies/Box";
import { Movie } from "@/models/movie";
import styles from "@/styles/list_movies/Movies.module.scss";

function Movies({
  type,
  title,
  getDataF,
  getdataFParams,
  widthBox,
  heightBox,
}: {
  type: string;
  title: string;
  getDataF: Function;
  widthBox: number;
  heightBox: number;
  getdataFParams: string[];
}) {
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
    let slider = document.getElementById(`slider-${type}`);
    slider!.scrollLeft = slider!.scrollLeft - widthBox - 10;
  };

  const slideRight = () => {
    let slider = document.getElementById(`slider-${type}`);
    slider!.scrollLeft = slider!.scrollLeft + widthBox + 10;
  };

  const getDataHndler = async (page: number) => {
    setIsFetching(true);
    if (getdataFParams != null) {
      const data = await getDataF(page, ...getdataFParams);
      setMovies(data!);
    } else {
      const data = await getDataF(page);
      setMovies(data!);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    getDataHndler(1);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles["list-movies-container "]}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles["slider-container"]}>
          <div className={styles["btns-scroll"]}>
            <IoIosArrowBack onClick={slideLeft} />
            <IoIosArrowForward onClick={slideRight} />
          </div>
          <div
            className={styles["slider-content-container"]}
            id={`slider-${type}`}
          >
            {movies.length > 0 &&
              movies.map((movie, index) => (
                <Box
                  type={type}
                  key={index}
                  movie={movie}
                  width={widthBox}
                  height={heightBox}
                ></Box>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movies;
