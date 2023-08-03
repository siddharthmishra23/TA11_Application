import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
function PageNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/usage">Usage</NavLink>
        </li>
        <li>
          <NavLink to="/compare">Compare</NavLink>
        </li>
        <li>
          <NavLink to="/aboutus">About us</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
