import CardStyles from "./DogCard.module.css";
import { Link } from "react-router-dom";

const DogCard = (props) => {
  // console.log(props);
  /* eslint-disable */
  const { id, name, image, weight, temperament, temperaments, origin } =
    props.dog;

  let temperamentToRender =
    temperaments?.map((el) => el.name).join(", ") || temperament;

  return (
    <div className={CardStyles.card}>
      <h2>
        <Link to={`/dogs/${id}`}>{name}</Link>
      </h2>

      <img src={image} alt="avatar" />
      <div>
        <strong>Weight:</strong> {weight} kg
      </div>
      <span>
        <strong>Temperaments:</strong> {temperamentToRender}
      </span>
      <div>
        <strong>Origin:</strong> {origin}
      </div>
    </div>
  );
};

export default DogCard;
