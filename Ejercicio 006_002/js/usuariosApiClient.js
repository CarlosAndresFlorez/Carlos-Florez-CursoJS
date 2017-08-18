class UsuariosApiClient {

    constructor(apiClient) {
        this._baseURL = "https://jsonplaceholder.typicode.com/users";
        this._apliClient = apiClient;

    }

    getAllUsuarios() {

        let completeUrl = this._baseURL;
        let promise = this._apliClient.get(completeUrl, null);
        let anotherPromise = promise.then((data) => {
            let usuarios = [];
            for (let i = 0; i < data.length; i++) {
                let elemento = data[i];
                let usuario = new Usuario(
                    elemento.id,
                    elemento.name,
                    elemento.username,
                    elemento.email
                );

                usuarios.push(usuario);

            }

            return usuarios;
        });
        return anotherPromise;
    }

}