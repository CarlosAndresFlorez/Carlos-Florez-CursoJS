/*

1) Haciendo uso de funciones y new, realiza una "clase" Vikingo que almacene la información de un vikingo:

nombre
salud (0 - 100)
potenciaAtaque (1 - 20)
valocidad (0 - 100)
*/

function Vikingo() {
    this._nombre = generarNombreVikingo();
    this._salud = 100;
    this._potenciaAtaque = generarNumeroAleatorio(1, 20);
    this._velocidad = generarNumeroAleatorio(0, 100);
    this._armas = [];
    this._dinero = generarNumeroAleatorio(0, 200);
}

function generarNombreVikingo() {
    var nombresVikingos = ["Carlos", "Daniel", "Fabian", "Juan Carlos", "Bryan", "Saul", "Christian", "Marcel", "Ronal", "David", "Fran"];
    var indice = generarNumeroAleatorio(0, nombresVikingos.length - 1);

    return nombresVikingos[indice];
}

function generarNumeroAleatorio(minimo, maximo) {
    var anchoFranjaNumerica = (maximo - minimo) + 1;
    var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

    return numero;
}



/*2) Haz uso de prototype y añade un método .ataca(vikingo) a un vikingo para que ataque a su oponente.
el ataque quitara salud al vikingo atacado (la potencia de ataque del atacante)*/

/*6) Modifica la función ataca del vikingo, para que si tiene armas disponibles ataque con el arma más potente.
Cada vez que se use un arma, debera restar uno a ataquesRestantes de ese arma.
Cuando el arma tenga 0 ataquesRestantes, el vikingo deberá abandonar el arma (añade la función abandonarArma al vikingo).

*/

Vikingo.prototype.atacar = function(vikingo) {


    var saludAtacado = vikingo._salud;
    var armaMasPotente = this._armas[0];
    if (this._armas.length > 0) {
        for (indice in this._armas) {
            var arma = this._armas[indice];

            if (arma._potencia >= armaMasPotente._potencia) {
                armaMasPotente = arma;
            }
        }
    } else(armaMasPotente = this._potenciaAtaque)
    vikingo._salud = vikingo._salud - armaMasPotente._potencia;
    armaMasPotente._ataquesRestantes = armaMasPotente._ataquesRestantes - 1;

    if (armaMasPotente._ataquesRestantes = 0) {
        this._armas.splice(indice, 1);
    }

    return armaMasPotente;
}

function Batalla(vikingo1, vikingo2) {

    this._vikingo1 = vikingo1;
    this._vikingo2 = vikingo2;
}
Batalla.prototype.iniciarPelea = function() {

    var turno = 0;

    if (this._vikingo1._velocidad >= this._vikingo2._velocidad) {

        turno = 1;


    } else {

        turno = 2;


    }

    while (this._vikingo1._salud > 0 && this._vikingo2._salud > 0) {

        if (turno == 1) {
            this._vikingo1.atacar(this._vikingo2);
            turno = 2;

        } else {
            this._vikingo2.atacar(this._vikingo1);

            turno = 1;
        }
    }

    if (this._vikingo1._salud < 0) {
        this._vikingo1._dinero = this._vikingo1._dinero + this._vikingo2._dinero;
        this._vikingo2._dinero = 0;

        for (indice in this._vikingo2._armas) {

            this._vikingo1._armas.push(this._vikingo2._armas[indice]);
            this._vikingo2._armas.splice(indice, 1);
   	console.log(this._vikingo1,this._vikingo);
    console.log(this._vikingo1._nombre + " le rompió la madre a  " + this._vikingo2._nombre);
        }

    
    } else if (this._vikingo2._salud < 0) {

        this._vikingo2._dinero = this._vikingo2._dinero + this._vikingo1._dinero;
        this._vikingo1._dinero = 0;

        for (indice in this._vikingo1._armas) {

            this._vikingo2._armas.push(this._vikingo1._armas[indice]);
            this._vikingo1._armas.splice(indice, 1);

        }    console.log(this._vikingo2);
    console.log(this._vikingo2._nombre + " le rompió la madre a  " + this._vikingo1._nombre);
    }

     


}

function Arma() {

    this._tipoArma = generarNombreArma();
    this._potencia = generarNumeroAleatorio(20, 50);
    this._ataquesRestantes = generarNumeroAleatorio(0, 10);

}

function generarNombreArma() {
    var nombresArmas = ["Cuchillo", "Espada", "Daga", "Hacha"];
    var indice = generarNumeroAleatorio(0, nombresArmas.length - 1);

    return nombresArmas[indice];
}


Vikingo.prototype.addArma = function(numArmas) {
    for (var i = 0; i < numArmas; i++) {
        var arma = new Arma();
        this._armas.push(arma);
    }

}
vikingo1 = new Vikingo();
vikingo2 = new Vikingo();
batalla = new Batalla(vikingo1, vikingo2);
vikingo1.addArma(generarNumeroAleatorio(1, 5));
vikingo2.addArma(generarNumeroAleatorio(1, 5));

batalla.iniciarPelea();