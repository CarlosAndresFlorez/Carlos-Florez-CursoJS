/*
1)  Define  una clase   Persona que tenga   los siguientes  atributos:
    Nombre: 
    Edad:
    Nacionalidad:
    Altura: 
    Peso:
    Enfermo:    true/false
    */

class Persona {

    constructor() {

        this._nombre = Utilidades.generarNombreAleatorio();
        this._edad = Utilidades.generarNumeroAleatorio(18, 40);
        this._nacionalidad = Utilidades.generarNacionalidadAleatoria();
        this._altura = Utilidades.generarNumeroAleatorio(150, 200);
        this._peso = Utilidades.generarNumeroAleatorio(50, 100);
        this._enfermo = Utilidades.generarSaludAleatoria(0, 100);
    }
}
/*2)  Definir la  clase   Jugador que herede  de  persona y   tenga   los siguientes  atributos:
    Posición:   (portero/defensa/mediocentro/delantero)
    Numero: 
    Calidad:    (0-100)
La  posición    de  cada    jugador es  completamente   aleatoria
El  estar   enfermo o   no, es  aleatorio   (10%    de  probabilidad    de  estar   enfermo)

*/

class Jugador extends Persona {

    constructor() {
        super();

        this._posicion = Utilidades.generarPosicionAleatoria(1, 4);
        this._numero = Utilidades.generarNumeroAleatorio(0, 90);
        this._calidad = Utilidades.generarNumeroAleatorio(0, 100);

    }

}

/*
3)  Definir la  clase   Equipo  que tenga:
    - Array de  jugadores
    - Entrenador    
Un  equipo  tendrá  22  jugadores   creados aleatoriamente
*/

class Equipo {

    constructor() {

        this._jugadores = [];
        this._entrenador = Utilidades.generarNombreAleatorio();
    }
}


class Entrenador extends Persona {

    constructor(equipo) {
        super();

        this._equipo = equipo;

    }

