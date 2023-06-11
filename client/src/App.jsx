import "./App.css";

import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getAllDogs,
  getAllTemperaments,
  createDog,
} from "./redux/actions/dogActions";
import DogsPage from "./components/DogsPage/DogsPage";
import HomeButton from "./components/HomeButton/HomeButton";
import DogDetail from "./components/DogDetail/DogDetail";
import Nav from "./components/Nav/Nav";
import Form from "./components/Form/Form";
import axios from "axios";
import Error404 from "./components/Error404/Error404";

const endpoint = "https://dogs-page-production.up.railway.app/dogs";

function App() {
  const [access, setAccess] = useState(false);
  const [radioInput, setRadioinput] = useState("allDogs");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  //console.log(temperaments);

  const handleRoute = (location) => {
    if (location.pathname !== "/") {
      setAccess(true);
    } else {
      setAccess(false);
    }
  };

  const handleRadioInput = (value) => {
    setRadioinput(value);
  };
  //console.log("resultDogs en App -->", dogsResult);

  const postDog = async ({
    name,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    life_span,
    temperament,
  }) => {
    setLoading(true);
    try {
      const dogData = {
        name,
        image: "https://i.postimg.cc/g2D1SLT2/Group-1.jpg",
        height: `${heightMin} - ${heightMax}`,
        weight: `${weightMin} - ${weightMax}`,
        life_span,
        temperament,
      };

      let dogToCreate = await axios.post(endpoint, dogData);
      let dogCreated = await dogToCreate.data.allDogsCreated;
      dispatch(createDog(dogCreated));

      setStatusMsg(dogCreated.at(-1));
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getAllTemperaments());
    handleRoute(location);
  }, [dispatch, location]);

  return (
    <div className="App">
      {access && <Nav />}
      <Routes>
        <Route
          path="/"
          element={
            <HomeButton
              login={() => {
                navigate("/dogs");
              }}
            />
          }
        />
        <Route
          path="/dogs"
          element={
            <DogsPage
              handleRadioInput={handleRadioInput}
              radioInput={radioInput}
            />
          }
        />
        <Route path="/dogs/:idRaza" element={<DogDetail />} />
        <Route
          path="/form"
          element={
            <Form
              postDog={postDog}
              error={error}
              loading={loading}
              statusMsg={statusMsg}
            />
          }
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
