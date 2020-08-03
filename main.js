const searchButton = document.getElementById("searchButon");
const searchInput = document.getElementById("search");
searchInput.placeholder="Search Your Pokemon..."
const results = document.getElementById("results");

function createContainer(data){
    const pokeArr = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('ul'),
        document.createElement('img')
    ];
    pokeArr[0].innerHTML = `Name: ${data.name}`;
    pokeArr[1].innerHTML = `Height: ${data.height}`;
    pokeArr[2].innerHTML = `Weight: ${data.weight}`;
    pokeArr[3].innerHTML = ``
    pokeArr[4].src = data.sprites.front_default;
    pokeArr[4].addEventListener('mouseover',()=>{pokeArr[4].src=data.sprites.back_default});
    pokeArr[4].addEventListener('mouseout',()=>{pokeArr[4].src=data.sprites.front_default});

    pokeArr.forEach(element=>{results.appendChild(element)});

    const types = []
    for (let i = 0; i < data.types.length; i++){
        let li = document.createElement('li') 
        li.innerHTML = data.types[i].type.name;
        pokeArr[3].appendChild(li);
    }
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
