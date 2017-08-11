/*
1) Realiza la clase Soldado que tenga lo siguientes atributos:

    - Nombre (aleatorio)
    - Salud (100)
    - Potencia de ataque (0)

Y los siguientes métodos:

    - Ataca(soldado) -> Recibirá un soldado y le quitará salud (la potencia de ataque que tenga).

(si, igual que en los vikingos :P)

*/

class Soldado {

    constructor() {

        this.nombre = Utilidades.generarNombreAleatorio();
        this._salud = 100;
        this._potenciaDeAtaque = 0;
    }
    ataca(soldado) {

        let saludAtacado = soldado._salud;

        soldado._salud = soldado._salud - this._potenciaDeAtaque;

    }

}


/*2) Realiza las siguientes clases:

SoldadoDeInfanteria que herede de Soldado, y tendrá las siguientes propiedades:
    - Potencia de ataque (Aleatorio 1-25)


SoldadoDeCaballeria que herede de Soldado, y tendrá las siguientes propiedades:
    - Potencia de ataque (Aleatorio 25-50)


SoldadoDeArtilleria que herede de Soldado, y tendrá las siguientes propiedades:
    - Potencia de ataque (Aleatorio 50-75)


SoldadoPilotoF18 que herede de Soldado, y tendrá las siguientes propiedades:
    - Potencia de ataque (Aleatorio 75-100)*/


class SoldadoDeInfanteria extends Soldado {

    constructor() {
        super();
        this._potenciaDeAtaque = Utilidades.generarNumeroAleatorio(1, 25);

    }
}

class SoldadoDeCaballeria extends Soldado {

    constructor() {
        super();
        this._potenciaDeAtaque = Utilidades.generarNumeroAleatorio(25, 50);

    }
}

class SoldadoDeArtilleria extends Soldado {

    constructor() {
        super();
        this._potenciaDeAtaque = Utilidades.generarNumeroAleatorio(50, 75);

    }
}

class SoldadoPilotoF18 extends Soldado {

    constructor() {
        super();
        this._potenciaDeAtaque = Utilidades.generarNumeroAleatorio(75, 100);

    }
}


class Utilidades {

    constructor() {

    }

    static generarNombreAleatorio() {
        let nombresJugadores = ["Carlos", "Daniel", "Fabian", "Juan Carlos", "Bryan", "Saul", "Christian", "Marcel", "Ronal", "David", "Fran", "James", "Messi", "Cristiano", "Pepe"];
        let indice = this.generarNumeroAleatorio(0, nombresJugadores.length - 1);

        return nombresJugadores[indice];
    }

    static generarNumeroAleatorio(minimo, maximo) {
        let anchoFranjaNumerica = (maximo - minimo) + 1;
        let numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

        return numero;
    }

    static generarSoldados(ejercito) {

        for (let i = 0; i < 500; i++) {

            let soldadoInfanteria = new SoldadoDeInfanteria();

            ejercito._soldados.push(soldadoInfanteria);

        }


        for (let i = 0; i < 200; i++) {

            let soldadoDeCaballeria = new SoldadoDeCaballeria();

            ejercito._soldados.push(soldadoDeCaballeria);

        }

        for (let i = 0; i < 200; i++) {

            let soldadoDeArtilleria = new SoldadoDeArtilleria();

            ejercito._soldados.push(soldadoDeArtilleria);

        }


        for (let i = 0; i < 100; i++) {

            let soldadoDeF18 = new SoldadoPilotoF18();

            ejercito._soldados.push(soldadoDeF18);

        }




    }

    static generarPaisAleatorio() {
        let nombrePais = ["Colombia", "Peru", "España", "Chile", "Argentina", "Uruguay", "Brasil"];
        let indice = this.generarNumeroAleatorio(0, nombrePais.length - 1);

        return nombrePais[indice];
    }




}

/*
3) Realiza la clase Ejercito con los siguientes atributos:

    - Pais (aleatorio)
    - Soldados (array)
    - Bajas (array)

En su creación la clase Ejercito generará 1000 soldados:
    500 de Infanteria
    200 de Caballeria
    200 de Artillería
    100 pilotos de F18

    */

class Ejercito {

