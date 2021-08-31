const $container = document.querySelector('.pokemons')
const $cardBody = document.querySelectorAll('.card-body')
const $energySymbol = document.querySelectorAll('.energy-symbol')
const $prevBtn = document.querySelector('#prev-btn')
const $nextBtn = document.querySelector('#next-btn')
let currentPage = 1;
let previousPage;
let pokemonsPerPage = 12
let totalPages = Math.ceil(151 / pokemonsPerPage)

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
	const fetchLimit = currentPage === totalPages ? 7 : 12
	$container.innerHTML = ''

	for (let i = offSetNumber + 1; i <= offSetNumber + fetchLimit; i++) {
		const pokemonCardContainer = document.createElement('div')
		const skeletonDiv = document.createElement('div')
		skeletonDiv.className = 'skeleton'
		skeletonDiv.style.backgroundImage = `url('./src/imgs/cards/card/card-backside.png')`
		pokemonCardContainer.className = 'pokemon-card'
		pokemonCardContainer.id = `pokemon-id-${i}`
		$container.appendChild(pokemonCardContainer)
		pokemonCardContainer.appendChild(skeletonDiv)
	}

	fetch(`https://pokeapi.co/api/v2/pokemon?limit=${fetchLimit}&offset=${offSetNumber}`)
		.then(response => response.json())
		.then(allPokemons => {
			allPokemons.results.forEach(pokemon => {
				fetchPokemonData(pokemon)
			})
		})

	hideButtons()
}

const onPreviousPageClick = () => {
	currentPage--
	const offSetNumber = currentPage * pokemonsPerPage - pokemonsPerPage
	$container.innerHTML = ''

	for (let i = offSetNumber + 1; i <= offSetNumber + pokemonsPerPage; i++) {
		const pokemonCardContainer = document.createElement('div')
		const skeletonDiv = document.createElement('div')
		skeletonDiv.className = 'skeleton'
		skeletonDiv.style.backgroundImage = `url('./src/imgs/cards/card/card-backside.png')`
		pokemonCardContainer.className = 'pokemon-card'
		pokemonCardContainer.id = `pokemon-id-${i}`
		$container.appendChild(pokemonCardContainer)
		pokemonCardContainer.appendChild(skeletonDiv)
	}

	fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offSetNumber}`)
		.then(response => response.json())
		.then(allPokemons => {
			allPokemons.results.forEach(pokemon => {
				fetchPokemonData(pokemon)
			})
		})

	hideButtons()
}

const hideButtons = () => {
	if (currentPage === 1) {
		$prevBtn.style.display = 'none'
	}

	if (currentPage === 2) {
		$prevBtn.style.display = 'inline-block'
	} else if (currentPage === 13) {
		$nextBtn.style.display = 'none'
	}

	if (currentPage === 13) {
		$nextBtn.style.display = 'none'
	} else if (currentPage < 13) {
		$nextBtn.style.display = 'inline-block'
	}
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
						<img src="${pokemonEnergy}">
					</div>
				</div>
			</div>
			<div class="pokemon">
				<img src="${sprites.other['official-artwork'].front_default}" alt="${name}" class="pokemon-img">
			</div>
			<div class="stats">
				<span>Height: ${height}, Weight: ${weight}lbs.</span>
			</div>
			<div class="attacks">
				<div class="specific-attack">
					<div class="energy">
						<img src="${pokemonEnergy}">
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
					<img src="./src/imgs/cards/energy/electric.png" alt="Electric Energy Symbol">
				</div>
				<div class="resistance">
					<p>resistance</p>
				</div>
				<div class="retreat-cost">
					<p>retreat cost</p>
					<img src="./src/imgs/cards/energy/normal.png" alt="Normal Energy Symbol">
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
	$pokemonCard.innerHTML = ''
	$pokemonCard.appendChild(pokemonContainer)
}

$nextBtn.addEventListener('click', onNextPageClick)
$prevBtn.addEventListener('click', onPreviousPageClick)
getPokemon()