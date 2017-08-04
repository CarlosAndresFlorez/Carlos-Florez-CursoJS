function Biblioteca() {
    this._nombre = "Biblioteca Bogotá";
    this._secciones = [];
    this._socios = [];
}


function Libro() {
    this._nombre = generarNombreLibroAleatorio();
    this._numeroDePaginas = generarNumeroAleatorio(0, 1000);
    this._autor = generarNombreAutorAleatorio();
    this._tematica = biblioteca.dameSeccionAleatoria();
}



function Seccion(nombre) {
    this._nombre = nombre;
    this._libros =[];

}


function Socio() {
    this._nombre = generarNombreSocioAleatorio();
    this._numeroDeSocio = generarNumeroAleatorio(1, 100);
    this._libros = [];
}

Socio.prototype.ejecutarCiclo = function() {


}


Biblioteca.prototype.dameLibroAleatorio = function() {

    var numeroLibrosAPrestar = generarNumeroAleatorio(1, 3);

    for (var i = 0; i <= numeroLibrosAPrestar;i++) {
        var seccionAleatoria = dameSeccionAleatoria();

        var indiceAleatorioLib = generarNumeroAleatorio(0, seccionAleatoria._libros.length - 1);
        var libro = seccionAleatoria._libros[indiceAleatorioLib];

        for (socio in this._socios) {
            this._socios[socio]._libros.push[libro];
        }

    }


}

Biblioteca.prototype.devolverLibro = function() {


}
Biblioteca.prototype.dameSeccionAleatoria = function() {

    var indiceAleatorio = generarNumeroAleatorio(0, this._secciones.length - 1);
    var seccion = this._secciones[indiceAleatorio]._nombre;
    return seccion;
}


Seccion.prototype.añadirLibro = function(numeroLibros) {
    for (var i = 0; i < numeroLibros; i++) {
        var libro = new Libro();
        this._libros.push(libro);

    }

}


Biblioteca.prototype.inicializarBiblioteca = function() {

    biblioteca._secciones.push("Amor");
    biblioteca._secciones.push("Aventuras");
    biblioteca._secciones.push("Naturaleza");
    biblioteca._secciones.push("Historia");
    biblioteca._secciones.push("Viajes");

}


Biblioteca.prototype.insertarSociosAleatoriamente = function(numeroSocios) {
    for (var i = 0; i < numeroSocios; i++) {
        var socio = new Socio();
        biblioteca._socios.push(socio);

    }

}




//Funciones auxiliares

function generarNombreLibroAleatorio() {
    var nombresLibros = ["La Caperucita", "JavaScript Básico", "JavaScript Avanzado", "100 años de soledad", "El Capitán no tiene quien le escriba", "Mobby Dick"];
    var indice = generarNumeroAleatorio(0, nombresLibros.length - 1);

    return nombresLibros[indice];
}


function generarNombreSocioAleatorio() {
    var nombresSocios = ["Carlos", "Daniel", "Fabian", "Juan Carlos", "Bryan", "Saul", "Christian", "Marcel", "Ronal", "David", "Fran"];
    var indice = generarNumeroAleatorio(0, nombresSocios.length - 1);

    return nombresSocios[indice];
}

function generarNumeroAleatorio(minimo, maximo) {
    var anchoFranjaNumerica = (maximo - minimo) + 1;
    var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

    return numero;
}



function generarNombreAutorAleatorio() {
    var nombresAutor = ["Pepe", "James", "Crstiano", "Messi", "Botero", "Isco", "Guardiola", "Mourinho"];
    var indice = generarNumeroAleatorio(0, nombresAutor.length - 1);

    return nombresAutor[indice];
}


biblioteca = new Biblioteca();
seccion = new Seccion();

biblioteca.inicializarBiblioteca();

seccion.añadirLibro(1000);

biblioteca.insertarSociosAleatoriamente(100);