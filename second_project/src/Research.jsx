import { useState, Suspense, useContext } from "react";
import Loading from "./loading";
import { CharacterApiContext, CharacterApiProvider } from "./context/characterContext";
import { Button } from "./components/button.style";
import { Input } from "./components/input.style";

function Research() {
    const { Preview } = useContext(CharacterApiContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const disneyCharacterInput = document.getElementById("disneyCharacter");
        const disneyCharacter = disneyCharacterInput.value.trim().toLowerCase();
        
        if (disneyCharacter.length < 2 || disneyCharacter.length > 22) {
            setErrorMessage("O nome do personagem deve ter entre 2 e 22 letras.");
            return;
        }

        try {
            setLoading(true); 
            const data = await Preview(disneyCharacter);
            if (data.length === 0) {
                setErrorMessage("Nenhum personagem encontrado.");
            } else {
                setCharacters(data);
                setErrorMessage(""); 
            }
            setLoading(false); 
        } catch (error) {
            console.error(error);
            errorMessageElement.textContent = "Erro ao buscar os dados dos personagens.";
            setLoading(false); 
        }
    };

    return (
        <CharacterApiProvider>
        <div className="div-submit">
            <main>
                <form onSubmit={handleSubmit}>
                   <Input
                        id="disneyCharacter"
                        type="text"
                        placeholder="Digite o nome do personagem da Disney"
                    />
                    <Button>Buscar</Button>
                </form>
                <p id="errorMessage">{errorMessage}</p>
                </main>

                <div id="charactersContainer">
                    {loading ? ( 
                        <Loading />
                    ) : (
                        <Suspense fallback={<div>Carregando...</div>}>
                            {characters.map((character, index) => (
                                <div key={index}>
                                    <h2>{character.name}</h2>
                                    <img src={character.imageUrl} alt={character.name} />
                                    <ul>
                                        {character.films && character.films.length > 0 ? (
                                            character.films.map((film, index) => (
                                                <li key={index}>{film}</li>
                                            ))
                                        ) : (
                                            <li>Esse personagem não possui filmes</li>
                                        )}
                                    </ul>
                                </div>
                            ))}
                        </Suspense>
                    )}
                </div>
            </div>
        </CharacterApiProvider>
        );
}

export default Research;
