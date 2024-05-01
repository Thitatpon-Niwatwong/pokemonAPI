import React, { useState } from "react";
import axios from "axios";
import "../App.css";

function ControlPanel({ onLoading, onError }) {
  const [selectedPokemonName, setSelectedPokemonName] = useState("");
  const [skill, setSkill] = useState([]);
  const [item, setItem] = useState([]);
  const [run, setRun] = useState(false);

  const handleSelect = async (e) => {
    const pokemonName = e.target.value;
    setSelectedPokemonName(pokemonName);
  };

  const fetchSkill = async () => {
    if (!selectedPokemonName) return;
    try {
      onLoading(true);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${selectedPokemonName}`
      );
      setSkill(response.data.moves);
      setItem([]);
      setRun(false);
      onLoading(false);
    } catch (error) {
      console.error("Error fetching Pokemon skills:", error);
      onError("Failed to fetch Pokemon skills.");
      onLoading(false);
    }
  };

  const fetchItem = async () => {
    if (!selectedPokemonName) return;
    try {
      onLoading(true);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${selectedPokemonName}`
      );
      setItem(response.data.held_items || []);
      setSkill([]);
      setRun(false);
      onLoading(false);
    } catch (error) {
      console.error("Error fetching Pokemon items:", error);
      onError("Failed to fetch Pokemon items.");
      onLoading(false);
    }
  };

  const handleRun = () => {
    setSelectedPokemonName("");
    setSkill([]);
    setItem([]);
    setRun(true);
  };

  return (
    <div className="control-panel">
      <select onChange={handleSelect}>
        {/* Placeholder for todos mapping */}
        {/* <option value="">Placeholder</option> */}
      </select>
      <button onClick={fetchSkill}>Fetch Skills</button>
      <button onClick={fetchItem}>Fetch Items</button>
      <button onClick={handleRun}>Run</button>
    </div>
  );
}

export default ControlPanel;
