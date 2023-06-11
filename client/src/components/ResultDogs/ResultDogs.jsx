import React from "react";
import { Link } from "react-router-dom";
import styles from "./ResultDogs.module.css";

const ResultDogs = ({ dogsResult, breed }) => {
  // console.log(breed.length);
  return (
    <div className={styles.resultDogs}>
      {breed.length > 0 &&
        dogsResult.map((el) => (
          <div key={el.id} className={styles.link}>
            <Link to={`/dogs/${el.id}`}>{el.name}</Link>
          </div>
        ))}
    </div>
  );
};

export default ResultDogs;