    constructor() {

        this._pais = Utilidades.generarPaisAleatorio();
        this._soldados = [];
        this._bajas = [];
    }


    seleccionarSoldadoAleatorio() {


        let indiceAleatorio = Utilidades.generarNumeroAleatorio(0, this._soldados.length - 1);
        let soldado = this._soldados[indiceAleatorio];
        return soldado;

    }

}


/*
4) Realiza la clase Guerra, que recibirá dos ejercitos en su construcción.

La clase guerra deberá tener los siguientes atributos:
    - Numero de jornadas transcurridas: 0
    - Ejercito 1
    - Ejericto 2
*/


class Guerra {

    constructor(ejercito1, ejercito2) {

        this._numeroDeJornadasTranscurridas = 0;
        this._ejercito1 = ejercito1;
        this._ejercito2 = ejercito2;
    }



    /*La clase guerra deberá tener los métodos:
        - Iniciar guerra -> hará que empiecen a ejecutarse jornadas de manera consecutiva 
            (1 jornada cada 1000ms hasta que uno de los ejercitos se quede sin soldados)

        
*/
    iniciarGuerra() {

        if (this._ejercito1._soldados.length-1 > 0 && this._ejercito2._soldados.length-1 > 0) {
            this.ejecutarJornadaDeGuerra();
        }
        let ref = this;
        let intervalID = setInterval(function() { ref.iniciarGuerra(); }, 1000);


    }

    /*- Ejecutar jornada de guerra: en cada jornada de la guerra cada soldado de cada ejercito atacará a un soldado del ejercito contrario. 
        La elección del soldado al que atacará puede ser aleatoria
        Si un soldado muere (salud<=0) pasará al array de bajas de su ejército, y saldrá del array de soldados
        No importa qué ejercito empiece atacando.
        */

    ejecutarJornadaDeGuerra() {



        this._numeroDeJornadasTranscurridas = this._numeroDeJornadasTranscurridas + 1;

        for (let indice in this._ejercito1._soldados) {
            let soldado = this._ejercito1._soldados[indice];
            if (soldado._salud <= 0) {

                this._ejercito1._bajas.push(soldado);
                this._ejercito1._soldados.splice(indice, 1);
            }
        }

        for (let indice in this._ejercito2._soldados) {
            let soldado = this._ejercito2._soldados[indice];
            if (soldado._salud <= 0) {

                this._ejercito2._bajas.push(soldado);
                this._ejercito2._soldados.splice(indice, 1);
            }
        }


        //CUANDO ATACA EJERCITO 1
        let soldadoAtacanteEj1 = this._ejercito1.seleccionarSoldadoAleatorio();
        let soldadoAtacadoEj2 = this._ejercito2.seleccionarSoldadoAleatorio();

        soldadoAtacanteEj1.ataca(soldadoAtacadoEj2);


        //CUANDO ATACA EJERCITO 2

        let soldadoAtacanteEj2 = this._ejercito2.seleccionarSoldadoAleatorio();
        let soldadoAtacadoEj1 = this._ejercito1.seleccionarSoldadoAleatorio();

        soldadoAtacanteEj2.ataca(soldadoAtacadoEj1);


        /*- Imprimir estado:
        Será ejecutado en cada jornada de la guerra y mostrará en la consola:
            - Numero de jornadas ejecutadas
            - Numero de soldados vivos en ejercito 1
            - Numero de soldado vivos en ejercito 2
            - Bajas ejército 1
            - Bajas ejército 2

*/

        console.log("Número de jornadas ejecutadas: " + this._numeroDeJornadasTranscurridas);
        console.log("Numero de soldados vivos en ejercito 1: " + this._ejercito1._soldados.length);
        console.log("Numero de soldados vivos en ejercito 2: " + this._ejercito2._soldados.length);
        console.log("Bajas ejército 1: " + this._ejercito1._bajas.length);
        console.log("Bajas ejército 2: " + this._ejercito2._bajas.length);
        console.log("\n");





    }

}

soldado = new Soldado();
ejercito1 = new Ejercito();
ejercito2 = new Ejercito();
Utilidades.generarSoldados(ejercito1);
Utilidades.generarSoldados(ejercito2);
guerra = new Guerra(ejercito1, ejercito2);
guerra.iniciarGuerra();