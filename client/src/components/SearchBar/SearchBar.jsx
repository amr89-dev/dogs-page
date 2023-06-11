import React from "react";
import { useState, useEffect } from "react";
import ResultDogs from "../ResultDogs/ResultDogs";
import styles from "./SearchBar.module.css";
import axios from "axios";
const endpoint = "http://localhost:3001/dogs";

const SearchBar = () => {
  const [breed, setBreed] = useState("");
  const [dogsResult, setDogsResult] = useState([]);

  const getByBreed = async (breed) => {
    try {
      let dogBreedReq = await axios(`${endpoint}/name?breed=${breed}`);
      let dogBreed = await dogBreedReq.data;

      setDogsResult(dogBreed);
    } catch (err) {
      setDogsResult([]);
    }
  };

  useEffect(() => {
    getByBreed(breed);
  }, [breed]);

  const handleChange = (e) => {
    const value = e.target.value;
    setBreed(value);
  };

  return (
    <div className={styles.SearchBar}>
      <input
        type="text"
        list="datalist-options"
        placeholder="Search by breed"
        onChange={handleChange}
        value={breed}
        className={styles.inputBar}
      />
      <ResultDogs dogsResult={dogsResult} breed={breed} />
    </div>
  );
};

export default SearchBar;
