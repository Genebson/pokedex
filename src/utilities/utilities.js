import { getPokemonData } from '../services/service.js';
import { createPokemonCard } from '../ui/ui.js';

export const fetchNextPagination = async (fetchLimit, offSetNumber) => {
  const allPokemons = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${fetchLimit}&offset=${offSetNumber}`)
    .then((response) => response.json());
  await Promise.all(allPokemons.results.map(async (pokemon) => {
    const pokemonData = await getPokemonData(pokemon);
    createPokemonCard(pokemonData);
  }));
};

export const fetchPrevPagination = async (offSetNumber) => {
  const allPokemons = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offSetNumber}`)
    .then((response) => response.json());
  await Promise.all(allPokemons.results.map(async (pokemon) => {
    const pokemonData = await getPokemonData(pokemon);
    createPokemonCard(pokemonData);
  }));
};
