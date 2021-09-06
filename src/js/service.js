import { createPokemonCard } from './ui';

export const getPokemonData = (pokemon) => {
  const { url } = pokemon;
  fetch(url)
    .then((response) => response.json())
    .then((pokemonData) => {
      createPokemonCard(pokemonData);
    });
};

export const getPokemon = () => {
  fetch('https://pokeapi.co/api/v2/pokemon?limit=12')
    .then((response) => response.json())
    .then((allPokemons) => {
      allPokemons.results.forEach((pokemon) => {
        getPokemonData(pokemon);
      });
    });
};