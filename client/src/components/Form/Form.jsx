import React, { useState, useEffect } from "react";
import validation from "./validation.js";
import Styles from "./Form.module.css";
import { useSelector } from "react-redux";
import {} from "../../assets/img/dog.svg";
import Loader from "../Loader/Loader.jsx";
import Message from "../Message/Message.jsx";

const Form = ({ postDog, loading, error, statusMsg }) => {
  const state = useSelector((state) => state);
  const temperamentsDB = state.dogReducer.temperament;
  const [formData, setformData] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    life_span: "",
    temperament: [],
  });
  const [errors, setErrors] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    life_span: "",
    temperament: [],
  });

  const handleChange = (e) => {
    let temp = !formData.temperament.includes(Number(e.target.value))
      ? [...formData.temperament, Number(e.target.value)]
      : formData.temperament.filter((el) => el !== Number(e.target.value));

    setErrors(
      validation({
        ...formData,
        [e.target.name]: e.target.value,
      })
    );
    if (e.target.name === "temperament") {
      setformData({
        ...formData,
        temperament: temp,
      });
    } else {
      setformData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postDog(formData);
    setformData({
      name: "",
      heightMin: "",
      heightMax: "",
      weightMin: "",
      weightMax: "",
      life_span: "",
      temperament: [],
    });
  };

  return (
    <div className={Styles.form}>
      <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        <div className={Styles.container}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className={Styles.danger}>{errors.name}</p>}

          <label htmlFor="heightMin">Min Height:</label>
          <input
            type="number"
            id="heightMin"
            name="heightMin"
            value={formData.heightMin}
            onChange={handleChange}
            required
          />
          {errors.heightMin && !errors.name && (
            <p className={Styles.danger}>{errors.heightMin}</p>
          )}

          <label htmlFor="heightMax">Max Height:</label>
          <input
            type="number"
            id="heightMax"
            name="heightMax"
            value={formData.heightMax}
            onChange={handleChange}
            required
          />
          {errors.heightMax && !errors.heightMin && (
            <p className={Styles.danger}>{errors.heightMax}</p>
          )}

          <label htmlFor="weightMin">Min Weight:</label>
          <input
            type="number"
            id="weightMin"
            name="weightMin"
            value={formData.weightMin}
            onChange={handleChange}
            required
          />
          {errors.weightMin && !errors.heightMax && (
            <p className={Styles.danger}>{errors.weightMin}</p>
          )}

          <label htmlFor="weightMax">Max Weight:</label>
          <input
            type="number"
            id="weightMax"
            name="weightMax"
            value={formData.weightMax}
            onChange={handleChange}
            required
          />
          {errors.weightMax && !errors.weightMin && (
            <p className={Styles.danger}>{errors.weightMax}</p>
          )}

          <label htmlFor="lifeSpan">Life Span:</label>
          <input
            type="text"
            id="life_span"
            name="life_span"
            value={formData.life_span}
            onChange={handleChange}
            required
          />
          {errors.life_span && !errors.weightMax && (
            <p className={Styles.danger}>{errors.life_span}</p>
          )}
        </div>
        <div className={Styles.container}>
          <label htmlFor="temperament">Temperaments:</label>
          <select
            id="temperament"
            name="temperament"
            multiple
            value={formData.temperament}
            onChange={handleChange}
            required
          >
            {temperamentsDB.map((el) => (
              <option value={el.id} key={el.id}>
                {el.name}
              </option>
            ))}
          </select>
          {errors.temperament && !errors.life_span && (
            <p className={Styles.danger}>{errors.temperament}</p>
          )}
          <button type="submit" disabled={Object.values(errors).length > 0}>
            CREATE NEW BREED
          </button>
        </div>
      </form>
      {loading && <Loader />}
      {(error || !temperamentsDB) && (
        <Message msg={`Lo siento, ocurrió un error`} bgColor="#dc3545" />
      )}
      {statusMsg && (
        <Message
          msg={`The breed ${statusMsg.name} was created successfully.`}
          bgColor="#1cca04"
        />
      )}
    </div>
  );
};

export default Form;
