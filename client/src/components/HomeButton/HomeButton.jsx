import title from "../../assets/icons/Mundo Canino.svg";
import perrito from "../../assets/icons/perrito.svg";
import button from "../../assets/icons/Enter.svg";
import styles from "./HomeButton.module.css";
/* eslint-disable */
const HomeButton = ({ login }) => {
  return (
    <div className={styles.container}>
      <div className={styles.landing}>
        <img src={title} alt="title" className={styles.title} id="title" />
        <div className={styles.containerText}>
          <img src={perrito} alt="perrito" className={styles.perrito} />
          <div className={styles.texto}>
            <p>
              Discover the fascinating world of dogs: find the perfect breed for
              you and learn about their unique characteristics..{" "}
            </p>
            <button
              onClick={() => {
                login();
              }}
            >
              <img src={button} alt="btn" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeButton;
