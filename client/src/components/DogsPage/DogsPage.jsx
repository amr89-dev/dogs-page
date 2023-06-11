import { useState } from "react";
import Card from "../DogCard/DogCard";
import styles from "./DogsPage.module.css";
import SearchBar from "../SearchBar/SearchBar";
import PaginationControls from "../PaginationControls/PaginationControls";
import {
  filterDogsByTemperament,
  filterDogsByOrigin,
  orderDogs,
} from "../../redux/actions/dogActions";
import { useDispatch, useSelector } from "react-redux";
import SelectOrder from "../SelectOrder/SelectOrder";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";

// eslint-disable-next-line
const DogsPage = ({ handleRadioInput, radioInput }) => {
  //
  const state = useSelector((state) => state);
  const allDogs = state.dogReducer.allDogs;
  const dogsFiltered = state.dogReducer.dogsFiltered;
  const temperament = state.dogReducer.temperament;
  const bdIsEmpty = state.dogReducer.bdIsEmpty;
  const dogsFetchError = state.dogReducer.fetchError["dogs"];
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  //console.log(allDogs);

  let totalPages = !dogsFiltered.length
    ? Math.ceil(allDogs.length / 8)
    : Math.ceil(dogsFiltered.length / 8);

  const handleCurrentPage = (e) => {
    //console.log(e.currentTarget);
    if (e.currentTarget.matches("#right")) {
      setCurrentPage(currentPage + 1);
    }
    if (e.currentTarget.matches("#left")) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleTemperament = (e) => {
    dispatch(filterDogsByTemperament(e.target.value));
  };
  const handleOrigin = (e) => {
    handleRadioInput(e.target.value);
    dispatch(filterDogsByOrigin(e.target.value));
  };
  const handleOrder = (e) => {
    dispatch(orderDogs(e.target.value));
  };

  let dogsToRender =
    !dogsFiltered.length && !bdIsEmpty
      ? allDogs.slice(currentPage * 8 - 8, 8 * currentPage)
      : dogsFiltered.slice(currentPage * 8 - 8, 8 * currentPage);
  return (
    <div className={styles.dogsPage}>
      <SearchBar />
      <div className={styles.controls}>
        <SelectOrder
          temperament={temperament}
          handleOrder={handleOrder}
          handleTemperament={handleTemperament}
          handleOrigin={handleOrigin}
          radioInput={radioInput}
        />
        <PaginationControls
          handleCurrentPage={handleCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
          dogsLength={
            !dogsFiltered.length && !bdIsEmpty
              ? allDogs.length
              : dogsFiltered.length
          }
        />
      </div>
      {allDogs.length <= 0 && !dogsFetchError && <Loader />}
      {dogsFetchError && allDogs.length <= 0 && (
        <Message
          dogError={dogsFetchError}
          msg={`"I'm sorry, there was an error loading the dogs."`}
        />
      )}
      {!(allDogs.length <= 0) && (
        <div className={styles.cards}>
          {dogsToRender.map((el) => (
            <Card key={el.id} dog={el} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DogsPage;
