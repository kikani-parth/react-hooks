// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from "react";

/* EXTRA CREDIT 3 */
function useLocalStorageState(key, defaultValue) {
  const [stateVar, setStateVar] = React.useState(
    () => window.localStorage.getItem(key) || defaultValue
  );

  console.log(typeof stateVar);

  React.useEffect(() => {
    window.localStorage.setItem(key, stateVar);
  }, [key, stateVar]);

  return [stateVar, setStateVar];
}

function Greeting({ initialName = "" }) {
  /* EXERCISE */

  // Get name from local storage
  // initialName = window.localStorage.getItem("name") || "";

  // const [name, setName] = React.useState(initialName);

  /* EXTRA CREDIT 1 */

  // const [name, setName] = React.useState(
  //   () => window.localStorage.getItem("name") || initialName
  // );

  // React.useEffect(() => {
  //   window.localStorage.setItem("name", name);
  // }, [name]);

  /* EXTRA CREDIT 3 */
  const [name, setName] = useLocalStorageState("name", 0);

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : "Please type your name"}
    </div>
  );
}

function App() {
  return <Greeting />;
}

export default App;
