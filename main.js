const container = document.getElementById("container");
//console.log(container);

const getcharacters = () => {
    fetch ("https://rickandmortyapi.com/api/character")
    .then (res => res.json())
    .then ((data) => renderCharacters (data))//console.log(data))
}

getcharacters();

const renderCharacters = (data) => {
    container.innerHTML = "";
    data.results.forEach(character => {
        container.innerHTML +=
        `<div class="card">
        <h2>${character.name}</h2>
        <img src="${character.image}" alt="">
        <button class="button" onClick=verDescripcion("${character.url}")>Ver Mas...</button>
        </div>`
    });
}

const verDescripcion = (characterURL) => {
    container.innerHTML = "" // borra el contenedor
    fetch (characterURL)
    .then (res => res.json())
    .then ((character) => {
    container.innerHTML =
        `<div class="card-detail">
        <h2>${character.name}</h2>
        <img src="${character.image}" alt="">
        <p>${character.status}</p>
        <button class="button" onClick=getcharacters()>Volver</button>
        </div>`
    })
}

