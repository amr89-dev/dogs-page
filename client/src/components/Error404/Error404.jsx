import React from "react";
import notfound from "../../assets/icons/404 Not Found.svg";
import styles from "./Error404.module.css";

const Error404 = () => {
  return (
    <div className={styles.not}>
      <img src={notfound} alt="404" />
    </div>
  );
};

export default Error404;
