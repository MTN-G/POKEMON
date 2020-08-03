const searchButton = document.getElementById("searchButon");
const searchInput = document.getElementById("search");
searchInput.placeholder="Search Your Pokemon..."
const results = document.getElementById("results");

function createContainer(data){
    const pokeArr = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('img'),
    ];
    pokeArr[0].innerHTML = `Name: ${data.name}`;
    pokeArr[1].innerHTML = `Height: ${data.height}`;
    pokeArr[2].innerHTML = `Weight: ${data.weight}`;
    pokeArr[3].src = data.sprites.front_default;
    pokeArr[3].addEventListener('mouseover',()=>{pokeArr[3].src=data.sprites.back_default});
    pokeArr[3].addEventListener('mouseout',()=>{pokeArr[3].src=data.sprites.front_default});

    pokeArr.forEach(element=>{results.appendChild(element)});
};


const searchPokemon = async (pokemonId) => {
    try {
    const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    console.log(data);
    createContainer(data);
    } catch(e) { alert(e.message)};
    };


searchButton.addEventListener('click', ()=>{
    results.innerHTML = ""
    searchPokemon(searchInput.value)});
