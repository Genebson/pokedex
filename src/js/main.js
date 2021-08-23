const $container = document.querySelector('.pokemons')
const $cardBody = document.querySelectorAll('.card-body')
const $energySymbol = document.querySelectorAll('.energy-symbol')
const $prevBtn = document.querySelector('#prev-btn')
const $nextBtn = document.querySelector('#next-btn')
let currentPage = 1;
let previousPage;
let totalPages;
let pokemonsPerPage = 12

function getPokemon() {
	fetch('https://pokeapi.co/api/v2/pokemon?limit=12')
		.then(response => response.json())
		.then(allPokemons => {
			allPokemons.results.forEach(pokemon => {
				fetchPokemonData(pokemon);
			})
		})
}

function fetchPokemonData(pokemon) {
	let url = pokemon.url
	fetch(url)
		.then(response => response.json())
		.then(pokemonData => {
			createPokemonCard(pokemonData)
		})
}

const getPokemonType = (pokemon) => {
	const typeName = pokemon.types[0].type.name
	return `card-body-${typeName}`
}

const getPokemonEnergy = (pokemon) => {
	const typeName = pokemon.types[0].type.name
	return `./src/imgs/cards/energy/${typeName}.png`
}

const onNextPageClick = () => {
	currentPage++
	const offSetNumber = currentPage * pokemonsPerPage - pokemonsPerPage

	for (let i = offSetNumber + 1; i < offSetNumber; i++) {
		console.log(offSetNumber);
		const pokemonCardContainer = document.createElement('div')
		pokemonCardContainer.className = 'pokemon-card'
		pokemonCardContainer.id = `pokemon-id-${i}`
		$container.appendChild(pokemonCardContainer)
	}

	fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offSetNumber}`)
		.then(response => response.json())
		.then(allPokemons => {
			allPokemons.results.forEach(pokemon => {
				fetchPokemonData(pokemon)
			})
		})
}

const onPreviousPageClick = () => {

}

const createPokemonCard = (pokemon) => {
	const pokemonBackground = getPokemonType(pokemon)
	const pokemonEnergy = getPokemonEnergy(pokemon)
	const { id, name, sprites, stats, weight, height, moves } = pokemon
	const pokemonContainer = document.createElement('div')
	pokemonContainer.className = `card-body ${pokemonBackground}`

	const pokemonInnerHTML = `
			<div class="header">
				<p class="basic">Basic Pokémon</p>
				<div class="name-health">
					<p class="name">${name.charAt(0).toUpperCase()}${name.slice(1)}</p>
					<div class="floatRight">
						<p class="health">${stats[0].base_stat}${stats[0].stat.name.toUpperCase()}</p>
						<img src="${pokemonEnergy}" alt="Water Energy Symbol">
					</div>
				</div>
			</div>
			<div class="pokemon">
				<img src="${sprites.other['official-artwork'].front_default}" alt="${name}">
			</div>
			<div class="stats">
				<span>Height: ${height}, Weight: ${weight}lbs.</span>
			</div>
			<div class="attacks">
				<div class="specific-attack">
					<div class="energy">
						<img src="${pokemonEnergy}" alt="Water Energy Symbol">
					</div>
					<div class="attack-description">
						<p><span class="attack-name">${moves[0].move.name.charAt(0).toUpperCase()}${moves[0].move.name.slice(1)}</span> Flip a coin. If heads, the Defending Pok&eacutemon is now
							Paralyzed.
						</p>
					</div>
					<div class="power">${stats[1].base_stat}</div>
				</div>
				<hr>
			</div>
			<div class="attributes">
				<div class="weakness">
					<p>weakness</p>
					<img src="https://jcr08.github.io/pokemon-card/images/electric-energy.png" alt="Electric Energy Symbol">
				</div>
				<div class="resistance">
					<p>resistance</p>
				</div>
				<div class="retreat-cost">
					<p>retreat cost</p>
					<img src="https://jcr08.github.io/pokemon-card/images/normal-energy.png" alt="Normal Energy Symbol">
				</div>
			</div>
			<div class="description">
				<p>After birth, its back swells and hardens into a shell. It powerfully sprays foam from its mouth. LV. 8 #7</p>
			</div>
			<div class="footer">
				<div><strong>Illus.MitsuhiroArica</strong>
					©1995,96,98,99NintendoCreaturesGAMEFREAK©1999Wizards
					<strong>${id}/151●</strong>
				</div>
			</div>  
    `
	const $pokemonCard = document.getElementById(`pokemon-id-${id}`)

	pokemonContainer.innerHTML = pokemonInnerHTML
	$pokemonCard.appendChild(pokemonContainer)
}

$nextBtn.addEventListener('click', onNextPageClick)
getPokemon()