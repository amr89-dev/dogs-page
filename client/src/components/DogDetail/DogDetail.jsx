import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import styles from "./DogDetail.module.css";

const DogDetail = () => {
  const [dogDetail, setDogDetail] = useState([]);
  const { idRaza } = useParams();
  const navigate = useNavigate();

  let url = `https://dogs-page-production.up.railway.app/dogs/${idRaza}`;

  useEffect(() => {
    try {
      axios.get(url).then(({ data }) => {
        setDogDetail(data);
      });
    } catch (err) {
      console.log("Ocurrio un error");
    }
  }, [url]);
  const backToHome = () => {
    navigate(-1);
  };
  const {
    id,
    image,
    name,
    height,
    weight,
    temperament,
    life_span,
    temperaments,
  } = dogDetail;
  let temperamentToRender =
    temperaments?.map((el) => el.name).join(", ") || temperament;
  return (
    <div className={styles.detail}>
      <button onClick={backToHome}>Back</button>
      {dogDetail.length <= 0 && <Loader />}
      {!(dogDetail.length <= 0) && (
        <article>
          <div className={styles.info}>
            <h2> {name}</h2>
            <p>
              <strong>ID:</strong> {id}
            </p>
            <p>
              <strong>Height:</strong> {height} cm
            </p>
            <p>
              <strong>Weight:</strong> {weight} kg
            </p>
            <p>
              <strong>Temperaments:</strong> {temperamentToRender}
            </p>
            <p>
              <strong>Life span:</strong> {life_span}
            </p>
          </div>

          <figure>
            <img src={image} alt="avatar" />
          </figure>
        </article>
      )}
    </div>
  );
};

export default DogDetail;
