import { MdClose } from "react-icons/md";
import { TbMovieOff } from "react-icons/tb";

import { closePopup } from "@/features/popup/popupTrailerSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import styles from "@/styles/list_movies/PopupTrailer.module.scss";
import { useEffect } from "react";

function PopupTrailer() {
  const { value: url } = useAppSelector((state) => state.reducer.popupTrailer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log(url.trailer);
  }, [url]);

  return (
    <>
      <div
        onClick={() => dispatch(closePopup())}
        className={styles.overlay}
      ></div>
      <div className={styles["popup-container"]}>
        <MdClose
          onClick={() => dispatch(closePopup())}
          className={styles["close-btn"]}
        />
        {url.trailer !== undefined ? (
          <iframe src={url.trailer} />
        ) : (
          <div className={styles["empty-container"]}>
            <TbMovieOff className={styles["empty-btn"]} />
            <h3>cannot access trailer</h3>{" "}
          </div>
        )}
      </div>
    </>
  );
}

export default PopupTrailer;
