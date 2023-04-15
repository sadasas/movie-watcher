import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Box from "@/components/movies/Box";
import { IMovie, defaultValueMovie } from "@/models/movie";
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

  const [IsFetching, setIsFetching] = useState(false);
  const [movies, setMovies] = useState<IMovie[]>(
    Array(10).fill(defaultValueMovie)
  );

  const slideLeft = () => {
    let slider = document.getElementById(`slider-${title}`);
    slider!.scrollLeft = slider!.scrollLeft - widthBox - 10;
  };

  const slideRight = () => {
    let slider = document.getElementById(`slider-${title}`);
    slider!.scrollLeft = slider!.scrollLeft + widthBox + 10;
  };

  const getDataHndler = async (page: number) => {
    setIsFetching(true);
    if (getdataFParams != null && getdataFParams.length > 0) {
      const data = (await getDataF(page, ...getdataFParams)) as IMovie[];

      setMovies(data);
    } else {
      const data = await getDataF(page);

      setMovies(data);
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
            id={`slider-${title}`}
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
