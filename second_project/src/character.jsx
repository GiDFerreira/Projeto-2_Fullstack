function Character({ name, imageUrl, films }) {
    return (
        <div className="character">
            <h3>{name}</h3>
            <img src={imageUrl} alt={name} />
            <ul>
                {films.length > 0 ? (
                    films.map((film, index) => (
                        <li key={index}>{film}</li>
                    ))
                ) : (
                    <li>Esse personagem não possui filmes</li>
                )}
            </ul>
        </div>
    );
}

export default Character;