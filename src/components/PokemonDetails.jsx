import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css"; // Import App.css for styling

function PokemonDetails({ onLoading, onError }) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        onLoading(true);
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${selectedPokemonName}`
        );
        setPokemon(response.data);
        onLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
        onError("Failed to fetch Pokemon details.");
        onLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pokemon-details">
      {pokemon && (
        <>
          <h3>{pokemon.name}</h3>
          {/* Adjust image source based on available sprite */}
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
          />
          <div>
            {pokemon.stats.map((stat, index) => (
              <div key={index}>
                {stat.stat.name}: {stat.base_stat}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default PokemonDetails;
