// CONTROLADOR PRINCIPAL

class MainController {
    constructor() {
        this._container = null;

        this._apiClient = new ApiClient();

        this._divAlmacenPokemon = null;
        this._pokedex = new Pokedex(this);
        this._pokemonesApiClient = new PokemonesApiClient(this._apiClient);

        this._divAlmacenDetalles = null;
        this._almacenDetalles = new AlmacenDetalles(this);

    }

    //METODO CUANDO CLIQUEAN UN POKEMON
    abrirDetalles(pokemon) {
        this._almacenDetalles.getAllDetallesAndPaint(pokemon, this._pokemonesApiClient);
    }

    init() {

        this.pintarEstructuraGeneral();
        this._pokedex.init(this._divPokedex, this._pokemonesApiClient);
        this._almacenDetalles.init(this._divAlmacenDetalles, this._detallesApiClient);

    }

    pintarEstructuraGeneral() {

        this._container = document.createElement("div");
        this._container.className = "container";
        document.body.appendChild(this._container);

        this._divPokedex = document.createElement("div");
        this._divPokedex.className = "almacen-Pokemones";
        this._container.appendChild(this._divPokedex);

        this._divAlmacenDetalles = document.createElement("div");
        this._divAlmacenDetalles.className = "almacen-Posts";
        this._container.appendChild(this._divAlmacenDetalles);

    }
}

class Pokemon {
    constructor(nombre, url, peso, altura, imagen) {

        this._nombre = nombre;
        this._url = url;
        this._peso = peso;
        this._altura = altura;
        this._imagen = imagen;

    }
}

class Pokedex {

    constructor(mc) {
        this._pokemones = [];
        this._paginaActual = 1;
        this._numeroTotalDePokemones = 0;
        this._contenedorHtml = null;
        this._pokemonesApiClient = null;
        this._mainControler = mc;
    }

    init(contenedorHtml, pokemonesApiClient) {

        this._contenedorHtml = contenedorHtml;
        this._pokemonesApiClient = pokemonesApiClient;
        this.pintarEstructuraPokemones();
        this.getAllPokemonesAndPaint(this.calcularOffset(this._paginaActual));
    }

    calcularOffset() {

        return (this._paginaActual - 1) * 20;
    }

    getAllPokemonesAndPaint(offset) {
        this._pokemonesApiClient.getPokemonesAtPage(offset).then((data) => {
            this.paintAllPokemones(data);

        });
    }

    paintAllPokemones(data) {

        let tbody = this._contenedorHtml.querySelector("tbody");
        tbody.innerHTML = "";

        for (let i = 0; i < data.pokemones.length; i++) {
            let pokemon = data.pokemones[i];
            let row = this.getRowForPokemon(pokemon);
            tbody.appendChild(row);
        }

        let span = this._contenedorHtml.querySelector("span");
        span.textContent = "Página " + this._paginaActual;
        this._numeroTotalDePokemones = data.numPokemons;
    }

    pintarEstructuraPokemones() {

        let estructura = `    
                    <h2 class="main-title">POKEMONES</h2>
                    <div id="div">
                    </div>
                    <form class="form-inline">

                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>NOMBRE</th>
                                    <th>DETALLE</th>                                    
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>`

        this._contenedorHtml.innerHTML = estructura;

        let div = this._contenedorHtml.querySelector("#div");
        let atras = document.createElement("button");
        atras.setAttribute("type", "button");
        atras.innerHTML = "Atras";
        div.appendChild(atras);
        let span = document.createElement("span");
        div.appendChild(span);
        atras.addEventListener("click", () => {
            this.getAllPokemonesAtras();

        });

        let siguiente = document.createElement("button");
        siguiente.setAttribute("type", "button");
        siguiente.innerHTML = "Siguiente";

        div.appendChild(siguiente);
        siguiente.addEventListener("click", () => {
            this.getAllPokemonesADelante();
        });
    }

    getAllPokemonesADelante() {

        if (this._paginaActual < (this._numeroTotalDePokemones / 20)) {
            this._paginaActual += 1;
            this.getAllPokemonesAndPaint(this.calcularOffset(this._paginaActual));
        }
    }

    getAllPokemonesAtras() {

        if (this._paginaActual > 1) {
            this._paginaActual -= 1;
            this.getAllPokemonesAndPaint(this.calcularOffset(this._paginaActual));
        }
    }

    getRowForPokemon(pokemon) {

        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.setAttribute("class", "hand");
        td1.innerHTML = pokemon._nombre;
        tr.appendChild(td1);
        let button = document.createElement("button");
        button.setAttribute("type", "button");
        button.innerHTML = "Detalle";
        tr.appendChild(button);
        button.addEventListener("click", () => {
            this._mainControler.abrirDetalles(pokemon)
        });

        return tr;
    }
}

class AlmacenDetalles {

    constructor(mc) {
        this._contenedorHtml = null;
        this._detallesApiClient = null;
        this._mainControler = mc;

    }

    init(contenedorHtml, detallesApiClient) {

        this._contenedorHtml = contenedorHtml;
        this._detallesApiClient = detallesApiClient;
        this.pintarEstructuraDetalles();
    }

    getAllDetallesAndPaint(pokemon, pokemonesApiClient) {
        pokemonesApiClient.getDetalles(pokemon).then((data) => {
            this.paintAllDetalles(data);

        });
    }

    paintAllDetalles(data) {

        let tbody = this._contenedorHtml.querySelector("tbody");
        tbody.innerHTML = "";

        let pokemon = data;
        let row = this.getRowForDetalles(pokemon);
        tbody.appendChild(row);
    }

    pintarEstructuraDetalles() {

        let estructura = `    
                    <h2 class="main-title">DETALLES</h2>

                    <form class="form-inline">

                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>NOMBRE</th>
                                    <th>PESO</th>
                                    <th>ALTURA</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>`

        this._contenedorHtml.innerHTML = estructura;

    }

    getRowForDetalles(pokemon) {

        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.setAttribute("class", "hand");
        td1.innerHTML = pokemon._nombre;
        tr.appendChild(td1);

        let td2 = document.createElement("td");
        td2.setAttribute("class", "hand");
        td2.innerHTML = pokemon._peso;
        tr.appendChild(td2);

        let td3 = document.createElement("td");
        td3.setAttribute("class", "hand");
        td3.innerHTML = pokemon._altura;
        tr.appendChild(td3);

        var imagen = document.createElement("img");
        imagen.setAttribute("src", pokemon._imagen);

        tr.appendChild(imagen);

        return tr;
    }
}

window.onload = () => {
    let mc = new MainController();
    mc.init();
}