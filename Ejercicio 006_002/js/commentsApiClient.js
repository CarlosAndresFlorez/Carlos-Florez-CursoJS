class ComentariosApiClient {

    constructor(apiClient) {
        this._baseURL = "https://jsonplaceholder.typicode.com/posts/";
        this._apliClient = apiClient;
    }

    getAllComentarios(post) {

        let completeUrl = this._baseURL+post._idPost+"/comments" ;
        let promise = this._apliClient.get(completeUrl, null);
        let anotherPromise = promise.then((data) => {
            let comentarios = [];
            for (let i = 0; i < data.length; i++) {
                let elemento = data[i];
                let comentario = new Comentario(
                    elemento.postId,
                    elemento.id,
                    elemento.name,
                    elemento.email,
                    elemento.body
                );

                comentarios.push(comentario);
            }

            return comentarios;
        });
        return anotherPromise;
    }

}