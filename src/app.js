import { getPokemon, getPokemonData } from './services/service.js';
import { createPokemonCard } from './ui/ui.js';
import { prevPage, nextPage } from './pagination/pagination.js';

async function setupHandler() {
  const allPokemons = await getPokemon();
  console.log(allPokemons);
  await Promise.all(allPokemons.results.map(async (pokemon) => {
    const pokemonData = await getPokemonData(pokemon);
    createPokemonCard(pokemonData);
  }));
}

function paginationHandler() {
  prevPage();
  nextPage();
}

setupHandler();
paginationHandler();
