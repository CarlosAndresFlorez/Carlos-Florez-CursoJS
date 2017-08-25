class Page3 extends InnerPage {

    constructor(titulo, url, auntenticado, navigation, userController, apiClient, modalController, loading) {
        super(titulo, url, auntenticado, navigation, userController);
        this._navigation = navigation;
        this._navigation = navigation;
        this._usercontroller = userController;
        this._modalController = modalController;
        this._loadingController=loading;

    }

    pintar(container) {
        this._loadingController.mostrarLoading();
        this._container = container;

        this.pintarHeader(this._container);

        let estructura = `    

<table class="table table-striped table-bordered">

                                <div class="well" id="aqui">
                <form class="form-horizontal">

                    <div >

                    <div class="form-group">
                        <label for="Nombre">Nombre</label>
                        <input type="text" class="form-control" id="nombre" placeholder="Nombre">
                    </div>
                    <div class="form-group">
                        <label for="Apellidos">Apellidos</label>
                        <input type="text" class="form-control" id="apellidos" placeholder="Apellidos">
                    </div>
                    <div class="form-group">
                        <label for="UserName">UserName</label>
                        <input type="text" class="form-control" id="username" placeholder="UserName">
                    </div>

                     <div class="form-group">
                        <label for="Email">Email</label>
                        <input type="text" class="form-control" id="email" placeholder="Email">
                    </div>

                     
                    </div>
                    
                    <button type="button" id="guardar" class="btn btn-warning" style="visibility:hidden">Guardar</button>
                 
                    
                </form>

                                    <thead>    
                                     <tr>
                            
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>UserName</th>
                            <th>Email</th>
                             </tr>              
                             </thead>
                  <tbody>                  
                </tbody>
            </table>`;

        let div = document.createElement("div");
        div.innerHTML = estructura;
        this._container.appendChild(div);

        let idUser = null;
        if (localStorage.getItem("usuario") != "null" && localStorage.getItem("usuario") != null) {
            let user = localStorage.getItem("usuario");
            let userObject = JSON.parse(user);
            this._usercontroller._usuario = userObject;
            idUser = this._usercontroller._usuario.id;

        } else(idUser = this._usercontroller._usuario._identificador);

        let promise = this._usercontroller.buscarUsuario(idUser).then((data) => {
            console.log(data);

            let tbody = document.querySelector("tbody");
            tbody.innerHTML = "";

            let tr = document.createElement("tr");
            tbody.appendChild(tr);

            let td1 = document.createElement("td");
            td1.innerHTML = data._nombre;
            tr.appendChild(td1);

            let td2 = document.createElement("td");
            td2.innerHTML = data._apellidos;
            tr.appendChild(td2);

            let td3 = document.createElement("td");
            td3.innerHTML = data._username;
            tr.appendChild(td3);

            let td4 = document.createElement("td");
            td4.innerHTML = data._email;
            tr.appendChild(td4);

            let button1 = document.createElement("button");
            button1.innerHTML = "Editar";
            button1.className = "btn btn-warning";
            button1.addEventListener("click", () => this.editarUsuario(data));
            td4.appendChild(button1);

            let button2 = document.createElement("button");
            button2.innerHTML = "Eliminar";
            button2.className = "btn btn-warning";
            button2.addEventListener("click", () => this.borrarUsuario(data));
            td4.appendChild(button2);

            this._loadingController.cerrarLoading();

            this.pintarFooter(this._container);

            return tr;

        });

    }

    editarUsuario(usuario) {

        
        let botonGuardar = document.querySelector("#guardar");
        botonGuardar.style.visibility = "visible";

        let nombre = usuario._nombre;
        document.querySelector("#nombre").value = nombre;

        let apellidos = usuario._apellidos;
        document.querySelector("#apellidos").value = apellidos;

        let userName = usuario._username;
        document.querySelector("#username").value = userName;

        let email = usuario._email;
        document.querySelector("#email").value = email;

      
        botonGuardar.addEventListener("click", () => {

            let titulo = usuario._nombre + " ingresa tu contraseña para confirmar los cambios";
            let contenido = `<input type="password" class="form-control" id="password"> `;

            let divContainer = document.createElement("div");
            divContainer.innerHTML = contenido;

            let button = document.createElement("button");
            button.innerHTML = "confirmar";
            button.className = "btn btn-success";
            divContainer.appendChild(button);

            this._modalController.openModal(titulo, divContainer);

            button.addEventListener("click", () => {

                let pass = document.querySelector("#password").value;

                usuario._nombre = document.querySelector("#nombre").value;
                usuario._apellidos = document.querySelector("#apellidos").value;
                usuario._username = document.querySelector("#username").value;
                usuario._email = document.querySelector("#email").value;

                this._usercontroller.editarUsuario(usuario, pass).then((data) => {

                    if (localStorage.getItem("usuario") != "null") {
                        this._usercontroller.guardarSesion(data)
                    }

                    this._navigation.irPagina("#perfil");

                }).catch((e) => {
                    let contenido = `<h5>Contraseña errada</h5> `;
                    let divContainer = document.createElement("div");
                    divContainer.innerHTML = contenido;
                    this._modalController.openModal(null, divContainer);

                })
                button.addEventListener("click", () => this.modalController.closeModal());

            });

        });
    }

    borrarUsuario(usuario) {

        let titulo = usuario._nombre + " ingresa tu contraseña para confirmar los cambios";
        let contenido = `<input type="password" class="form-control" id="password"> `;

        let divContainer = document.createElement("div");
        divContainer.innerHTML = contenido;

        let button = document.createElement("button");
        button.innerHTML = "confirmar";
        button.className = "btn btn-success";
        divContainer.appendChild(button);

        this._modalController.openModal(titulo, divContainer);

        button.addEventListener("click", () => {

            let pass = document.querySelector("#password").value;

            this._usercontroller.borrarUsuario(usuario, pass).then((data) => {

                this._navigation.irPagina("#login");
                this._usercontroller.borrarLocalStorage();

            }).catch((e) => {

                let contenido = `<h5>Contraseña errada</h5> `;

                let divContainer = document.createElement("div");
                divContainer.innerHTML = contenido;

                this._modalController.openModal(null, divContainer);

            })

        });

    }

}