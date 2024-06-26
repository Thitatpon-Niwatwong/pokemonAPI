import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [pic, setPic] = useState("");
  const [selectedPokemonName, setSelectedPokemonName] = useState("");
  const [skill, setSkill] = useState([]);
  const [item, setItem] = useState([]);
  const [run, setRun] = useState(false);
  const [showSkill, setShowSkill] = useState(false);
  const [showItem, setShowItem] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"
      );
      setTodos(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchPokemonDetails(pokemonName) {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      const { name, sprites } = response.data;
      setName(name);
      setPic(sprites.other["official-artwork"].front_default);
      setSkill(response.data.moves);
      setItem(response.data.held_items);
      setRun(false);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Pokemon details:", error);
      setLoading(false);
    }
  }

  async function fetchSkill() {
    if (!selectedPokemonName) return;
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${selectedPokemonName}`
      );
      setName("");
      setSkill(response.data.moves);
      setItem([]);
      setRun(false);
      setMessage("Skills are displayed!");
    } catch (error) {
      console.error("Error fetching Pokemon skills:", error);
    }
  }

  async function fetchItem() {
    if (!selectedPokemonName) return;
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${selectedPokemonName}`
      );
      if (!response.data.held_items) {
      }
      setName("");
      setSkill([]);
      setItem(response.data.held_items);
      setRun(false);
      setMessage("Items are displayed!");
    } catch (error) {
      console.error("Error fetching Pokemon items:", error);
    }
  }

  function handleSelect(e) {
    const selectedPokemonName = e.target.value;
    fetchPokemonDetails(selectedPokemonName);
  }

  function handleRun() {
    setName("");
    setSkill([]);
    setItem([]);
    setRun(true);
    setPic("");
    setShowSkill(false);
    setShowItem(false);
  }

  return (
    <>
      {loading && <div className="load">Loading...</div>}
      {!loading && (
        <>
          <div className="data">
            <div className="boss">
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/493.png"
                alt="Boss"
              />
              <div className="name">
                <h3>{name}</h3>
              </div>
            </div>
            <div className="pokemon">
              <img src={pic} alt={name} />
            </div>
          </div>

          <div className="control">
            <div className="text">
              {!name && <div className="text"></div>}
              {name && !run && <h1>What will {name} do?</h1>}
              {!run && showSkill && (
                <ul>
                  {skill.slice(0, 4).map((s, index) => (
                    <li key={index}>{s.move.name}</li>
                  ))}
                </ul>
              )}
              {!run && showItem && (
                <ul>
                  {item.map((i, index) => (
                    <li key={index}>{i.item.name}</li>
                  ))}
                </ul>
              )}
              {run && (
                <div>
                  <h1>Run !!!</h1>
                </div>
              )}
            </div>
            <div className="button">
              <select
                onChange={handleSelect}
                className="button-item btn btn-info"
              >
                {todos.map((todo, index) => (
                  <option key={index} value={todo.name}>
                    {todo.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  fetchSkill();
                  setShowSkill(true);
                  setShowItem(false);
                }}
                className="button-item btn btn-warning"
              >
                Skills
              </button>
              <button
                onClick={() => {
                  fetchItem();
                  setShowSkill(false);
                  setShowItem(true);
                }}
                className="button-item btn btn-danger"
              >
                Items
              </button>
              <button
                onClick={handleRun}
                className="button-item btn btn-danger"
              >
                Run
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
