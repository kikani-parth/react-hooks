// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from "react";
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from "../pokemon";
import { ErrorBoundary } from "react-error-boundary";

function PokemonInfo({ pokemonName }) {
  const [state, setState] = React.useState({
    pokemon: null,
    error: null,
    status: pokemonName ? "pending" : "idle",
  });

  const { pokemon, error, status } = state;

  React.useEffect(() => {
    // If the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
    if (pokemonName === "") return;

    setState({ status: "pending" });

    // (This is to enable the loading state when switching between different pokemon.)
    fetchPokemon(pokemonName)
      .then((pokemonData) => {
        setState({ pokemon: pokemonData, status: "resolved" });
      })
      .catch((error) => {
        setState({ error: error, status: "rejected" });
      });
  }, [pokemonName]);

  if (status === "idle") {
    return "Submit a pokemon";
  } else if (status === "pending") {
    return <PokemonInfoFallback name={pokemonName} />;
  } else if (status === "rejected") {
    throw error;
  } else if (status === "resolved") {
    return <PokemonDataView pokemon={pokemon} />;
  }
}

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      There was an error:{" "}
      <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  const [pokemonName, setPokemonName] = React.useState("");

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  function handleReset() {
    setPokemonName("");
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;