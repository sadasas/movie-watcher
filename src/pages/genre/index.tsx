import { Genre as genreEnum } from "@/models/movie";
import styles from "@/styles/Genre.module.scss";
import Link from "next/link";

function Box({ genre, index }: { genre: string; index: number }) {
  return (
    <Link
      href={{
        pathname: `/genre/params`,
        query: { genre, index },
      }}
      className={styles.box}
    >
      <h3>{genre}</h3>
    </Link>
  );
}

function Genre() {
  const genres = (Object.values(genreEnum) as string[]).filter(
    (item) => typeof item == "string"
  );

  return (
    <section id="genre" className="container">
      <div className={styles["genre-container"]}>
        <h2>Genre</h2>
        <div className={styles["genre-grid-container"]}>
          {genres.map((genre, index) => (
            <Box key={index} genre={genre} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Genre;
