class UsuarioApiClient {

    constructor(apiClient) {
        this._baseURL = "http://formacion-indra-franlindebl.com/api/users";
        this._apliClient = apiClient;
    }

    login(user) {

        let completeUrl = this._baseURL + "/login";

        let usuario = {
            "username": user._username,
            "password": user._password
        }

        let promise = this._apliClient.post(completeUrl, usuario);
        
        let anotherPromise = promise.then((elemento) => {
            let usuario = new Usuario(
                elemento.nombre,
                elemento.apellidos,
                elemento.username,
                elemento.email,
                elemento.password,
                elemento._id
            );


            return usuario;
        });

        return anotherPromise;
    }

    getAllUsuarios() {

        let completeUrl = this._baseURL;
        let promise = this._apliClient.get(completeUrl, null);
        let anotherPromise = promise.then((data) => {
            let usuarios = [];
            for (let i = 0; i < data.length; i++) {
                let elemento = data[i];
                let usuario = new Usuario(
                    elemento.nombre,
                    elemento.apellidos,
                    elemento.username,
                    elemento.email,
                    elemento.password,
                    elemento._id
                );

                usuarios.push(usuario);
            }

            return usuarios;
        });
        return anotherPromise;
    }

    getUsuarioById(id) {

        let completeUrl = this._baseURL + "/" + id;
        let promise = this._apliClient.get(completeUrl, null);
        let anotherPromise = promise.then((elemento) => {

            // nombre, apellidos, username, email, password, identificador
            let usuario = new Usuario(
                elemento.nombre,
                elemento.apellidos,
                elemento.username,
                elemento.email,
                elemento.password,
                elemento._id
            );

            return usuario;
        });
        return anotherPromise;
    }

    createUsuario(usuario) {

        let completeUrl = this._baseURL;

        let objectUsuario = {
            "nombre": usuario._nombre,
            "username": usuario._username,
            "apellidos": usuario._apellidos,
            "username": usuario._username,
            "email": usuario._email,
            "password": usuario._password
        }

        let promise = this._apliClient.post(completeUrl, objectUsuario);

        //el post como respuesta devuelve una promesa,
        //Cuando esa promesa se cumple(se crea objeto) mapea el usuario creado a los nombres originales de las propiedades.
        let anotherPromise = promise.then((elemento) => {
            let usuario = new Usuario(
                elemento.nombre,
                elemento.apellidos,
                elemento.username,
                elemento.email,
                elemento.password,
                elemento._id
            );

            return true;

        });

        return anotherPromise;
    }

    editarUsuario(usuario,pass) {

        let usuarioObject = {
            _id : usuario._identificador,
            email: usuario._email,
            apellidos: usuario._apellidos,
            nombre: usuario._nombre,
            username: usuario._username,
            password: pass

        };

        let completeUrl = this._baseURL + "/" + usuario._identificador;
        let promise = this._apliClient.put(completeUrl, usuarioObject);

        let anotherPromise = promise.then((elemento) => {
            let usuario = new Usuario(
                elemento.nombre,
                elemento.apellidos,
                elemento.username,
                elemento.email,
                elemento.password,
                elemento._id
            );

            return usuario;
        });

        return anotherPromise;
    }

    deleteUsuario(usuario,pass) {
        let usuarioObject = {
            _id: usuario._identificador,
            email: usuario._email,
            apellidos: usuario._apellidos,
            nombre: usuario._nombre,
            username: usuario._username,
            password: pass

        };

        let completeUrl = this._baseURL + "/" + usuario._identificador;
        let promise = this._apliClient.delete(completeUrl, usuarioObject);

        let anotherPromise = promise.then((elemento) => {
            let usuario = new Usuario(
                elemento.nombre,
                elemento.apellidos,
                elemento.username,
                elemento.email,
                elemento.password,
                elemento._id
            );

            return true;

        });

        return anotherPromise;

    }

}