import { getPokemonData } from '../services/service.js';

export const fetchNextPagination = (fetchLimit, offSetNumber) => {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=${fetchLimit}&offset=${offSetNumber}`)
    .then((response) => response.json())
    .then((allPokemons) => {
      allPokemons.results.forEach((pokemon) => {
        setTimeout(() => {
          getPokemonData(pokemon);
        }, 500);
      });
    });
};

export const fetchPrevPagination = (offSetNumber) => {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offSetNumber}`)
    .then((response) => response.json())
    .then((allPokemons) => {
      allPokemons.results.forEach((pokemon) => {
        setTimeout(() => {
          getPokemonData(pokemon);
        }, 500);
      });
    });
};
