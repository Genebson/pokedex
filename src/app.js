import { getPokemon, getPokemonData } from './services/service';
import { onNextPageClick, onPreviousPageClick } from './pagination/pagination';

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
