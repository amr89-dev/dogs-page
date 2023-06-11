import styles from "./Nav.module.css";
import title from "../../assets/icons/Mundo Canino.svg";
import add from "../../assets/icons/Add Dog.svg";
import dogs from "../../assets/icons/Dogs.svg";
import home from "../../assets/icons/Home.svg";

import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src={title} alt="logo" />
      </Link>
      <nav>
        <div className={styles.headerLinks}>
          <Link
            exact
            to="/"
            activeClassName={styles.activeLink}
            className={styles.logo}
          >
            <img src={home} alt="home" />
          </Link>
          <Link
            to="/dogs"
            activeClassName={styles.activeLink}
            className={styles.logo}
          >
            <img src={dogs} alt="dogs" />
          </Link>
          <Link
            to="/form"
            activeClassName={styles.activeLink}
            className={styles.logo}
          >
            <img src={add} alt="add" />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
