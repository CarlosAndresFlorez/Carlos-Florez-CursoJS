
class Page2 extends InnerPage {

    constructor(titulo, url, auntenticado, navigation, userController, bebidaApliClient, modal, loading) {
        super(titulo, url, auntenticado, navigation, userController);
        this._navigation = navigation;
        this._bebidaApliClient = bebidaApliClient;
        this._modalController = modal;
        this._loadingController=loading;

    }

    pintar(container) {
         this._loadingController.mostrarLoading();

        this._container = container;

        this.pintarHeader(this._container);

        let estructura = `    <table class="table table-striped table-bordered">

    <div class="well">
        <form class="form-inline">
            <div>
                <div class="form-group">
                    <label for="Grados">Grados</label>
                    <input type="text" class="form-control" id="grados" placeholder="X Grados">
                </div>
                <div class="form-group">
                    <label for="esAlcoholica">Es Alcoholica</label>
                    <input type="text" class="form-control" id="esAlcoholica" placeholder="true/false">
                </div>
                <div class="form-group">
                    <label for="Precio">Precio</label>
                    <input type="text" class="form-control" id="precio" placeholder="$$">
                </div>
                <div class="form-group">
                    <label for="Calorias">Calorias</label>
                    <input type="text" class="form-control" id="calorias" placeholder="calorias">
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

        this._bebidaApliClient.getAllBebidas().then((data) => {

            this.paintAllBebidas(data);
            this._loadingController.cerrarLoading();

        });

        let div = document.createElement("div");
        div.innerHTML = estructura;
        this._container.appendChild(div);

        this.pintarFooter(this._container);

        let botonCrear = document.querySelector("#crear");
        botonCrear.addEventListener("click", () => {
            this.crearBebida();

        });

    }

    paintAllBebidas(data) {

        let tbody = document.querySelector("tbody");
        tbody.innerHTML = "";

        for (let i = 0; i < data.length; i++) {
            let bebida = data[i];
            let row = this.getRowForBebida(bebida);
            tbody.appendChild(row);
        }
    }

    getRowForBebida(bebida) {

        let tr = document.createElement("tr");

        let td5 = document.createElement("td");
        td5.innerHTML = bebida._existencias;
        tr.appendChild(td5);

        let td6 = document.createElement("td");
        td6.innerHTML = bebida._nombre;
        tr.appendChild(td6);

        let td7 = document.createElement("td");
        tr.appendChild(td7);

        let button1 = document.createElement("button");
        button1.innerHTML = "Editar";
        button1.className = "btn btn-warning";
        button1.addEventListener("click", () => this.editarBebida(bebida));
        td7.appendChild(button1);

        let button2 = document.createElement("button");
        button2.innerHTML = "Borrar";
        button2.className = "btn btn-success";
        button2.addEventListener("click", () => this.borrarBebida(bebida));
        td7.appendChild(button2);

        let titulo = bebida._nombre;

        let alcohol = "";
        if (bebida._esAlcoholica == false) {
            alcohol = "NO";
        } else(alcohol = "SI");
        let contenido = ` 
            <p><strong>Es Alcoholica: </strong>${alcohol}</p>
            <p><strong>Precio: </strong>${bebida._precio}</p>
            <p><strong>Calorías: </strong>${bebida._calorias}</p>
            <p><strong>Existencias: </strong>${bebida._existencias}</p>
             <p><strong>Grados de Alcohol: </strong>${bebida._grados}</p>
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

    crearBebida() {

        let grados = document.querySelector("#grados").value;
        let esAlcoholica = document.querySelector("#esAlcoholica").value;
        let precio = document.querySelector("#precio").value;
        let calorias = document.querySelector("#calorias").value;
        let existencias = document.querySelector("#existencias").value;
        let nombre = document.querySelector("#nombre").value;

        let bebida = new Bebida(null, grados, esAlcoholica, precio, calorias, existencias, nombre);
        this._bebidaApliClient.createBebida(bebida).then((data) => {
            this._bebidaApliClient.getAllBebidas().then((data) => {

                this.paintAllBebidas(data);

            });;

        });
    }

    editarBebida(bebida) {

        let botonCrear = document.querySelector("#crear");
        botonCrear.style.visibility = "hidden";

        let botonGuardar = document.querySelector("#guardar");
        botonGuardar.style.visibility = "visible";

        let grados = bebida._grados;
        document.querySelector("#grados").value = grados;

        let esAlcoholica = bebida._esAlcoholica;
        document.querySelector("#esAlcoholica").value = esAlcoholica;

        let calorias = bebida._calorias;
        document.querySelector("#calorias").value = calorias;

        let existencias = bebida._existencias;
        document.querySelector("#existencias").value = existencias;

        let nombre = bebida._nombre;
        document.querySelector("#nombre").value = nombre;

        let precio = bebida._precio;
        document.querySelector("#precio").value = precio;

        botonGuardar.addEventListener("click", () => {

            bebida._grados = document.querySelector("#grados").value;
            bebida._esAlcoholica = document.querySelector("#esAlcoholica").value;
            bebida._precio = document.querySelector("#precio").value;
            bebida._calorias = document.querySelector("#calorias").value;
            bebida._existencias = document.querySelector("#existencias").value;
            bebida._nombre = document.querySelector("#nombre").value;

            this._bebidaApliClient.editarBebida(bebida).then((data) => {
                this._bebidaApliClient.getAllBebidas().then((data) => {

                    this.paintAllBebidas(data);

                });;
            }).catch((e) => {
                let contenido = e.message;
                let divContainer = document.createElement("div");
                divContainer.innerHTML = contenido;
                this._modalController.openModal(null, divContainer);

            })
        });
    }

    borrarBebida(bebida) {

        this._bebidaApliClient.deleteBebida(bebida).then((data) => {
            this._bebidaApliClient.getAllBebidas().then((data) => {

                this.paintAllBebidas(data);

            });;

        });

    }

}