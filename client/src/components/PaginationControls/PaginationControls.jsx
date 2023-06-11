import leftIcon from "../../assets/icons/left.svg";
import rightIcon from "../../assets/icons/right.svg";
import styles from "./PaginationControls.module.css";

const PaginationControls = ({
  handleCurrentPage,
  totalPages,
  currentPage,
  dogsLength,
}) => {
  let startRange = (currentPage - 1) * 8 + 1;
  let endRange = Math.min(currentPage * 8, dogsLength);
  if (endRange === 0) {
    startRange = 0;
  }

  return (
    <div className={styles.controls}>
      <span>{`${startRange} - ${endRange} of ${dogsLength}`}</span>
      <button
        onClick={(e) => {
          handleCurrentPage(e);
        }}
        disabled={currentPage === 1}
        id="left"
      >
        <img style={{ maxWidth: "16px" }} src={leftIcon} alt="left" />
      </button>
      <button
        onClick={(e) => {
          handleCurrentPage(e);
        }}
        disabled={currentPage === totalPages}
        id="right"
      >
        <img style={{ maxWidth: "16px" }} src={rightIcon} alt="right" />
      </button>
    </div>
  );
};

export default PaginationControls;
