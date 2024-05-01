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
  const [stat, setStat] = useState([]);

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

  const fetchStat = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${selectedPokemonName}`
      );
      setStat(response.data.stats);
    } catch (error) {
      console.log("error", error);
    }
  };

  async function fetchPokemonDetails(pokemonName) {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      const { name, sprites } = response.data;
      setName(name);
      setSkill([]);
      setItem([]);
      setRun(false);
      setPic(sprites.other.showdown.back_default);
      setSelectedPokemonName(pokemonName);
      setLoading(false);
      // fetchStat();
    } catch (error) {
      console.error("Error fetching Pokemon details:", error);
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
              { <div>
                {stat.map((s, index) => (
                  <div key={index}>{s.base_stat}</div>
                ))}
              </div> }
            </div>
            <div className="pokemon">
              <img src={pic} alt={name} />
            </div>
          </div>

          <div className="control">
            <div className="text">
              {!name && <div className="text"></div>}
              {name && skill.length === 0 && item.length === 0 && !run && (
                <h1>What will {name} do?</h1>
              )}
              {skill.length > 0 && item.length === 0 && !run && (
                <ul>
                  {skill.slice(0, 4).map((s, index) => (
                    <li key={index}>{s.move.name}</li>
                  ))}
                </ul>
              )}
              {item.length > 0 && skill.length === 0 && !run && (
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
                onClick={fetchSkill}
                className="button-item btn btn-warning"
              >
                Skills
              </button>
              <button
                onClick={fetchItem}
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
