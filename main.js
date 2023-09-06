const container = document.getElementById("container");
const botonNext = document.getElementById("boton-next");
const botonPrev = document.getElementById("boton-prev");

const filtroGenero = document.getElementById("filtroGenero");


//console.log(filtroGenero);
//console.log(container);
let paginacion = 1;
let totalPaginas = 1;
const getPersonajes = (pag) => {
    container.innerHTML = ""; // borra el contenedor
    fetch(`https://rickandmortyapi.com/api/character/?page=${pag}`)
        .then(res => res.json())
        .then((data) => {
            renderPersonajes(data);
            totalPaginas = data.info.pages;
            //console.log(totalPaginas)
        })
}


botonPrev.setAttribute("disabled", true);
getPersonajes(paginacion);



const renderPersonajes = (data) => {
    //console.log(data);
    data.results.forEach(personaje => {
        container.innerHTML +=
            `<div class="card">
        <h2>${personaje.name}</h2>
        <img src="${personaje.image}" alt="">
        <button class="button" onClick=verDescripcion("${personaje.url}")>Ver Mas...</button>
        </div>`
    });
}

const verDescripcion = (personajeURL) => {
    fetch(personajeURL)
        .then(res => res.json())
        .then((personaje) => {
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
botonPrev.addEventListener("click", () => {
    console.log(paginacion)
    if (paginacion <= totalPaginas && paginacion > 1) {
        botonNext.removeAttribute("disabled", false);
        paginacion--;
        botonPrev.removeAttribute("disabled", false);
    }

    if (paginacion <= 1) {
        botonPrev.setAttribute("disabled", true);
    }

    console.log(`llamo desde PREV a getPersonajes con ${paginacion}`)
    getPersonajes(paginacion);
});

botonNext.addEventListener("click", () => {
    console.log(paginacion)
    if (paginacion <= 1) {
        botonPrev.removeAttribute("disabled", false);
        paginacion++;
    } else {
        if (paginacion > 1 && paginacion < totalPaginas) {
            //botonNext.setAttribute("disabled", false);
            paginacion++;
            //console.log("entra", paginacion)
        }

    }


    if (paginacion == totalPaginas) {
        botonNext.setAttribute("disabled", false);
        //console.log("entra ultimo else",paginacion)
    }
    console.log(`llamo desde NEXT a getPersonajes con ${paginacion}`)
    getPersonajes(paginacion);
});

filtroGenero.addEventListener("change", () => {
    console.log(filtroGenero);
    getPersonajes(42);
});