import { getPokemon, getPokemonData } from './service';
import { onNextPageClick, onPreviousPageClick } from './ui';

const setupHandler = () => {
  getPokemon();
  getPokemonData();
};

const paginationHandler = () => {
  onNextPageClick();
  onPreviousPageClick();
};

setupHandler();
paginationHandler();
