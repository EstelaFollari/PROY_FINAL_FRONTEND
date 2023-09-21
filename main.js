const container = document.getElementById("container");
const botonNext = document.getElementById("boton-next");
const botonPrev = document.getElementById("boton-prev");
const filtroGenero = document.getElementById("filtroGenero");

//console.log(filtroGenero.value);
//console.log(container);
let paginacion = 1;
let totalPaginas = 1;
let filtro="";
//let valorfiltro="unknown"
//let todo = "female&gender=male&gender=genderless&gender=unknown";

const getPersonajes = (paramFiltro,pag) => {
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
botonPrev.setAttribute("disabled", true);
getPersonajes(filtro,paginacion);



const renderPersonajes = (data) => {
    //console.log(data);
    //console.log("total paginas en render",totalPaginas)
    if (totalPaginas == 1) {
        //console.log ("totalPaginas==1")
        botonNext.setAttribute("disabled", false);
     }
     //else { botonNext.setAttribute("enabled", true); }         
   
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
    }

    if (paginacion <= 1) {
        botonPrev.setAttribute("disabled", true);
    }

    //console.log(`llamo desde PREV a getPersonajes con ${paginacion}`)
    getPersonajes(filtro,paginacion);
});

botonNext.addEventListener("click", () => {
    //console.log(paginacion)
    if (paginacion <= 1) {
        botonPrev.removeAttribute("disabled", false);
        if (totalPaginas>1) paginacion++;
        else botonNext.setAttribute("disabled", false);
    } else {
        if (paginacion > 1 && paginacion < totalPaginas) {
            //botonNext.setAttribute("disabled", false);
            paginacion++;
            //console.log("entra", paginacion)
        }
    }
    if (paginacion == totalPaginas) {
        botonNext.setAttribute("disabled", false);
       // console.log("entra ultimo else",paginacion)
    }
    //console.log(`llamo desde NEXT a getPersonajes con ${paginacion}`)
    getPersonajes(filtro,paginacion);
});

filtroGenero.addEventListener("change", () => {
   // console.log(filtroGenero);
    if (filtroGenero.value == "todos") filtro = "";
    else filtro = `&gender=${filtroGenero.value}`;
    
    botonNext.disabled = false;
    botonPrev.setAttribute("disabled", true);
    getPersonajes(filtro,paginacion=1);
});