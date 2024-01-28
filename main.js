const pokemon = [ "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran♀", "Nidorina", "Nidoqueen", "Nidoran♂", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetch'd", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew" ];
/************************************************/
const baseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/";
const pokeApiUrl = "https://pokeapi.co/api/v2/";
const container = document.querySelector(".container");
let cards = ""; //separating HTML generation and injection
const parser = new DOMParser();

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector("#closeModal");

const modalPokeInfo = document.querySelector(".modal-pokemon-info");
const modalPokeImg = document.querySelector("#modalPokeImg");
const modalPokeName = document.querySelector("#modal-poke-name");
const modalPokeId = document.querySelector("#modal-poke-id");
const modalPokeType = document.querySelector("#modal-poke-type");
const modalPokeHW = document.querySelector("#modal-poke-hw"); 
const modalPokeMoves = document.querySelector("#modal-poke-moves"); 
/************************************************/

document.addEventListener("DOMContentLoaded", () => {
  //card creation
  generateCards();
  closeModalBtn.addEventListener("click",closeModal);
  document.addEventListener("click",(e) => { 
    if(e.target.className === "overlay"){ 
      closeModal();
    } 
  });
});

/********************************************************/
function generateCards(){
  for(let i=0;i<pokemon.length;i++){
  cards =
`<div class="pokemon center-align" onclick="openModal(${i+1});">
    <img class= "pokemon-img" src="${baseUrl}${i+1}.png" alt="${pokemon[i]}">
    <span class="pokemon-label text-bold">#${i+1}</span>
    <span class="pokemon-name text-bold">
    ${pokemon[i]}</span>
  </div>
`;
  
   const doc = parser.parseFromString(cards, 'text/html');
   container.appendChild(doc.body.firstChild);
  }
}

const openModal = async function (pokemonId) {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  showPokemon(pokemonId);
  fetchPokemonData(pokemonId);
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  modalPokeImg.src = "";
};

const showPokemon = async(pokeId) => {
  const data = await fetchPokemonData(pokeId);
  
  modalPokeName.innerText = data.name;
  modalPokeId.innerText = `#${data.id}`
  
  modalPokeImg.src = "";
  modalPokeImg.src = data.sprites.other.dream_world.front_default;
  
  let types = data.types.map((obj) => obj.type.name).toString().replaceAll(","," / ");
  modalPokeType.innerText = `A ${types} Pokemon`;
  
  modalPokeHW.innerText = `Height: ${data.height / 10} m | Weight: ${data.weight / 10} kg`;
  
  let moves = data.moves;
  modalPokeMoves.replaceChildren();
  
  for(let i=0;i<4;i++){
    let li = document.createElement("li");
    li.innerText = moves[i].move.name;
    modalPokeMoves.append(li)
  }
}

const fetchPokemonData = async(pokeId) => {
  let res = await fetch(pokeApiUrl+"pokemon/"+pokeId);
  let mainData =  await res.json();
  
  return mainData;
}