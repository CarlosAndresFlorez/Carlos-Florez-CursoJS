class Page {
    constructor(titulo, url, auntenticado, navigation, userController) {

        this._titulo = titulo;
        this._url = url;
        this._auntenticado = auntenticado;
        this._navigation = navigation;
    }
}

class Login extends Page {

    constructor(titulo, url, auntenticado, navigation, userController, modalController, loadingController) {
        super(titulo, url, auntenticado, navigation, userController);
        this._usercontroller = userController;
        this._navigationController = navigation;
        this._modalController = modalController;
        this._loadingController = loadingController;

    }

    validarUsuarioActivo() {

        let user = localStorage.getItem("usuario");
        if (user != "null" && user != null) {
            let userObject = JSON.parse(user);
            let usuario = this._usercontroller.buscarUsuario(userObject.id).then((data) => {
                let userJson = JSON.stringify(userObject);
                userObject.nombre = data._nombre;
                userObject.username = data._username;
                userObject.mail = data._email;
                userObject.apellidos = data._apellidos;
                this._navigationController.irPagina("#home", this._container);
            });
        }
    }

    pintar(container) {

        this._container = container;
        let estructura = `    
        <h1 class="main-title">LOGIN PROYECTO FINAL </h1>
<div class="container">
    <div class="row">
        <div class="col-sm-6 col-md-4 col-md-offset-4">

            <div class="account-wall">

                <form class="form-signin">
                    <input type="text" class="form-control" id="user" placeholder="Usuario" required autofocus>
                    <input type="password" class="form-control" placeholder="Password" required id="pass">
                    <br>
                    <button class="btn btn-lg btn-primary btn-block" id="home" type="button">Login</button>
                    <button class="btn btn-lg btn-primary btn-block" id="crear" type="button">
                        Crear Cuenta</button>
                    <label class="checkbox pull-left">
                        <input type="checkbox" id="recordar" value="remember-me"> Remember me
                    </label>

                </form>
            </div>

        </div>
    </div>
</div>
</form>`;

        this._container.innerHTML = estructura;
        let user = this._container.querySelector("#user");
        let pass = this._container.querySelector("#pass");
        let home = this._container.querySelector("#home");
        let recordar = this._container.querySelector("#recordar");
        home.addEventListener("click", () => {
            this._usercontroller.validarUsuarioYContraseña(user.value, pass.value).then((data) => {
                if (data.message != "User no encontrado!" && data.message != "Contraseña incorrecta!") {
                    if (recordar.checked == true) {
                        this._usercontroller.guardarSesion(data);
                    }
                    this._navigation.irPagina("#home")
                }
            }).catch((e) => {
                let contenido = e.message;
                let divContainer = document.createElement("div");
                divContainer.innerHTML = contenido;
                this._modalController.openModal(null, divContainer);

            })
        });
        let crear = this._container.querySelector("#crear");
        crear.addEventListener("click", () => {
            this._navigation.irPagina("#crear-cuenta", this._container);
        });
    }
}

class CrearCuenta extends Page {

    constructor(titulo, url, auntenticado, navigation, userController, modal) {

        super(titulo, url, auntenticado, navigation, userController);
        this._usercontroller = userController;
        this._modalController = modal;
    }

    pintar(container) {
        this._container = container;
        let estructura = ` 
        <div>   
        <h1 class="main-title">CREAR CUENTA</h1>
        <div class="row">
        <div class="col-sm-6 col-md-4 col-md-offset-4">
        <form class="form-inline">                         
        <input type="text" class="form-control" placeholder="Nombre" id="Nombre"><br>
        <input type="text" class="form-control" placeholder="Apellidos " id="Apellidos"><br>
        <input type="text" class="form-control" placeholder="Username " id="Username"><br>
        <input type="email" class="form-control" placeholder="Email" id="Mail"><br>
        <input type="password" class="form-control" placeholder="Password" id="Password"><br><br>


        <button class="btn btn-lg btn-primary btn-block" id="guardar" type="button">
                    Guardar</button>


                    </div>
                    </div>
                    </div> 
       `
        this._container.innerHTML = estructura;
        let guardar = this._container.querySelector("#guardar");
        guardar.addEventListener("click", () => {
            let nombre = this._container.querySelector("#Nombre");
            let apellidos = this._container.querySelector("#Apellidos");
            let userName = this._container.querySelector("#Username");
            let mail = this._container.querySelector("#Mail");
            let password = this._container.querySelector("#Password");
            this._usercontroller.crearUsuario(nombre.value, apellidos.value, userName.value, mail.value, password.value);
            this._navigation.irPagina("#login");
        })
    }
}

