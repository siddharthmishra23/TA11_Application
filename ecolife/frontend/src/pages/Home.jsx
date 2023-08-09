import PageNav from "../components/PageNav";
import styles from "./Home.module.scss";
import { NavLink } from "react-router-dom";
export default function Home() {
  return (
    <main className={styles.main}>
      <PageNav />
      <div className={styles.stage}>
        <div className={styles.actor}></div>
        <div className={styles.actor}></div>
        <div className={styles.actor}></div>
      </div>
      <div className={styles["article-home"]}>
        <h1>
          Empower Your Choices: Measure, Compare, and Reduce Your Carbon
          Footprint!
        </h1>
      </div>
      <div className={styles["getstarted"]}>
        <div className={styles["btn-home"]}>
          <NavLink to="/usage">Get Started</NavLink>
        </div>
      </div>
    </main>
  );
}
