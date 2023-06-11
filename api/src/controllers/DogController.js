const axios = require("axios");
require("dotenv").config();
const { KEY } = process.env;
const endpoint = "https://api.thedogapi.com/v1/breeds";
const { Dog, Temperament } = require("../db.js");
const { Op } = require("sequelize");

const getDataAPI = async () => {
  let getDogs = await axios.get(endpoint, {
    headers: {
      "x-api-key": KEY,
    },
  });
  let dogsData = await getDogs.data.map((el) => {
    return {
      id: el.id,
      name: el.name,
      image: el.image.url,
      height: el.height.metric,
      weight: el.weight.metric,
      life_span: el.life_span,
      temperament: el.temperament,
      origin: el.origin,
    };
  });
  return dogsData;
};

const getDataBD = async () => {
  let getDogs = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  return getDogs;
};

async function postDog(req, res) {
  try {
    const { name, image, height, weight, life_span, temperament } = req.body;
    //console.log({ name, image, height, weight, life_span, temperament });

    if (!name || !image || !height || !weight || !life_span) {
      res.status(401).json({ error: "Faltan datos" });
    }

    const idBD = await Dog.max("id");
    //console.log("Último ID BD:", idBD);

    let findId = await axios.get(endpoint);
    let dataIdAPI = await findId.data.map((el) => el.id);
    let idAPI = Math.max(...dataIdAPI) + 1;

    let nextID = !(idBD < idAPI) ? idBD + 1 : idAPI;

    let newDog = await Dog.create({
      id: nextID,
      name,
      image,
      height,
      weight,
      life_span,
    });

    await newDog.addTemperaments(temperament);

    const allDogs = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    res.status(200).json({ newDog: newDog, allDogsCreated: allDogs });
  } catch (err) {
    res.status(500).json({ message: "Ocurrió un error" });
    console.log("error -->", err);
  }
}

async function getAllDogs(req, res) {
  const { page } = req.query;
  //console.log(page);
  try {
    const dogsDataApi = await getDataAPI();
    const dogsDataBD = await getDataBD();

    let allDogs = [...dogsDataApi, ...dogsDataBD];
    res.status(200).json(allDogs);
  } catch (err) {
    res.status(500).json({ message: "Ocurrió un error" });
    console.log("error -->", err);
  }
}

async function getDogById(req, res) {
  try {
    const { idRaza } = req.params;
    //console.log(idRaza);
    let getDogBD = await Dog.findByPk(idRaza, { include: Temperament });

    const dogsData = await getDataAPI();
    const dogDetail = dogsData.filter((el) => el.id === Number(idRaza));
    const dogApi = dogDetail[0];

    if (!Object.keys(dogsData).length && !getDogBD) {
      res.status(404).json({ message: "Id perro no existe" });
    }

    if (getDogBD) {
      res.status(200).json(getDogBD);
    } else {
      res.status(200).json(dogApi);
    }
  } catch (err) {
    res.status(500).json({ message: "Ocurrió un error" });
    console.log("error -->", err);
  }
}

async function getDogByBreed(req, res) {
  try {
    const { breed } = req.query;

    if (!breed) {
      return;
    }

    let dogBreedBD = await Dog.findAll({
      where: {
        name: {
          [Op.iLike]: `%${breed}%`,
        },
      },
    });

    let dogBreedAPI = await axios.get(`${endpoint}/search?q=${breed}`);
    let dogDataAPI = await dogBreedAPI.data;

    let allBreeds = [...dogDataAPI, ...dogBreedBD];

    if (!allBreeds.length) {
      res.status(404).json({ message: "No hay perros de esa raza" });
    } else {
      res.status(200).json(allBreeds);
    }
  } catch (err) {
    res.status(500).json({ message: "Ocurrió un error" });
    console.log("error -->", err);
  }
}

module.exports = { getAllDogs, getDogById, getDogByBreed, postDog };
