class MainController {
    constructor() {
        this._container = null;
        this._divAlmacenSuperHeroes = null;
        this._apiClient = new ApiClient();
        this._almacenSuperHeroes = new AlmacenSuperHeroes();
        this._superHeroesApiClient = new SuperHeroApiClient(this._apiClient);
    }

    init() {

        this.pintarEstructura();
        this._almacenSuperHeroes.init(this._divAlmacenSuperHeroes, this._superHeroesApiClient);
    }

    pintarEstructura() {

        this._container = document.createElement("div");
        this._container.className = "container";

        this._divAlmacenSuperHeroes = document.createElement("div");
        this._divAlmacenSuperHeroes.className = "almacen-SuperHeroes";

        this._container.appendChild(this._divAlmacenSuperHeroes);
        document.body.appendChild(this._container);
    }
}

class Superheroe {
    constructor(identificador, apodo, arma, trabajo, deuda) {
        this._identificador = identificador;
        this._apodo = apodo;
        this._arma = arma;
        this._trabajo = trabajo;
        this._deuda = deuda;
    }
}

class AlmacenSuperHeroes {

    constructor() {
        this._superHeroes = [];
        this._contenedorHtml = null;
        this._superHeroesApiClient = null;
    }

    init(contenedorHtml, superHeroesApiClient) {

        this._contenedorHtml = contenedorHtml;
        this._superHeroesApiClient = superHeroesApiClient;
        this.pintarEstructura();
        this.getAllSuperHeroesAndPaint();
    }

    getAllSuperHeroesAndPaint() {
        this._superHeroesApiClient.getAllSuperHeroes().then((data) => {
            this.paintAllSuperHeroes(data);

        });
    }

    paintAllSuperHeroes(data) {
        console.log(data);
        let tbody = this._contenedorHtml.querySelector("tbody");
        tbody.innerHTML = "";

        for (let i = 0; i < data.length; i++) {
            let superHeroe = data[i];
            let row = this.getRowForSuperHeroe(superHeroe);
            tbody.appendChild(row);
        }
    }

    crearSuperHeroe() {

        let nombre = this._contenedorHtml.querySelector("#nombre").value;
        let arma = this._contenedorHtml.querySelector("#arma").value;
        let profesion = this._contenedorHtml.querySelector("#profesion").value;
        let deuda = this._contenedorHtml.querySelector("#deuda").checked;

        let superHeroe = new Superheroe(null, nombre, arma, profesion, deuda);
        this._superHeroesApiClient.createSuperHeroe(superHeroe).then((data) => {
            this.getAllSuperHeroesAndPaint();

        });
    }

    getRowForSuperHeroe(superHeroe) {

        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.innerHTML = superHeroe._identificador;
        tr.appendChild(td1);

        let td2 = document.createElement("td");
        td2.innerHTML = superHeroe._apodo;
        tr.appendChild(td2);

        let td3 = document.createElement("td");
        td3.innerHTML = superHeroe._arma;
        tr.appendChild(td3);

        let td4 = document.createElement("td");
        td4.innerHTML = superHeroe._trabajo;
        tr.appendChild(td4);

        let td5 = document.createElement("td");
        td5.innerHTML = superHeroe._deuda;
        tr.appendChild(td5);

        let td6 = document.createElement("td");

        let button1 = document.createElement("button");
        button1.innerHTML = "Editar";
        button1.className = "btn btn-warning";
        button1.addEventListener("click", () => this.editarSuperHeroe(superHeroe));
        td6.appendChild(button1);

        let button2 = document.createElement("button");
        button2.innerHTML = "Borrar";
        button2.className = "btn btn-success";
        button2.addEventListener("click", () => this.borrarSuperHeroe(superHeroe));
        td6.appendChild(button2);

        tr.appendChild(td6);
        return tr;
    }

    editarSuperHeroe(superHeroe) {

        let botonCrear = this._contenedorHtml.querySelector("#crear");
        botonCrear.style.visibility = "hidden";

        let botonGuardar = this._contenedorHtml.querySelector("#guardar");
        botonGuardar.style.visibility = "visible";

        let apodo = superHeroe._apodo;
        this._contenedorHtml.querySelector("#nombre").value = apodo;

        let arma = superHeroe._arma;
        this._contenedorHtml.querySelector("#arma").value = arma;

        let profesion = superHeroe._trabajo;
        this._contenedorHtml.querySelector("#profesion").value = profesion

        let deuda = superHeroe._deuda;

        this._contenedorHtml.querySelector("#deuda").checked = deuda



        botonGuardar.addEventListener("click", () => {

            superHeroe._apodo = this._contenedorHtml.querySelector("#nombre").value;
            superHeroe._arma = this._contenedorHtml.querySelector("#arma").value;
            superHeroe._trabajo = this._contenedorHtml.querySelector("#profesion").value;

            superHeroe._deuda = this._contenedorHtml.querySelector("#deuda").checked;
            if(superHeroe._deuda==false){superHeroe._deuda=null}
            console.log(superHeroe._deuda);
            //this._superHeroesApiClient.editSuperHero(superHeroe);

            this._superHeroesApiClient.editSuperHero(superHeroe).then((data) => {
                this.getAllSuperHeroesAndPaint();

            });

        });

    }

    borrarSuperHeroe(superHeroe) {

        this._superHeroesApiClient.deleteSuperHero(superHeroe).then((data) => {
            this.getAllSuperHeroesAndPaint();

        });

    }

    pintarEstructura() {

        let estructura = `    
         <h1 class="main-title">CRUD DE SUPERHÉROES</h1>
            <div class="well">
                <form class="form-inline">
                    <div class="form-group">
                        <label for="nombre">Nombre</label>
                        <input type="text" class="form-control" id="nombre" placeholder="Han solo">
                    </div>
                    <div class="form-group">
                        <label for="Arma">Arma</label>
                        <input type="text" class="form-control" id="arma" placeholder="Pistola">
                    </div>
                    <div class="form-group">
                        <label for="Profesion">Profesion</label>
                        <input type="text" class="form-control" id="profesion" placeholder="Vago">
                    </div>

                    <div class="checkbox">
                        <label>
                            <input type="checkbox" id="deuda" value="">Deuda 
                            </label>
                    </div>

                    <button type="button" id="crear" class="btn btn-success">Crear</button>
                    <button type="button" id="guardar" class="btn btn-warning" style="visibility:hidden">Guardar</button>
                    <button type="button" id="Reset" class="btn btn-warning">Reset</button>
                    
                </form>
                </div>
                    <div>
                    <button id="refrescar" class="btn btn-success"> Refrescar</button>

                    </div>

                                <table class="table table-striped table-bordered">
                                    <thead>    
                                     <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Armas</th>
                            <th>Profesión</th>
                            <th>Deuda</th>
                            <th>Acciones</th>
                            </tr>              
                                    </thead>
                  <tbody>                  
                </tbody>
            </table>`

        this._contenedorHtml.innerHTML = estructura;

        let botonRefrescar = this._contenedorHtml.querySelector("#refrescar");
        botonRefrescar.addEventListener("click", () => this.getAllSuperHeroesAndPaint());

        let botonCrear = this._contenedorHtml.querySelector("#crear");
        botonCrear.addEventListener("click", () => this.crearSuperHeroe());

    }
}
window.onload = () => {
    let mc = new MainController();
    mc.init();
}