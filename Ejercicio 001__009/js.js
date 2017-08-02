//Ejercicio 001__009
function stringInverso(cadena) {
    var stringAArray = cadena.split("");
    console.log(stringAArray);
    var arregloInverso = [];
    for (var i = stringAArray.length - 1; i >= 0; i--) {
        arregloInverso.push(stringAArray[i]);
    }
    console.log(arregloInverso);
}
stringInverso("Hola clase!");




function eliminarEspacios(string) {
    // Con expresión regular

    string = string.replace(/\s/g, '');
    return console.log(string);
}

eliminarEspacios("hola a ti");


function ponerTodasLasLetrasMayusculas(string){
var mayusculas = string.toUpperCase();
return console.log(mayusculas);
}

ponerTodasLasLetrasMayusculas("hola como estas");



function esPalindromo(string) {

    string = string.toLowerCase();
    string = string.replace(/\s/g, '');
    var stringAArray = string.split("");

    var resultado = stringInverso(string);
    var i = 0;
    console.log(stringAArray + " " + resultado);
    for (i; i <= stringAArray.length - 1; i++) {

        var array = stringAArray.toString();
        var arrayInverso = resultado.toString();
        if (array == arrayInverso) {
            console.log("Es palindromo");
        } else {
            console.log("no es palíndroma")
        }
    }

}

esPalindromo("Arde ya la yedra");

function stringInverso(string) {
    var stringAArray = string.split("");
     var arregloInverso = [];
    for (var i = stringAArray.length - 1; i >= 0; i--) {
        arregloInverso.push(stringAArray[i]);
    }
    
    return arregloInverso;
}