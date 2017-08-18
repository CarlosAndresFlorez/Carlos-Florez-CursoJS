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

    constructor() {}

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

    static generarPaisAleatorio() {
        let nombrePais = ["Colombia", "Peru", "España", "Chile", "Argentina", "Uruguay", "Brasil"];
        let indice = this.generarNumeroAleatorio(0, nombrePais.length - 1);

        return nombrePais[indice];
    }
}
class Ejercito {

    constructor() {
        this._pais = Utilidades.generarPaisAleatorio();
        this._soldados = [];
        this._bajas = [];
        this.generarSoldados();
    }

    seleccionarSoldadoAleatorio() {
        let indiceAleatorio = Utilidades.generarNumeroAleatorio(0, this._soldados.length - 1);
        let soldado = this._soldados[indiceAleatorio];
        return soldado;
    }

    generarSoldados() {
        for (let i = 0; i < 500; i++) {
            let soldadoInfanteria = new SoldadoDeInfanteria();
            this._soldados.push(soldadoInfanteria);
        }
        for (let i = 0; i < 200; i++) {
            let soldadoDeCaballeria = new SoldadoDeCaballeria();
            this._soldados.push(soldadoDeCaballeria);
        }
        for (let i = 0; i < 200; i++) {
            let soldadoDeArtilleria = new SoldadoDeArtilleria();
            this._soldados.push(soldadoDeArtilleria);
        }
        for (let i = 0; i < 100; i++) {
            let soldadoDeF18 = new SoldadoPilotoF18();
            this._soldados.push(soldadoDeF18);
        }
    }
    comprobarBajas() {
        for (let indice in this._soldados) {
            let soldado = this._soldados[indice];
            if (soldado._salud <= 0) {
                this._bajas.push(soldado);
                this._soldados.splice(indice, 1);
            }
        }
    }
}
class Guerra {

    constructor(ejercito1, ejercito2) {
        this._numeroDeJornadasTranscurridas = 0;
        this._ejercito1 = ejercito1;
        this._ejercito2 = ejercito2;
    }

    iniciarGuerra() {
      
        let intervalID = setInterval(() =>this.ejecutarJornadaDeGuerra(intervalID), 1000);
    }

    ataqueEjercito(ejercito1, ejercito2, intervalID) {
        if (ejercito2._soldados.length > 0) {
            for (let indice in ejercito1._soldados) {
                let soldadoAtacanteEj1 = ejercito1._soldados[indice];
                let soldadoAtacadoEj2 = ejercito2.seleccionarSoldadoAleatorio();
                soldadoAtacanteEj1.ataca(soldadoAtacadoEj2);
            }
        } else {

            clearInterval(intervalID);
        }
    }

    ejecutarJornadaDeGuerra(intervalID) {
        this._numeroDeJornadasTranscurridas = this._numeroDeJornadasTranscurridas + 1;
        this._ejercito1.comprobarBajas();
        this._ejercito2.comprobarBajas();
        this.ataqueEjercito(this._ejercito1, this._ejercito2, intervalID);
        this.ataqueEjercito(this._ejercito2, this._ejercito1, intervalID);
        this.imprimirEstado();
    }

    imprimirEstado() {
        console.clear();
        console.log("Número de jornadas ejecutadas: " + this._numeroDeJornadasTranscurridas);
        console.log("Numero de soldados vivos en ejercito 1: " + this._ejercito1._soldados.length);
        console.log("Numero de soldados vivos en ejercito 2: " + this._ejercito2._soldados.length);
        console.log("Muertes ejército 1: " + this._ejercito1._bajas.length);
        console.log("Muertes ejército 2: " + this._ejercito2._bajas.length);
        console.log("\n");
    }
}
soldado = new Soldado();
ejercito1 = new Ejercito();
ejercito2 = new Ejercito();
guerra = new Guerra(ejercito1, ejercito2);
guerra.iniciarGuerra();