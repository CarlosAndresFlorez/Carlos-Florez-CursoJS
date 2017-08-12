function Vehiculo() {
    this._marca = utilidades.generarMarcaAleatoria();
    this._modelo = utilidades.generarModeloAleatorio();
    this._velocidadMaxima = utilidades.generarNumeroAleatorio(100, 200);
    this._distanciaRecorrida = 0;
    this._imagen = utilidades.asignarImagen();

}

function Carrera(vehiculo1, vehiculo2) {

    this._vehiculo1 = vehiculo1;
    this._vehiculo2 = vehiculo2;
    this._resultados = [];
}

Carrera.prototype.cicloCarrera = function(imagen1,imagen2, intervalID) {

    this.moverVehiculo(imagen1,imagen2);

    if (this._vehiculo1._distanciaRecorrida < 500 || this._vehiculo2._distanciaRecorrida < 500) {

        this._vehiculo1._distanciaRecorrida = this._vehiculo1._distanciaRecorrida + this._vehiculo1.getMetrosQueAvanzaCadaSegundo();
        this._vehiculo2._distanciaRecorrida = this._vehiculo2._distanciaRecorrida + this._vehiculo2.getMetrosQueAvanzaCadaSegundo();



        if (this._vehiculo1._distanciaRecorrida >= 500) {
            this._vehiculo1._distanciaRecorrida = 500;
            console.log("El auto 1 ha terminado la carrera");

            if (this._resultados.indexOf(this._vehiculo1) == -1) {
                this._resultados.push(this._vehiculo1);
            }
        }
        if (this._vehiculo2._distanciaRecorrida >= 500) {
            this._vehiculo2._distanciaRecorrida = 500;
            console.log("El auto 2 ha terminado la carrera");

            if (this._resultados.indexOf(this._vehiculo2) == -1) {

                this._resultados.push(this._vehiculo2);
            }
        }
        console.log("El auto 1 ha avanzado " + this._vehiculo1._distanciaRecorrida + " metros");
        console.log("El auto 2 ha avanzado " + this._vehiculo2._distanciaRecorrida + " metros");
    } else {

        window.clearInterval(intervalID);

        for (var i = 0; i <= this._resultados.length - 1; i++) {

            var vehiculo = this._resultados[i];
            var posicion = i + 1;
            console.log("Los resultados de la carrera son: " + posicion + "  " + vehiculo._marca + "  " + vehiculo._modelo + " " + vehiculo._velocidadMaxima);
        }
    };
}

Carrera.prototype.iniciarCarrera = function(imagen1,imagen2) {

    var ref = this;

    var intervalID = setInterval(function() { ref.cicloCarrera(imagen1,imagen2,intervalID); }, 1000);

}


Vehiculo.prototype.getMetrosQueAvanzaCadaSegundo = function() {

    var velocidadEnKmh = this._velocidadMaxima;
    var metros = (utilidades.generarNumeroAleatorio(-20, 20) + velocidadEnKmh) * 1000 / 3600;
    return metros;
}

function Utilidades() {

}

Utilidades.prototype.generarNumeroAleatorio = function(minimo, maximo) {

    var anchoFranjaNumerica = (maximo - minimo) + 1;
    var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

    return numero;
}
Utilidades.prototype.generarMarcaAleatoria = function() {

    var marcas = ["Kia", "Ferrari", "Bmw", "Chevrolet"];

    indiceAleatorio = utilidades.generarNumeroAleatorio(0, marcas.length - 1);

    marca = marcas[indiceAleatorio];

    return marca;
}

Utilidades.prototype.generarModeloAleatorio = function() {

    var modelos = ["A4", "Jetta GLI 1.8T", "Forte", "M3"];
    indiceAleatorio = utilidades.generarNumeroAleatorio(0, modelos.length - 1);
    modelo = modelos[indiceAleatorio];
    return modelo;
}




function crearImg(src) {

    var elemento = document.createElement("img");
    elemento.setAttribute("src", src);
    elemento.setAttribute("class", "vehiculo");
    return elemento;

}

Utilidades.prototype.asignarImagen = function() {

    var arregloImagenes = ["imagenes/vehiculo1.png", "imagenes/vehiculo2.png", "imagenes/vehiculo3.png", "imagenes/vehiculo4.png", "imagenes/vehiculo5.png", "imagenes/vehiculo6.png", "imagenes/vehiculo7.png", "imagenes/vehiculo8.png", "imagenes/vehiculo9.png", "imagenes/vehiculo10.png"];
    var imagenAleatoria = this.generarNumeroAleatorio(0, 9);
    imagen = arregloImagenes[imagenAleatoria];
    return imagen;

}


Carrera.prototype.moverVehiculo = function(imagen1,imagen2) {



    imagen1.setAttribute("style", "margin-left:" + (vehiculo1._distanciaRecorrida * 1200 / 500) + "px");
    imagen2.setAttribute("style", "margin-left:" + (vehiculo2._distanciaRecorrida * 1200 / 500) + "px");


}







window.onload = function() {


    utilidades = new Utilidades();
    vehiculo1 = new Vehiculo();
    vehiculo2 = new Vehiculo();

    carrera = new Carrera(vehiculo1, vehiculo2);

    var carril1 = document.querySelector(".carril1");
    var carril2 = document.querySelector(".carril2 ");

    var imagen1 = crearImg(vehiculo1._imagen);
    carril1.appendChild(imagen1);

    var imagen2 = crearImg(vehiculo2._imagen);
    carril2.appendChild(imagen2);

    carrera.iniciarCarrera(imagen1,imagen2);







}