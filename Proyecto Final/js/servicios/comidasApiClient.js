class ComidaApiClient {

    constructor(apiClient) {
        this._baseURL = "http://formacion-indra-franlindebl.com/api/comidas";
        this._apliClient = apiClient;
    }    

    getAllComidas() {

        let completeUrl = this._baseURL;
        let promise = this._apliClient.get(completeUrl, null);
        let anotherPromise = promise.then((data) => {
            let comidas = [];
            for (let i = 0; i < data.length; i++) {
                let elemento = data[i];
                let comida = new Comida(
                    elemento._id,
                    elemento.tipo,
                    elemento.precio,
                    elemento.calorias,
                    elemento.existencias,
                    elemento.nombre
                    
                );

                comidas.push(comida);
                }

            return comidas;
        });
        return anotherPromise;
    }

    createComida(comida) {

      
        let completeUrl = this._baseURL;

          let objectComida={
            _id: comida._id,
            tipo: comida._tipo,
            precio: comida._precio,
            calorias: comida._calorias,
            existencias: comida._existencias,
            nombre: comida._nombre
        }


         let promise = this._apliClient.post(completeUrl, objectComida);

        //el post como respuesta devuelve una promesa,
        //Cuando esa promesa se cumple(se crea objeto) mapea el usuario creado a los nombres originales de las propiedades.
        let anotherPromise = promise.then((data) => {
            let comida = new Comida(data._id, data.tipo, data.precio, data.calorias, data.existencias, data.nombre);

            return true;

        });

        return anotherPromise;

    }

    editarComida(comida) {

        let comidaObject = {
            _id: comida._id,
            tipo: comida._tipo,
            precio: comida._precio,
            calorias: comida._calorias,
            existencias: comida._existencias,
            nombre: comida._nombre

        };

        let completeUrl = this._baseURL + "/" + comida._identificador;
        let promise = this._apliClient.put(completeUrl, comidaObject);

        let anotherPromise = promise.then((data) => {
            let usuarioObject = new Comida(data.id, data.tipo, data.precio, data.calorias, data.existencia,data.nombre);

            return true;

        });

        return anotherPromise;
    }

    deleteComida(comida) {
       let comidaObject = {
            _id: comida._id,
            tipo: comida._tipo,
            precio: comida._precio,
            calorias: comida._calorias,
            existencias: comida._existencias,
            nombre: comida._nombre

        };

        let completeUrl = this._baseURL + "/" + comida._identificador;
        let promise = this._apliClient.delete(completeUrl, comidaObject);

        return promise;

    }

}