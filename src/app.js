import { getPokemon, getPokemonData } from './services/service.js';
import { onNextPageClick, onPreviousPageClick } from './pagination/pagination.js';

const setupHandler = async () => {
  getPokemon();
  getPokemonData();
};

const paginationHandler = async () => {
  onNextPageClick();
  onPreviousPageClick();
};

setupHandler();
paginationHandler();
