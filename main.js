const container = document.getElementById("container");
const botonNext = document.getElementById("boton-next");
const botonPrev = document.getElementById("boton-prev");
const filtroGenero = document.getElementById("filtroGenero");
const botonPrimera = document.getElementById("boton-primera");
const botonUltima = document.getElementById("boton-ultima");

//console.log(filtroGenero.value);
//console.log(container);
let paginacion = 1;
let totalPaginas = 1;
let filtro = "";
//let valorfiltro="unknown"
//let todo = "female&gender=male&gender=genderless&gender=unknown";

const getPersonajes = (paramFiltro, pag) => {
    // console.log(paramFiltro,pag);
    container.innerHTML = ""; // borra el contenedor

    fetch(`https://rickandmortyapi.com/api/character/?page=${pag}${paramFiltro}`)

        .then(res => res.json())
        .then((data) => {
            totalPaginas = data.info.pages;
            renderPersonajes(data);
            //console.log("total paginas en fetch",totalPaginas)
        })


}
botonPrimera.setAttribute("disabled", true);
botonPrev.setAttribute("disabled", true);
getPersonajes(filtro, paginacion);



const renderPersonajes = (data) => {
    //console.log(data);
    //console.log("total paginas en render",totalPaginas)
    if (totalPaginas == 1) {
        //console.log ("totalPaginas==1")
        botonNext.disabled = true;
        botonUltima.disabled = true;
        botonPrimera.disabled = true;
        botonPrimera.disabled = true;
    }
    data.results.forEach(personaje => {
        container.innerHTML +=
            `<div class="card">
                <div class="frente">
                    <h2>${personaje.name}</h2>
                    <img src="${personaje.image}" alt="">
                </div>
                <div class="atras">
                    <h1>${personaje.name}</h1>
                    <p><strong>Origen:</strong> ${personaje.origin.name}</p>
                    <p><strong>Especie:</strong> ${personaje.species}</p>
                    <p><strong>Estado:</strong> ${personaje.status}</p>
                    <p><strong>Género:</strong> ${personaje.gender}</p>
                </div>
            <div>`
    });
}

/*const verDescripcion = (personajeURL) => {
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
}*/
botonPrev.addEventListener("click", () => {
    //console.log(paginacion)
    if (paginacion <= totalPaginas && paginacion > 1) {
        botonNext.removeAttribute("disabled", false);
        paginacion--;
        botonPrev.removeAttribute("disabled", false);
        botonPrimera.disabled = false;
        botonUltima.disabled = false;
    }

    if (paginacion <= 1) {
        botonPrev.setAttribute("disabled", true);
        botonPrimera.disabled = true;
    }

    //console.log(`llamo desde PREV a getPersonajes con ${paginacion}`)
    getPersonajes(filtro, paginacion);
});

botonNext.addEventListener("click", () => {
   // console.log(paginacion)
    if (paginacion == 1) {  //si estoy en la pag 1
        if (totalPaginas == 1){  // si solo hay una pagina
            botonNext.disabled = true;
            botonUltima.disabled = true;
            botonPrev.disabled = true;
            botonPrimera.disabled = true;
        }
        else{ // si hay mas de una pagina
        botonPrev.disabled = false;
        botonPrimera.disabled = false;
        botonNext.disabled = false;
        botonUltima.disabled = false;
        paginacion++;
        }
       
    } else {
        if (paginacion > 1 && paginacion < totalPaginas)  paginacion++;
        }
    if (paginacion == totalPaginas) {
        botonNext.disabled = true;
        botonUltima.disabled = true;
        // console.log("entra ultimo else",paginacion)
    }
    //console.log(`llamo desde NEXT a getPersonajes con ${paginacion}`)
    getPersonajes(filtro, paginacion);
});

botonPrimera.addEventListener("click", () => {
    botonPrimera.disabled = true;
    botonPrev.disabled = true;
    if (totalPaginas == 1){
        botonNext.disabled = true;
        botonUltima.disabled = true;
    }
    else {
        botonNext.disabled = false;
        botonUltima.disabled = false;
    }
    getPersonajes(filtro, paginacion = 1);

});

botonUltima.addEventListener("click", () => {
    paginacion = totalPaginas;
    if (totalPaginas == 1){
        botonPrimera.disabled = true;
        botonNext.disabled = true;
    }
    else{
        botonPrimera.disabled = false;
        botonPrev.disabled = false;
    }
    botonNext.disabled = true;
    botonUltima.disabled = true;
    getPersonajes(filtro, paginacion);
});

filtroGenero.addEventListener("change", () => {
    // console.log(filtroGenero);
    if (filtroGenero.value == "todos") filtro = "";
    else filtro = `&gender=${filtroGenero.value}`;
    botonUltima.disabled = false;
    botonNext.disabled = false;
    botonPrev.setAttribute("disabled", true);
    botonPrimera.disabled = true;
    getPersonajes(filtro, paginacion = 1);
});