class InnerPage extends Page {

    constructor(titulo, url, auntenticado, navigation, userController) {

        super(titulo, url, auntenticado, navigation, userController);
        this._usercontroller = userController;
    }

    pintarHeader(container) {
        this._container = container;
        let estructura = `
  <header>
    <div class="collapse navbar-collapse navbar-ex1-collapse">
    <nav class="navbar navbar-inverse bg-primary">
  
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" >Restaurante</a>
                </div>
                <ul class="nav navbar-nav">
                    <li class="menu-item" id="#home"><a href="#">Home</a></li>
                    <li class="menu-item" id="#page1"><a href="#">Comidas</a></li>
                    <li class="menu-item" id="#page2"><a href="#">Bebidas</a></li>
                    <li class="menu-item" id="#perfil"><a href="#">Perfil de Usuario</a></li>
                    <li class="menu-item" id="#login"><a href="#">Cerrar sesión</a></li>
                    <li class="dropdown">

                </ul>
            </div>
       
</nav>

        
    </div>
</header>
        `
        this._container.innerHTML = "";
        let div = document.createElement("div");
        div.innerHTML = estructura;
        this._container.appendChild(div);
        let enlaces = this._container.querySelectorAll(".menu-item");
        enlaces.forEach((enlace) => {
            enlace.addEventListener("click", (event) => {
                event.preventDefault();
                let ruta = enlace.id;
                if (ruta == "#login") {
                    this._usercontroller.borrarLocalStorage();
                    this._navigation.irPagina("#login")

                } else { this._navigation.irPagina(ruta); }

            });
        });
    }

    pintarFooter(container) {
        this._container = container;
        

        let estructura = `  
        <div id="footer">  
             
        </div>
        `
        let div = document.createElement("div");
        div.innerHTML = estructura;
        this._container.appendChild(div);
    }
}

class Home extends InnerPage {

    constructor(titulo, url, auntenticado, navigation, userController, comidasApi, loading) {
        super(titulo, url, auntenticado, navigation, userController);
        this._navigation = navigation;
        this._comidasApiClient = comidasApi;
        this._loadingController = loading;

    }

    pintar(container) {

        this._container = container;
        this.pintarHeader(this._container);
        let estructura = `    
        <script src="https://code.highcharts.com/highcharts.js"></script>
        <script src="https://code.highcharts.com/modules/exporting.js"></script>
        <div id="container"  style="min-width: 310px; height: 400px; max-width: 600px; margin: 0 auto"></div>

       `
        this._loadingController.mostrarLoading();
        this._comidasApiClient.getAllComidas().then((data) => {

            let comidas = data;
            let postres = 0;
            let entrantes = 0;
            let principales = 0;

            for (let i = 0; i < comidas.length; i++) {
                let comida = comidas[i];
                if (comida._tipo == "Postre") {
                    postres = comida._existencias + postres;
                }
                if (comida._tipo == "Entrante") {
                    entrantes = comida._existencias + entrantes;
                }
                if (comida._tipo == "Principal") {
                    principales = comida._existencias + principales;
                }
            }
            console.log("Postres: " + postres);
            console.log("Entrantes " + entrantes);
            console.log("Principal " + principales);

            Highcharts.chart('container', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Comidas'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: [{
                        name: 'Postres',
                        y: postres

                    }, {
                        name: 'Entrantes',
                        y: entrantes,

                    }, {
                        name: 'Principales',
                        y: principales
                    }, ]
                }]
            });
            this._loadingController.cerrarLoading();
        });

        let div = document.createElement("div");
        div.innerHTML = estructura;
        this._container.appendChild(div);
        this.pintarFooter(this._container);

    }
}