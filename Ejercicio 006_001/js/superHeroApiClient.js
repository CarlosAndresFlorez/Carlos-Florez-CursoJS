class SuperHeroApiClient {

    constructor(apiClient) {
        this._baseURL = "https://ironhack-characters.herokuapp.com/characters";
        this._apliClient = apiClient;

    }

    getAllSuperHeroes() {

        let completeUrl = this._baseURL;
        let promise = this._apliClient.get(completeUrl, null);
        let anotherPromise = promise.then((data) => {
            let superHeroes = [];
            for (let i = 0; i < data.length; i++) {
                let elemento = data[i];
                let superHeroe = new Superheroe(
                    elemento.id,
                    elemento.name,
                    elemento.weapon,
                    elemento.occupation,
                    elemento.debt
                );

                superHeroes.push(superHeroe);

            }

            return superHeroes;
        });
        return anotherPromise;
    }

    createSuperHeroe(superHero) {

        let completeUrl = this._baseURL;

        let superHeroObject = {
            name: superHero._apodo,
            weapon: superHero._arma,
            occupation: superHero._trabajo,
            debt: superHero._deuda

        };

        let promise = this._apliClient.post(completeUrl, superHeroObject);

        //el post como respuesta devuelve una promesa,
        //Cuando esa promesa se cumple(se crea objeto) mapea el superheroe creado a los nombres originales de las propiedades.
        let anotherPromise = promise.then((data) => {
            let superHeroe = new Superheroe(data.id, data.name, data.weapon, data.occupation, data.debt);

            return true;

        });

        return anotherPromise;

    }
    editSuperHero(superHero) {

        let superHeroObject = {
            id: superHero._identificador,
            name: superHero._apodo,
            weapon: superHero._arma,
            occupation: superHero._trabajo,
            debt: superHero._deuda

        };

        let completeUrl = this._baseURL + "/" + superHero._identificador;
        let promise = this._apliClient.put(completeUrl, superHeroObject);

        let anotherPromise = promise.then((data) => {
            let superHeroe = new Superheroe(data.id, data.name, data.weapon, data.occupation, data.debt);

            return true;

        });

        return anotherPromise;
    }
    deleteSuperHero(superHero) {

        let superHeroObject = {
            id: superHero._identificador,
            name: superHero._apodo,
            weapon: superHero._arma,
            occupation: superHero._trabajo,
            debt: superHero._deuda

        };

        let completeUrl = this._baseURL + "/" + superHero._identificador;
        let promise = this._apliClient.delete(completeUrl, superHeroObject);

        let anotherPromise = promise.then((data) => {
            let superHeroe = new Superheroe(data.id, data.name, data.weapon, data.occupation, data.debt);

            return true;

        });

        return anotherPromise;

    }}