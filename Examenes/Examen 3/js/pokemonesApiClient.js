class PokemonesApiClient {

    constructor(apiClient) {
        this._baseURL = "http://pokeapi.co/api/v2/pokemon/?offset=";
        this._apliClient = apiClient;

    }

    getPokemonesAtPage(indice) {


        let URLCompleta=this._baseURL+indice;

        
        let promise = this._apliClient.get(URLCompleta, null);
        let anotherPromise = promise.then((data) => {
            let resultados = data.results;
            let pokedex= {
                numPokemons:data.count,
                pokemones:[]

            }
            console.log(resultados);
           
            for (let i = 0; i < resultados.length; i++) {
                let elemento = resultados[i];
                let pokemon = new Pokemon(
                    elemento.name,
                    elemento.url
                );

                pokedex.pokemones.push(pokemon);
            }

            return pokedex;
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