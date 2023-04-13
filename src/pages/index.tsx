import TrendingMovies from "../components/TrendingMovies";
import UpcomingMovies from "../components/UpcomingMovies";
import styles from "../styles/Home.module.css";

function Home() {
  return (
    <div className={styles["home-container"]}>
      <TrendingMovies />
      <UpcomingMovies />
    </div>
  );
}

export default Home;
