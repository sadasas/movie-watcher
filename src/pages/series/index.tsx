import { Suspense } from "react";
import dynamic from "next/dynamic";

import styles from "@/styles/Home.module.scss";
import { getTrendingSeries } from "@/pages/api/series/getTrendingSeries";

const Movies = dynamic(() => import("@/components/movies/Movies"), {
  suspense: true,
});

function Home() {
  return (
    <div className={styles["home-container"]}>
      <Suspense fallback={<div>Loading...</div>}>
        <Movies
          title="Trending series"
          type="series"
          getDataF={getTrendingSeries}
          widthBox={600}
          heightBox={400}
          getdataFParams={[]}
        />
      </Suspense>
    </div>
  );
}

export default Home;
