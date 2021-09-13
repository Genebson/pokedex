import { fetchNextPagination, fetchPrevPagination } from '../utilities/utilities.js';

const $container = document.querySelector('.pokemons');
const $prevBtn = document.querySelector('#prev-btn');
const $nextBtn = document.querySelector('#next-btn');
let currentPage = 1;
const pokemonsPerPage = 12;
const totalPages = Math.ceil(151 / pokemonsPerPage);

const hideButtons = () => {
  if (currentPage === 1) {
    $prevBtn.style.display = 'none';
  }

  if (currentPage === 2) {
    $prevBtn.style.display = 'inline-block';
  } else if (currentPage === 13) {
    $nextBtn.style.display = 'none';
  }

  if (currentPage === 13) {
    $nextBtn.style.display = 'none';
  } else if (currentPage < 13) {
    $nextBtn.style.display = 'inline-block';
  }
};

export const onNextPageClick = () => {
  currentPage++;
  const offSetNumber = currentPage * pokemonsPerPage - pokemonsPerPage;
  const fetchLimit = currentPage === totalPages ? 7 : 12;
  $container.innerHTML = '';

  for (let i = offSetNumber + 1; i <= offSetNumber + fetchLimit; i++) {
    const pokemonCardContainer = document.createElement('div');
    const skeletonDiv = document.createElement('div');
    skeletonDiv.className = 'skeleton';
    skeletonDiv.style.backgroundImage = 'url(\'./src/imgs/cards/card/card-backside.png\')';
    pokemonCardContainer.className = 'pokemon-card';
    pokemonCardContainer.id = `pokemon-id-${i}`;
    $container.appendChild(pokemonCardContainer);
    pokemonCardContainer.appendChild(skeletonDiv);
  }
  fetchNextPagination();
  window.scrollTo(0, 0);
  hideButtons();
};

export const onPreviousPageClick = () => {
  currentPage--;
  const offSetNumber = currentPage * pokemonsPerPage - pokemonsPerPage;
  $container.innerHTML = '';

  for (let i = offSetNumber + 1; i <= offSetNumber + pokemonsPerPage; i++) {
    const pokemonCardContainer = document.createElement('div');
    const skeletonDiv = document.createElement('div');
    skeletonDiv.className = 'skeleton';
    skeletonDiv.style.backgroundImage = 'url(\'./src/imgs/cards/card/card-backside.png\')';
    pokemonCardContainer.className = 'pokemon-card';
    pokemonCardContainer.id = `pokemon-id-${i}`;
    $container.appendChild(pokemonCardContainer);
    pokemonCardContainer.appendChild(skeletonDiv);
  }
  fetchPrevPagination();
  window.scrollTo(0, 0);
  hideButtons();
};
export const prevPage = () => {
  $nextBtn.addEventListener('click', onNextPageClick);
};

export const nextPage = () => {
  $prevBtn.addEventListener('click', onPreviousPageClick);
};
