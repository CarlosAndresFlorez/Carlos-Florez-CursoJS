class BebidaApiClient {

    constructor(apiClient) {
        this._baseURL = "http://formacion-indra-franlindebl.com/api/bebidas";
        this._apliClient = apiClient;

    }

    mapeoObject(bebida) {

        let bebidaObject = {
            _id: bebida._identificador,
            grados: bebida._grados,
            esAlcoholica: bebida._esAlcoholica,
            calorias: bebida._calorias,
            existencias: bebida._existencias,
            nombre: bebida._nombre,
            precio: bebida._precio
        };
        return bebidaObject;
    }

    getAllBebidas() {

        let completeUrl = this._baseURL;
        let promise = this._apliClient.get(completeUrl, null);
        let anotherPromise = promise.then((data) => {
            let bebidas = [];
            for (let i = 0; i < data.length; i++) {
                let elemento = data[i];
                let bebida = new Bebida(
                    elemento._id,
                    elemento.grados,
                    elemento.esAlcoholica,
                    elemento.precio,
                    elemento.calorias,
                    elemento.existencias,
                    elemento.nombre
                );

                bebidas.push(bebida);
            }

            return bebidas;
        });
        return anotherPromise;
    }

    createBebida(bebida) {

        let completeUrl = this._baseURL;
        let bebidaObject = this.mapeoObject(bebida);
        let promise = this._apliClient.post(completeUrl, bebidaObject);
        let anotherPromise = promise.then((data) => {
            let bebidaObject = new Bebida(data.id, data.grados, data.esAlcoholica, data.calorias, data.precio, data.existencia, data.nombre);
            return true;
        });
        return anotherPromise;
    }

    editarBebida(bebida) {
        let bebidaObject = this.mapeoObject(bebida);
        let completeUrl = this._baseURL + "/" + bebida._identificador;
        let promise = this._apliClient.put(completeUrl, bebidaObject);
        let anotherPromise = promise.then((data) => {
            let bebida = new Bebida(data.id, data.grados, data.esAlcoholica, data.precio, data.calorias, data.existencia, data.nombre);
            return true;
        });
        return anotherPromise;
    }

    deleteBebida(bebida) {
        let bebidaObject = this.mapeoObject(bebida);
        let completeUrl = this._baseURL + "/" + bebida._identificador;
        let promise = this._apliClient.delete(completeUrl, bebidaObject);

        return promise;
    }
}