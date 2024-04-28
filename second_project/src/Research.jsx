import { useState, Suspense, lazy } from "react";
import Loading from "./loading";
import Preview from "./preview";
import { Button } from "./components/button.style";
import { Input } from "./components/input.style";

function Research() {
    const { preview, loading, characters } = useContext(CharacterApiContext);

    /*const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);*/

    const handleSubmit = async (event) => {
        event.preventDefault();
        const disneyCharacterInput = document.getElementById("disneyCharacter");
        const errorMessageElement = document.getElementById("errorMessage");
        

        try {
            const disneyCharacter = disneyCharacterInput.value.trim().toLowerCase();
            setLoading(true); // Definir o estado de carregamento como true
            const data = await Preview(disneyCharacter);
            setCharacters(data);
            setLoading(false); // Definir o estado de carregamento como false quando os dados estiverem prontos
        } catch (error) {
            console.error(error);
            errorMessageElement.textContent = "Erro ao buscar os dados dos personagens.";
            setLoading(false); // Definir o estado de carregamento como false em caso de erro
        }
    };

    return (
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
                <p id="errorMessage"></p>
                </main>

                <div id="charactersContainer">
                    {loading ? ( // Verificar se está carregando
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
        );
}

export default Research;
