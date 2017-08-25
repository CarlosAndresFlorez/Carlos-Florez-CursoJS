class Page1 extends InnerPage {

    constructor(titulo, url, auntenticado, navigation, userController, comidasApiClient, modalController, loading) {
        super(titulo, url, auntenticado, navigation, userController);
        this._navigation = navigation;
        this._comidasApi = comidasApiClient;
        this._modalController = modalController;
        this._loadingController=loading;
    }

    pintar(container) {

        this._loadingController.mostrarLoading();
        this._container = container;
        this.pintarHeader(this._container);
        let estructura = `    
<table class="table table-striped table-bordered">

    <div class="well">
        <form class="form-inline">
            <div>
                <div class="form-group">
                    <label for="Nombre">Tipo</label>
                    <input type="text" class="form-control" id="tipo" placeholder="Postre">
                </div>
                <div class="form-group">
                    <label for="Precio">Precio</label>
                    <input type="text" class="form-control" id="precio" placeholder="2000">
                </div>
                <div class="form-group">
                    <label for="Calorias">Calorias</label>
                    <input type="text" class="form-control" id="calorias" placeholder="2000">
                </div>

                <div class="form-group">
                    <label for="Existencias">Existencias</label>
                    <input type="text" class="form-control" id="existencias" placeholder="15">
                </div>

                <div class="form-group">
                    <label for="Nombre">Nombre</label>
                    <input type="text" class="form-control" id="nombre" placeholder="Papitas">
                </div>
            </div>
            <button type="button" id="crear" class="btn btn-success">Crear</button>
            <button type="button" id="guardar" class="btn btn-warning" style="visibility:hidden">Guardar</button>
        </form>
        <thead>
            <tr>
                <th>Existencias</th>
                <th>Nombre</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
</table>`;

        this._comidasApi.getAllComidas().then((data) => {


            this.paintAllComidas(data);
            this._loadingController.cerrarLoading();
        });

        let div = document.createElement("div");
        div.innerHTML = estructura;
        this._container.appendChild(div);
        this.pintarFooter(this._container);
        let botonCrear = document.querySelector("#crear");
        botonCrear.addEventListener("click", () => {
            this.crearComida();

        });
 
    }


    paintAllComidas(data) {

        let tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
            let comida = data[i];
            let row = this.getRowForComida(comida);
            tbody.appendChild(row);
        }
    }

    getRowForComida(comida) {

        let tr = document.createElement("tr");

        let td5 = document.createElement("td");
        td5.innerHTML = comida._existencias;
        tr.appendChild(td5);

        let td6 = document.createElement("td");
        td6.innerHTML = comida._nombre;
        tr.appendChild(td6);

        let td7 = document.createElement("td");
        tr.appendChild(td7);

        let button1 = document.createElement("button");
        button1.innerHTML = "Editar";
        button1.className = "btn btn-warning";
        button1.addEventListener("click", () => this.editarComidas(comida));
        td7.appendChild(button1);

        let button2 = document.createElement("button");
        button2.innerHTML = "Borrar";
        button2.className = "btn btn-success";
        button2.addEventListener("click", () => this.borrarComida(comida));
        td7.appendChild(button2);

        let titulo = comida._nombre;
        let contenido = ` 
            <p><strong>Tipo: </strong>${comida._tipo}</p>
            <p><strong>Precio: </strong>${comida._precio}</p>
            <p><strong>Calorías: </strong>${comida._calorias}</p>
            <p><strong>Existencias: </strong>${comida._existencias}</p>
        `;

        let divContainer = document.createElement("div");
        divContainer.innerHTML = contenido;

        let button3 = document.createElement("button");
        button3.innerHTML = "Ver detalles";
        button3.className = "btn btn-success";
        button3.addEventListener("click", () => this._modalController.openModal(titulo, divContainer));
        td7.appendChild(button3);

        tr.appendChild(td7);
        return tr;
    }

    crearComida() {

        let tipo = document.querySelector("#tipo").value;
        let precio = document.querySelector("#precio").value;
        let calorias = document.querySelector("#calorias").value;
        let existencias = document.querySelector("#existencias").value;
        let nombre = document.querySelector("#nombre").value;

        let comida = new Comida(null, tipo, precio, calorias, existencias, nombre);
        this._comidasApi.createComida(comida).then((data) => {
            this._comidasApi.getAllComidas().then((data) => {

                this.paintAllComidas(data);

            });

        }).catch((e) => {
                let contenido = e.message;
                let divContainer = document.createElement("div");
                divContainer.innerHTML = contenido;
                this._modalController.openModal(null, divContainer);

            })
    }

    editarComidas(comida) {

        let botonCrear = document.querySelector("#crear");
        botonCrear.style.visibility = "hidden";

        let botonGuardar = document.querySelector("#guardar");
        botonGuardar.style.visibility = "visible";

        let tipo = comida._tipo;
        document.querySelector("#tipo").value = tipo;

        let precio = comida._precio;
        document.querySelector("#precio").value = precio;

        let calorias = comida._calorias;
        document.querySelector("#calorias").value = calorias;

        let existencias = comida._existencias;
        document.querySelector("#existencias").value = existencias;

        let nombre = comida._nombre;
        document.querySelector("#nombre").value = nombre;

        botonGuardar.addEventListener("click", () => {

            comida._tipo = document.querySelector("#tipo").value;
            comida._precio = document.querySelector("#precio").value;
            comida._calorias = document.querySelector("#calorias").value;
            comida._existencias = document.querySelector("#existencias").value;
            comida._nombre = document.querySelector("#nombre").value;

            this._comidasApi.editarComida(comida).then((data) => {
                this._comidasApi.getAllComidas().then((data) => {
                    this.paintAllComidas(data);
                })

            }).catch((e) => {
                let contenido = e.message;
                let divContainer = document.createElement("div");
                divContainer.innerHTML = contenido;
                this._modalController.openModal(null, divContainer);
            });
        });
    }

    borrarComida(comida) {

        this._comidasApi.deleteComida(comida).then((data) => {
            this._comidasApi.getAllComidas().then((data) => {
                this.paintAllComidas(data);
            });;
        });
    }
}