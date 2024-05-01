import axios from "axios";

const fetchPokemon = async (pokeName) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokeName}`
    );
    return response?.data;
  } catch (error) {
    console.log("Error:", error);
  }
};

export default fetchPokemon;
