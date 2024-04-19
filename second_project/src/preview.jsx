async function Preview(disneyCharacter) {
    try {
        const response = await fetch(`https://api.disneyapi.dev/character?name=${disneyCharacter}`);

        if (!response.ok) {
            throw new Error("Não foi possível buscar os dados dos personagens");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export default Preview