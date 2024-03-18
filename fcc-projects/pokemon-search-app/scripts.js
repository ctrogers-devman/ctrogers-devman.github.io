const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonImage = document.getElementById("avatar-vessel");
const pokemonTypes = document.getElementById("types");
const pokemonStats = document.querySelectorAll("td:nth-child(even)");

const regFemale = /[♀]/g;
const regMale = /[♂]/g;

const fetchData = () => {
  let inputName = searchInput.value.toLowerCase();
  if (!inputName) {
    alert("Please enter a name.");
    clearVessel();
    return;
  }
  if (inputName.search(regFemale) >= 0) {
    inputName = inputName.replace(regFemale, "") + "-f";
  } else if (inputName.search(regMale) >= 0) {
    inputName = inputName.replace(regFemale, "") + "-m";
  }
  
  fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${inputName}`)
  .then((res) => res.json())
  .then((data) => {
    const pokemonDataObj = data;
    displayPokemon(pokemonDataObj);  
  })
  .catch((err) => {
    console.log(err);
    alert("Pok\u00E9mon not found");
    clearVessel();
  });
};

searchButton.addEventListener("click", (e) => fetchData());

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchData();
  }
});

const displayPokemon = (pokemonObj) => {
  const pName = pokemonObj.name;
  const pId = pokemonObj.id;
  const pHeight = pokemonObj.height;
  const pWeight = pokemonObj.weight;
  const pImageUrl = pokemonObj.sprites.front_default;
  const pTypes = pokemonObj.types;
  const pStats = pokemonObj.stats;

  pokemonName.innerText = pName.toUpperCase();
  pokemonId.innerText = `#${pId}`;
  pokemonWeight.innerText = `Weight: ${pWeight}`;
  pokemonHeight.innerText = `Height: ${pHeight}`;
  pokemonImage.innerHTML = `<img id="sprite" src="${pImageUrl}" alt="${pName} front default sprite">`;

  if (pTypes.length > 0) {
    let typeString = ``;
    pTypes.forEach((type) => {
      const typeName = type.type.name;
      typeString += `<span class="type ${typeName}">${typeName.toUpperCase()}</span>`;
    });
    pokemonTypes.innerHTML = typeString;
  }

  if (pStats.length > 0) {
    pStats.forEach((stat) => {
      const statName = stat.stat.name;
      const stateValue = stat.base_stat;
      document.getElementById(statName).innerText = stateValue;
    });
  }
};

const clearVessel = () => {
  searchInput.value = "";
  pokemonName.innerText = "";
  pokemonId.innerText = "";
  pokemonWeight.innerText = "";
  pokemonHeight.innerText = "";
  pokemonImage.innerHTML = "";
  pokemonTypes.innerHTML = "";
  pokemonStats.forEach((el) => {
     el.innerText = "";
  });
};