    elegirPlantillaParaPartido() {

        let equipo = this._equipo._jugadores;


        this._equipo._jugadores.sort(function(a, b) {
            if (a._calidad > b._calidad) {
                return -1;
            }
            if (a._calidad < b._calidad) {
                return 1;
            }
            // a debe ser igual b
            return 0;
        });

        let mejoresJugadores = equipo.splice(0, 10);

        let plantillaPorPosicion = {
            "Portero": [],
            "Defensor": [],
            "MedioCampista": [],
            "Delantero": []
        };

        for (let indice in equipo) {
            let jugador = equipo[indice];
            plantillaPorPosicion[jugador._posicion].push(jugador);
        }

        // console.log(plantillaPorPosicion["Portero"]);
        //console.log(plantillaPorPosicion["Defensor"]);
        //console.log(plantillaPorPosicion["MedioCampista"]);
        //console.log(plantillaPorPosicion["Delantero"]);

        let numeroPorteros = plantillaPorPosicion["Portero"].length;
        console.log("Hay " + numeroPorteros + " porteros en el equipo");

        let numeroDefensores = plantillaPorPosicion["Defensor"].length;
        console.log("Hay " + numeroDefensores + " defensores en el equipo");

        let numeroMediocampistas = plantillaPorPosicion["MedioCampista"].length;
        console.log("Hay " + numeroMediocampistas + " Mediocampistas en el equipo");


        let numeroDelantero = plantillaPorPosicion["Delantero"].length;
        console.log("Hay " + numeroDelantero + " Delanteros en el equipo");

        let banca = [];
        if (numeroPorteros > 1) {
            let porterosSuplentes = plantillaPorPosicion["Portero"].splice(1, numeroPorteros);
            for (let indice in porterosSuplentes) {
                banca.push(porterosSuplentes[indice]);
            }
        }
        console.log(plantillaPorPosicion["Portero"].length);


        if (numeroDefensores > 4) {

            let defensoresSuplentes = plantillaPorPosicion["Defensor"].splice(4, numeroDefensores);
            for (let indice in defensoresSuplentes) {
                banca.push(defensoresSuplentes[indice]);
            }
        }
        console.log(plantillaPorPosicion["Defensor"].length);


        if (numeroMediocampistas > 4) {

            let medioCampistasSuplentes = plantillaPorPosicion["MedioCampista"].splice(4, numeroMediocampistas);

            for (let indice in medioCampistasSuplentes) {

                banca.push(medioCampistasSuplentes[indice]);
            }

        }
        console.log(plantillaPorPosicion["MedioCampista"].length);


        if (numeroDelantero > 2) {
            let delanterosSuplentes = plantillaPorPosicion["Delantero"].splice(2, numeroDelantero);

            for (let indice in delanterosSuplentes) {

                banca.push(delanterosSuplentes[indice]);

            }

        }
        console.log(plantillaPorPosicion["Delantero"].length);

        for (let indice in banca) {

            console.log("el banco de suplentes " + banca[indice]._nombre);
        }


        banca.sort(function(a, b) {
            if (a._calidad > b._calidad) {
                return -1;
            }
            if (a._calidad < b._calidad) {
                return 1;
            }
            // a debe ser igual b
            return 0;
        });

        let numeroPorterosQueTeFaltan = 1 - plantillaPorPosicion["Portero"].length;
        if (numeroPorterosQueTeFaltan > 0) {
            let porterosDelBanco = banca.splice(0, numeroPorterosQueTeFaltan);
            plantillaPorPosicion["Portero"] = plantillaPorPosicion["Portero"].concat(porterosDelBanco);
        }

        console.log("Hay " + plantillaPorPosicion["Portero"].length + " Porteros en el equipo");

        let numeroDefensasQueFaltan = 4 - plantillaPorPosicion["Defensor"].length;
        if (numeroDefensasQueFaltan > 0) {
            let defensasDelBanco = banca.splice(0, numeroDefensasQueFaltan);
            plantillaPorPosicion["Defensor"] = plantillaPorPosicion["Defensor"].concat(defensasDelBanco);
        }
        console.log("Hay " + plantillaPorPosicion["Defensor"].length + " Defensores en el equipo");

        let numeroMediosQueFaltan = 4 - plantillaPorPosicion["MedioCampista"].length;
        if (numeroMediosQueFaltan > 0) {
            let mediosDelBanco = banca.splice(0, numeroMediosQueFaltan);
            plantillaPorPosicion["MedioCampista"] = plantillaPorPosicion["MedioCampista"].concat(mediosDelBanco);
        }

        console.log("Hay " + plantillaPorPosicion["MedioCampista"].length + " Mediocampistas en el equipo");


        let numeroDelanterosQueFaltan = 2 - plantillaPorPosicion["Delantero"].length;
        if (numeroDelanterosQueFaltan > 0) {
            let delanterosDelBanco = banca.splice(0, numeroDelanterosQueFaltan);
            plantillaPorPosicion["Delantero"] = plantillaPorPosicion["Delantero"].concat(delanterosDelBanco);
        }
        console.log("Hay " + plantillaPorPosicion["Delantero"].length + " Delanteros en el equipo");


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

    static generarNacionalidadAleatoria() {
        let nombresNacionalidades = ["Colombiano", "Peruano", "Español", "Chileno", "Argentino", "Uruguayo", "Brasileño"];
        let indice = this.generarNumeroAleatorio(0, nombresNacionalidades.length - 1);

        return nombresNacionalidades[indice];
    }


    static generarSaludAleatoria(minimo, maximo) {
        let enfermo = 0;
        let anchoFranjaNumerica = (maximo - minimo) + 1;
        let numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

        if (0 <= numero && numero <= 10) {
            enfermo = 1;
        }
        return enfermo;
    }


    static generarPosicionAleatoria() {

        let posiciones = ["Portero", "Defensor", "MedioCampista", "Delantero"];
        let indice = this.generarNumeroAleatorio(0, posiciones.length - 1);

        return posiciones[indice];


    }

    static crearEquipo() {

        for (let i = 0; i < 22; i++) {

            let jugador = new Jugador();

            equipo._jugadores.push(jugador);

        }

    }


}



/*5)  Define  la  clase   partido que se  cree    a   partir  de  dos equipos.
La  clase   partido tendrá  el  método  jugarPartido    que hará    que se  dispute.
Lógica  del partido:
Cada    equipo  hará    10  ataques que funcionarán de  la  siguiente   manera
*/



class Partido {

    constructor() {

      
    }


    jugarPartido(equipo1,equipo2) {

        /*
        Si  ataca   el  equipo  1   se  calculará:
        A   =   (Suma   de  calidad de  medio   centros equipo  1)  - (Suma de  calidad de  medio   centros 
        equipo  2)
        B   =   (Suma   de  calidad de  delanteros  1)  - (Suma de  calidad de  defensas    equipo  2)
        C   =   A   +   B   - (Suma de  calidad de  portero equipo  2)
        Fortuna =   numero  aleatorio   entre   0   y   100
        Para    cada    jugador que no  esté    en  su  puesto  del equipo  1:  
        C   =   C   - 10
        Para    cada    jugador que no  esté    en  su  puesto  del equipo  2:  
        C   =   C   +   10
        TOTAL   =   C   +   Fortuna
        Si  total   es  mayor   que cero    ->  GOOOOOOOL
        Si  total   es  igual   a   cero    ->  PALO    !!!
        Si  total   es  menor   que cero    ->  Ná  de  ná
        AL  finalizar   el  partido deberá  mostrarse   el  resultado
        */
        let calidadMedioCampistasEquipo1=0;
        for(indice in equipo1._jugadores){
            let jugador=equipo1._jugadores[indice];
            calidadMedioCampistasEquipo1=calidadMedioCampistasEquipo1+jugador._calidad;
        }

        let a= 


    }
}


persona = new Persona();
equipo1 = new Equipo();
equipo2 = new Equipo();
Utilidades.crearEquipo();
entrenador = new Entrenador(equipo1);
entrenador = new Entrenador(equipo2);
entrenador.elegirPlantillaParaPartido();