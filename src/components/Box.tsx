import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";

import styles from "@/styles/list_movies/Box.module.scss";
import { Image } from "@/models/movie";

function Box({
  title,
  img,
  releaseYear,
  width,
  height,
}: {
  title: string;
  img: Image;
  releaseYear: number;
  width: number;
  height: number;
}) {
  const PlaceholderVertical = "/placeholderVertical.svg";
  const PlaceholderHorizontal = "/placeholderHorizontal.svg";

  const boxSizeStyle = {
    width,
    height,
  };

  const boxAbsoluteStyle = () => {
    if (width >= 600)
      return {
        padding: "40px 28px",
        fontSize: "1.2rem",
        width,
        height,
      };
    else
      return {
        padding: "25px 9px",
        fontSize: "0.8rem",
        width,
        height,
      };
  };

  const btnsLayoutStyle = () => {
    if (width >= 600)
      return {
        justifyContent: "flex-end",
        gap: "10px",
      };
    else {
      return {
        justifyContent: "space-between",
      };
    }
  };

  const btnsSeeStyle = () => {
    if (width >= 600)
      return {
        fontSize: "2.8rem",
      };
    else {
      return {
        fontSize: "2rem",
      };
    }
  };

  return (
    <div className={styles.box}>
      <div style={boxSizeStyle} className={styles["box-container"]}>
        {img != null && (
          <LazyLoadImage
            threshold={0}
            effect="blur"
            placeholderSrc={
              width > height ? PlaceholderHorizontal : PlaceholderVertical
            }
            src={img.url}
          />
        )}
        {title != "" && (
          <div
            style={boxAbsoluteStyle()}
            className={styles["box-container-absolute"]}
          >
            <h2>{title}</h2> <h4>{releaseYear}</h4>
            <div style={btnsLayoutStyle()} className={styles.btns}>
              <h4 className={styles["btn-see"]}>See detail</h4>
              <IoMdAddCircle
                style={btnsSeeStyle()}
                className={styles["btn-watchlist"]}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Box;
