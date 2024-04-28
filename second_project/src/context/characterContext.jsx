import { createContext, useContext, useState } from "react";
import Preview from "../preview";

export const CharacterApiContext = createContext();

export const CharacterApiProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);

  const contextValue = {
    characters,
    loading,
    Preview 
  };
  return <CharacterAPiContext.Provider value={{contextValue}}>{children}</CharacterAPiContext.Provider>
}