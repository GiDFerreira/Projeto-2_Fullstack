import React from "react";

async function fetchData(disneyCharacterInput, errorMessageElement, charactersContainer) {
    try {
        const disneyCharacter = document.getElementById("disneyCharacter").value.trim().toLowerCase();
        
        const errorMessageElement = document.getElementById("errorMessage");
        errorMessageElement.textContent = "";

        if (disneyCharacter.length < 1 || disneyCharacter.length > 25) {
            errorMessageElement.textContent = "O nome do personagem deve ter entre 1 e 25 caracteres.";
            return;        
        }

        const response = await fetch(`https://api.disneyapi.dev/character?name=${disneyCharacter}`);

        if (!response.ok) {
            throw new Error("Não foi possível buscar os dados dos personagens");
        }

        const data = await response.json();
        const filteredCharacters = data.data;

        const charactersContainer = document.getElementById("charactersContainer");
        charactersContainer.innerHTML = "";

        if (filteredCharacters.length > 0) {
            filteredCharacters.forEach(character => {
                const characterDiv = document.createElement("div");
                characterDiv.classList.add("character");

                const characterNameElement = document.createElement("h3");
                characterNameElement.textContent = character.name;

                const characterImage = document.createElement("img");
                characterImage.src = character.imageUrl;
                characterImage.alt = character.name;

                const filmsListElement = document.createElement("ul");
                const films = character.films || [];
                if (films.length > 0) {
                    films.map(film => {
                        const filmItemElement = document.createElement("li");
                        filmItemElement.textContent = film;
                        filmsListElement.appendChild(filmItemElement);
                    });
                } else {
                    const noFilmsMessage = document.createElement("p");
                    noFilmsMessage.textContent = "Esse personagem não possui filmes";
                    filmsListElement.appendChild(noFilmsMessage);
                }

                characterDiv.appendChild(characterNameElement);
                characterDiv.appendChild(characterImage);
                characterDiv.appendChild(filmsListElement);
                charactersContainer.appendChild(characterDiv);
            });
        } else {
            charactersContainer.textContent = "Nenhum personagem encontrado com esse nome.";
        }
    } catch (error) {
        console.error(error);
    }
}

function Research(){

    const handleSubmit = async (event) => {
        event.preventDefault();

        const disneyCharacterInput = document.getElementById("disneyCharacter");
        const errorMessageElement = document.getElementById("errorMessage");
        const charactersContainer = document.getElementById("charactersContainer");
        
        await fetchData(disneyCharacterInput, errorMessageElement, charactersContainer);
    }
    
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    id="disneyCharacter"
                    type="text"
                    placeholder="Digite o nome do personagem da Disney"
                />
                <button type="submit">Buscar</button>
            </form>
            <p id="errorMessage"></p>
            <div id="charactersContainer"></div>
        </div>
    );
}

export default Research