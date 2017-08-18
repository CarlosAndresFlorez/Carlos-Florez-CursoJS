// CONTROLADOR PRINCIPAL

class MainController {
    constructor() {
        this._container = null;

        this._apiClient = new ApiClient();

        this._divAlmacenPokemon = null;
        this._almacenPokemones = new AlmacenPokemones(this);
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
        this._almacenPokemones.init(this._divAlmacenPokemones, this._pokemonesApiClient);
        this._almacenDetalles.init(this._divAlmacenDetalles, this._detallesApiClient);

    }

    pintarEstructuraGeneral() {

        this._container = document.createElement("div");
        this._container.className = "container";
        document.body.appendChild(this._container);

        this._divAlmacenPokemones = document.createElement("div");
        this._divAlmacenPokemones.className = "almacen-Pokemones";
        this._container.appendChild(this._divAlmacenPokemones);

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

class AlmacenPokemones {

    constructor(mc) {
        this._pokemones = [];
        this._paginaActual = 0;
        this._numeroTotalDePokemones = null;
        this._contenedorHtml = null;
        this._pokemonesApiClient = null;
        this._mainControler = mc;
    }

    init(contenedorHtml, pokemonesApiClient) {

        this._contenedorHtml = contenedorHtml;
        this._pokemonesApiClient = pokemonesApiClient;
        this.pintarEstructuraPokemones();
        this.getAllPokemonesAndPaint();
    }

    getAllPokemonesAndPaint() {
        this._pokemonesApiClient.getPokemonesAtPage("http://pokeapi.co/api/v2/pokemon/?offset=1").then((data) => {
            this.paintAllPokemones(data);

        });
    }

    getAllPokemonesAndPaintADelante(indice) {
        this._pokemonesApiClient.getPokemonesAtPage(indice).then((data) => {
            this.paintAllPokemones(data, this._pokemonesApiClient);
        });
    }

    getAllPokemonesAndPaintAtras(indice) {
        this._pokemonesApiClient.getPokemonesAtPage(indice).then((data) => {
            this.paintAllPokemones(data, this._pokemonesApiClient);
        });
    }

    paintAllPokemones(data) {

        let tbody = this._contenedorHtml.querySelector("tbody");
        tbody.innerHTML = "";

        for (let i = 0; i < data.length; i++) {
            let pokemon = data[i];
            let row = this.getRowForPokemon(pokemon);
            tbody.appendChild(row);
        }
    }

    pintarEstructuraPokemones() {

        let estructura = `    
                    <h1 class="main-title">POKEMONES</h1>

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

        let h1 = this._contenedorHtml.querySelector("h1");
        let atras = document.createElement("button");
        atras.setAttribute("type", "button");
        atras.innerHTML = "Atras";
        h1.appendChild(atras);

        let siguiente = document.createElement("button");
        siguiente.setAttribute("type", "button");
        siguiente.innerHTML = "Siguiente";

        h1.appendChild(siguiente);

        //prueba
        let url = "http://pokeapi.co/api/v2/pokemon/?offset=";
     
        let siguienteUrl= url +this._paginaActual;

        siguiente.addEventListener("click", () => {
            this.getAllPokemonesAndPaintADelante(siguienteUrl)
                this._paginaActual=this._paginaActual+1;
        });

    }

    getRowForPokemon(pokemon) {

        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.setAttribute("class", "hand");
        td1.innerHTML = pokemon._nombre;
        tr.appendChild(td1);

        let td2 = document.createElement("td");
        td2.setAttribute("class", "hand");
        td2.innerHTML = pokemon._url;
        tr.appendChild(td2);

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
                    <h1 class="main-title">DETALLES</h1>

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