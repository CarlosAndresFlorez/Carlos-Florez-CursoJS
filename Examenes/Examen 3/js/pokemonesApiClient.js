class PokemonesApiClient {

    constructor(apiClient) {
        this._baseURL = "http://pokeapi.co/api/v2/pokemon/?offset=0";
        this._apliClient = apiClient;

    }

    getPokemonesAtPage() {

        
        let completeUrl = this._baseURL;
        let promise = this._apliClient.get(completeUrl, null);
        let anotherPromise = promise.then((data) => {
            let resultados = data.results;
            console.log(resultados);
            let pokemones = [];
            for (let i = 0; i < resultados.length; i++) {
                let elemento = resultados[i];
                let pokemon = new Pokemon(
                    elemento.name,
                    elemento.url
                );

                pokemones.push(pokemon);
            }

            return pokemones;
        });
        return anotherPromise;
    }

    getDetalles(pokemon) {

        let completeUrl = pokemon._url;
        let promise = this._apliClient.get(completeUrl, null);
        let anotherPromise = promise.then((data) => {
            

            console.log(data.sprites.back_default),

            pokemon._peso = data.weight;
            pokemon._altura = data.height;
            pokemon._imagen=data.sprites.back_default;

            return pokemon;
        });
        return anotherPromise;

    }

}