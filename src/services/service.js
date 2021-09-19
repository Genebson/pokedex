export const getPokemonData = (pokemon) => {
  const { url } = pokemon;
  return fetch(url)
    .then((response) => response.json());
};

export const getPokemon = () => fetch('https://pokeapi.co/api/v2/pokemon?limit=12')
  .then((response) => response.json());
