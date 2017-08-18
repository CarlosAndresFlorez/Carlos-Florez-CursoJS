function Libro(tematica, nombre) {
    this._nombre = nombre;
    this._numeroDePaginas = generarNumeroAleatorio(0, 1000);
    this._autor = generarNombreAutorAleatorio();
    this._tematica = tematica;
}



function Seccion(nombre) {
    this._nombre = nombre;
    this._libros = [];

}

//Funciones auxiliares


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

//fin funciones auxiliares
function Biblioteca(nombre) {
    this._nombre = nombre;
    this._secciones = [];
    this._socios = [];
}

Biblioteca.prototype.dameLibroAleatorio = function() {

    var seccionAleatoria = this.dameSeccionAleatoria();

    var indiceAleatorioLib = generarNumeroAleatorio(0, seccionAleatoria._libros.length - 1);
    var libro = seccionAleatoria._libros[indiceAleatorioLib];
    return libro;
}

Biblioteca.prototype.dameSeccionAleatoria = function() {

    var seccionAleatoria = null;
    var indiceAleatorio = generarNumeroAleatorio(0, this._secciones.length - 1);
    seccionAleatoria = this._secciones[indiceAleatorio];
    return seccionAleatoria;

}

Biblioteca.prototype.devolverLibro = function(libro) {

    this.añadirLibro(libro);

}

Biblioteca.prototype.insertarLibroNuevo = function(titulo) {


    indiceAleatorio = generarNumeroAleatorio(0, this._secciones.length - 1);
    var seccionAleatoria = this._secciones[indiceAleatorio]._nombre;
    var libro = new Libro(seccionAleatoria, titulo);

    this.añadirLibro(libro);
    return true;
}


Biblioteca.prototype.añadirLibro = function(libro) {

    var tematicaLibro = libro._tematica;


    for (indice in this._secciones) {
        var seccion = this._secciones[indice]._nombre;
        if (tematicaLibro == seccion) {

            this._secciones[indice]._libros.push(libro);
        }

    }

}


Biblioteca.prototype.inicializarBiblioteca = function() {

    this._secciones.push(new Seccion("Amor"));
    this._secciones.push(new Seccion("Aventuras"));
    this._secciones.push(new Seccion("Naturaleza"));
    this._secciones.push(new Seccion("Historia"));
    this._secciones.push(new Seccion("Viajes"));

    this.insertarLibrosNuevos();
    this.insertarSociosAleatoriamente(100);

}


Biblioteca.prototype.insertarSociosAleatoriamente = function(numeroSocios) {
    for (var i = 0; i < numeroSocios; i++) {
        var socio = new Socio(i);
        this._socios.push(socio);

    }

}

Biblioteca.prototype.insertarLibrosNuevos = function() {

    for (var i = 0; i < 1000; i++) {

        this.insertarLibroNuevo("Titulo" + i);

    }


}

Biblioteca.prototype.sacarLibro = function(libro) {

    var libroPrestado = libro;

    for (indiceSeccion in this._secciones) {
        var seccion = this._secciones[indiceSeccion];
        for (indiceLibro in seccion._libros) {
            var libroEncontrado = seccion._libros[indiceLibro];

            if (libroEncontrado._nombre == libroPrestado._nombre) {

                seccion._libros.splice(indiceLibro, 1);
            }

        }
    }

}

Biblioteca.prototype.dameSocioAleatorio = function() {

    var indiceSocioAleatorio = generarNumeroAleatorio(0, this._socios.length - 1);
    var socioAleatorio = this._socios[indiceSocioAleatorio];
    return socioAleatorio;
}

Biblioteca.prototype.ejecutarCiclo = function() {

    for (var i = 0; i <= this._socios.length - 1; i++) {
        socio = this._socios[i];
        var ref = this;
        socio.ejecutarCiclo(this);
        var totalLibros = 0;
        console.clear();

        console.log("Biblioteca Municipal: " + this._nombre);
        for (indice in this._secciones) {
            var seccion = this._secciones[indice];
            totalLibros = totalLibros + seccion._libros.length;

            console.log("Sección " + seccion._nombre + "\n Numero de Libros: " + seccion._libros.length);

        }
        console.log("Total de libros en la biblioteca: " + totalLibros);
        var librosPrestados = 1000 - totalLibros;
        console.log("Total de libros prestados: " + librosPrestados);
        console.log("\n");
    }
    setInterval(function() { ref.ejecutarCiclo(); }, 5000);
}

function Socio(numeroDeSocio) {
    this._nombre = generarNombreSocioAleatorio();
    this._numeroDeSocio = numeroDeSocio;
    this._libros = [];
}


Socio.prototype.ejecutarCiclo = function(miBiblioteca) {

    for (indice in this._libros) {

        libro = this._libros[indice];

        miBiblioteca.devolverLibro(libro);
    }

    this._libros = [];

    var numeroLibrosAPrestar = generarNumeroAleatorio(1, 3);
    for (var i = 1; i <= numeroLibrosAPrestar; i++) {
        var libro = miBiblioteca.dameLibroAleatorio();
        socio._libros.push(libro);
        miBiblioteca.sacarLibro(libro);
    }
}

biblioteca = new Biblioteca("Biblioteca Bogotá");
biblioteca.inicializarBiblioteca();
biblioteca.ejecutarCiclo();