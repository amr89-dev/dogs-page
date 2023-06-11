const axios = require("axios");
require("dotenv").config();
const { KEY } = process.env;
const endpoint = "https://api.thedogapi.com/v1/breeds";
const { Temperament } = require("../db.js");

async function getTemperaments(req, res) {
  try {
    let getTemps = await axios.get(endpoint, {
      headers: {
        "x-api-key": KEY,
      },
    });
    let allTemperaments = getTemps.data
      .flatMap((el) => (el.temperament ? el.temperament.split(",") : []))
      .map((el) => el.trim())
      .sort();

    let dogTemperaments = Array.from(new Set(allTemperaments));

    for (let el of dogTemperaments) {
      await Temperament.findOrCreate({
        where: { name: el },
      });
    }

    let temperamentsBD = await Temperament.findAll();
    //console.log(temperamentsBD);

    res.status(200).json(temperamentsBD);
  } catch (err) {
    res.status(500).json({ message: "Ocurrió un error" });
    console.log("error -->", err);
  }
}

module.exports = { getTemperaments };
