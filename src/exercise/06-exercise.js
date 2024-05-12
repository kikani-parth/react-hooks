// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from "react";
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from "../pokemon";

function PokemonInfo({ pokemonName }) {
  const [pokemon, setPokemon] = React.useState(null);

  React.useEffect(() => {
    // If the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
    if (pokemonName === "") return;

    // Before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
    setPokemon(null);

    // (This is to enable the loading state when switching between different pokemon.)
    fetchPokemon(pokemonName).then((pokemonData) => {
      setPokemon(pokemonData);
    });
  }, [pokemonName]);

  if (!pokemonName) return "Submit a pokemon";
  else if (!pokemon) return <PokemonInfoFallback name={pokemonName} />;
  else return <PokemonDataView pokemon={pokemon} />;
}

function App() {
  const [pokemonName, setPokemonName] = React.useState("");

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  );
}

export default App;
