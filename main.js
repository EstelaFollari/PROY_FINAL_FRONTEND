const container = document.getElementById("container");
//console.log(container);

const getPersonajes = () => {
    fetch ("https://rickandmortyapi.com/api/character")
    .then (res => res.json())
    .then ((data) => renderPersonajes(data))//console.log(data))
}

getPersonajes();

const renderPersonajes = (data) => {
    container.innerHTML = "";
    data.results.forEach(personaje =>{
        container.innerHTML +=
        `<div class="card">
        <h2>${personaje.name}</h2>
        <img src="${personaje.image}" alt="">
        <button class="button" onClick=verDescripcion("${personaje.url}")>Ver Mas...</button>
        </div>`
    });
}

const verDescripcion = (personajeURL) => {
    container.innerHTML = ""; // borra el contenedor
    fetch (personajeURL)
    .then (res => res.json())
    .then ((personaje) => {
    container.innerHTML =
        `<div class="card-detail">
        <h1>${personaje.name}</h1>
        <img src="${personaje.image}" alt="">
        <p><strong>Origen:</strong> ${personaje.origin.name}</p>
        <p><strong>Especie:</strong> ${personaje.species}</p>
        <p><strong>Estado:</strong> ${personaje.status}</p>
        <p><strong>Género:</strong> ${personaje.gender}</p>
        <button class="button" onClick=getPersonajes()>Volver</button>
        </div>`
    })
}

