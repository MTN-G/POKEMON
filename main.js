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

    for (let i = 0; i < data.types.length; i++){
        let li = document.createElement('li') 
        li.innerHTML = data.types[i].type.name;
        pokeArr[3].appendChild(li);
        li.addEventListener('click', ()=>pokemonInType(li.innerText)) 
    };
}

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

const pokemonInType = async(type)=>{
    const res = await axios.get(`http://pokeapi.co/api/v2/type/${type}`)
    console.log(res.data.pokemon[0].pokemon.name)
    const list = document.createElement('ul');
    list.innerText= `Other pokemon of this type:`;
    for (let x of res.data.pokemon) {
        const name = x.pokemon.name;
        const item = document.createElement('li');
        item.innerText = name;
        list.appendChild(item);
    }
    results.appendChild(list);

}






