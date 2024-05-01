import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Pokedex() {
  const { pokeName } = useParams();
  const [pokedex, setPokedex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokeName}`
        );
        if (!response.ok) {
          throw new Error("Pokemon not found!");
        }
        const pokemonData = await response.json();
        setPokedex({
          name: pokemonData.name,
          height: pokemonData.height,
        });
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
        setPokedex(null);
      }
    };

    fetchData();
  }, [pokeName]);

  return (
    <div>
      {pokedex !== null ? (
        <>
          <b>Name: {pokedex.name}</b>&nbsp;
          <b>Height: {pokedex.height}</b>
        </>
      ) : (
        <b>Pokemon not found!</b>
      )}
    </div>
  );
}

export default Pokedex;
