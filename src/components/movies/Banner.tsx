import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { IMovie, MovieType, defaultValueMovie } from "@/models/movie";
import styles from "@/styles/list_movies/Movies.module.scss";
import BannerBox from "@/components/movies/BannerBox";

function Banner({
  title,
  getDataF,
  getdataFParams,
}: {
  title: string;
  getDataF: Function;
  getdataFParams: any[];
}) {
  const EmptyImg = "";

  const [IsFetching, setIsFetching] = useState(false);
  const [movies, setMovies] = useState<IMovie[]>(
    Array(10).fill(defaultValueMovie)
  );

  const slideLeft = () => {
    let slider = document.getElementById(`slider-${title}`);
    slider!.scrollLeft = slider!.scrollLeft - 800 - 10;
  };

  const slideRight = () => {
    let slider = document.getElementById(`slider-${title}`);
    slider!.scrollLeft = slider!.scrollLeft + 800 + 10;
  };

  const getDataHndler = async (page: number) => {
    setIsFetching(true);
    if (getdataFParams != null && getdataFParams.length > 0) {
      let data = (await getDataF(page, ...getdataFParams)) as IMovie[];
      if (data.length > 10) data = data.slice(0, 10);

      setMovies(data);
    } else {
      let data = await getDataF(page);
      if (data.length > 10) data = data.slice(0, 10);

      setMovies(data);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    getDataHndler(1);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles["list-movies-container"]}>
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
                <BannerBox key={index} movie={movie}></BannerBox>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
