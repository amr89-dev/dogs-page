import React from "react";
import styles from "./SelectOrder.module.css";

const SelectOrder = ({
  temperament,
  handleTemperament,
  handleOrder,
  handleOrigin,
  radioInput,
}) => {
  return (
    <div className={styles.selectOrder}>
      <div className={styles.radios}>
        <span>
          <strong>Origin:</strong>
        </span>
        <input
          type="radio"
          id="allDogs"
          name="origin"
          value="allDogs"
          onChange={handleOrigin}
          checked={radioInput === "allDogs"}
        />
        <label htmlFor="allDogs">All</label>
        <input
          type="radio"
          id="API"
          name="origin"
          value="API"
          onChange={handleOrigin}
          checked={radioInput === "API"}
        />
        <label htmlFor="API">API</label>
        <input
          type="radio"
          id="BD"
          name="origin"
          value="BD"
          onChange={handleOrigin}
          checked={radioInput === "BD"}
        />
        <label htmlFor="BD">BD</label>
      </div>
      <div className={styles.selects}>
        <select name="temperament" onChange={handleTemperament}>
          <option value="all">Temperaments</option>
          {temperament.map((el) => (
            <option key={el.id} value={el.name}>
              {el.name}
            </option>
          ))}
        </select>

        <select name="order" onChange={handleOrder}>
          <option>Sort alphabetically</option>
          <option value="up">A-Z</option>
          <option value="down">Z-A</option>
        </select>
        <select name="orderWeight" onChange={handleOrder}>
          <option>Sort by weight</option>
          <option value="min">min - max</option>
          <option value="max">max - min</option>
        </select>
      </div>
    </div>
  );
};

export default SelectOrder;
