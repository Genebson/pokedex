import { getPokemon } from './services/service.js';
import { prevPage, nextPage } from './pagination/pagination.js';

function setupHandler() {
  getPokemon();
}

function paginationHandler() {
  prevPage();
  nextPage();
}

setupHandler();
paginationHandler();
