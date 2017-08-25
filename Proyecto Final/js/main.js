class MainController {

    constructor() {

        this._container = null;

        this.pintarEstructuraGeneral();

        this._modalController = new ModalController();
        this._loadingControll = new LoadingControll();

        this._apiClient = new ApiClient();
        this._usuariosApiClient = new UsuarioApiClient(this._apiClient);
        this._comidasApiClient = new ComidaApiClient(this._apiClient);
        this._bebidasApiClient = new BebidaApiClient(this._apiClient);

        this._userController = new UserController(this._usuariosApiClient);

        this._navigationController = new NavigationController(this._container, this._usuariosApiClient);
        this._pageLogin = new Login("Login", "#login", false, this._navigationController, this._userController, this._modalController);
        this._navigationController.addPagina(this._pageLogin);

        this._crearCuenta = new CrearCuenta("Crear Cuenta", "#crear-cuenta", false, this._navigationController, this._userController, this._modalController)
        this._navigationController.addPagina(this._crearCuenta);

        this._home = new Home("Home", "#home", true, this._navigationController, this._userController, this._comidasApiClient, this._loadingControll,this._bebidasApiClient)
        this._navigationController.addPagina(this._home);

        this._page1 = new Page1("Page 1", "#page1", true, this._navigationController, this._userController, this._comidasApiClient, this._modalController, this._loadingControll)
        this._navigationController.addPagina(this._page1);

        this._page2 = new Page2("Page 2", "#page2", true, this._navigationController, this._userController, this._bebidasApiClient, this._modalController, this._loadingControll)
        this._navigationController.addPagina(this._page2);

        this._page3 = new Page3("Perfil Usuario", "#perfil", true, this._navigationController, this._userController, this._usuariosApiClient, this._modalController, this._loadingControll)
        this._navigationController.addPagina(this._page3);

    }

    init() {

        this._navigationController.irPagina("#login", this._container);

    }
    pintarEstructuraGeneral() {
        this._container = document.createElement("div");
        this._container.className = "container";
        document.body.appendChild(this._container);

    }

}

class Usuario {

    constructor(nombre, apellidos, username, email, password, identificador) {
        this._identificador = identificador;
        this._email = email;
        this._apellidos = apellidos;
        this._nombre = nombre;
        this._username = username;
        this._password = password;

    }

}

class Comida {
    constructor(identificador, tipo, precio, calorias, existencias, nombre) {
        this._identificador = identificador;
        this._tipo = tipo;
        this._precio = precio;
        this._calorias = calorias;
        this._existencias = existencias;
        this._nombre = nombre;
    }
}

class AlmacenComidas {

    constructor() {
        this._comidas = [];
        this._contenedorHtml = null;
        this._comidasApiClient = null;
    }

    init(contenedorHtml, comidasApiClient) {

        this._contenedorHtml = contenedorHtml;
        this._comidasApiClient = comidasApiClient;
        this.getAllComidasAndPaint();
    }

    getAllComidasAndPaint() {
        this._comidasApiClient.getAllComidas().then((data) => {
            console.log(data);

        });
    }

}

class Bebida {
    constructor(identificador, grados, esAlcoholica, precio, calorias, existencias, nombre) {
        this._identificador = identificador;
        this._grados = grados;
        this._esAlcoholica = esAlcoholica;
        this._precio = precio;
        this._calorias = calorias;
        this._existencias = existencias,
            this._nombre = nombre;
    }
}

class AlmacenBebidas {

    constructor() {
        this._bebidas = [];
        this._contenedorHtml = null;
        this._bebidasApiClient = null;
    }

    init(contenedorHtml, comidasApiClient) {

        this._contenedorHtml = contenedorHtml;
        this._bebidasApiClient = bebidasApiClient;
        this.getAllBebidasAndPaint();
    }

    getAllBebidasAndPaint() {
        this._bebidasApiClient.getAllBebidas().then((data) => {
            console.log(data);

        });
    }
}

class ModalController {
    constructor() {

    }

    closeModal() {
        let modal = document.body.querySelector("#contenedorModal");
        if (modal) {
            modal.parentElement.removeChild(modal);
        }
    }

    openModal(titulo, contenido) {
        let contenedorModal = document.createElement("div");
        contenedorModal.id = "contenedorModal";
        contenedorModal.innerHTML = `

<div class="modal fade in" id="myModal" role="dialog" style="display: block; padding-left: 0px;">
<div class="modal-dialog">

<!-- Modal content-->
<div class="modal-content">
<div class="modal-header">
<button type="button" class="close" id="close-modal-button">×</button>
<h4 id="titulo" class="modal-title">Modal Header</h4>
</div>
<div class="modal-body">

<p id="contenido"></p>

</div>
<div class="modal-footer">
<button type="button" class="btn btn-default" id="close-modal-button2">Close</button>
</div>
</div>

</div>
</div>
<div class="modal-backdrop fade in"></div>
`;

        let botonCerrar = contenedorModal.querySelector("#close-modal-button");
        botonCerrar.addEventListener("click", () => this.closeModal());

        let tituloModal = contenedorModal.querySelector("#titulo");
        tituloModal.textContent = titulo;

        let contenedor = contenedorModal.querySelector("#contenido");
        contenedor.appendChild(contenido);

        let botonCerrar2 = contenedorModal.querySelector("#close-modal-button2");
        botonCerrar2.addEventListener("click", () => this.closeModal());

        document.body.appendChild(contenedorModal);
    };

}

class LoadingControll {

    constructor() {
        this._elemento = null;

    }

    mostrarLoading() {
        this._elemento = document.createElement("div");
        this._elemento.className = "loading";
        document.body.appendChild(this._elemento);
    }

    cerrarLoading() {

        document.body.removeChild(this._elemento);
    }
}

window.onload = () => {

    let mc = new MainController();

    mc.init();
}