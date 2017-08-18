class AlbumesApiClient {

    constructor(apiClient) {
        this._baseURL = "https://jsonplaceholder.typicode.com/photos?id=";
        this._apliClient = apiClient;

    }

    getAllAlbumes(user) {

        let completeUrl = this._baseURL+user._identificador;
        let promise = this._apliClient.get(completeUrl, null);
        let anotherPromise = promise.then((data) => {
            let albumes = [];
            for (let i = 0; i < data.length; i++) {
                let elemento = data[i];
                let album = new Album(
                    elemento.id,
                    elemento.url,
                 
                );

                albumes.push(album);

            }

            return albumes;
        });
        return anotherPromise;
    }

}