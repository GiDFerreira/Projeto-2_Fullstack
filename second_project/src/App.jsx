import React from "react";
import Navigation from "./naviBar.jsx"
import Research from "./Research.jsx"
import { CharacterApiProvider } from "./context/characterContext.jsx";

function App() {

  return (
    <CharacterApiProvider>
      <Navigation/>
      <Research/>
    </CharacterApiProvider>
  )
}

export default App;
