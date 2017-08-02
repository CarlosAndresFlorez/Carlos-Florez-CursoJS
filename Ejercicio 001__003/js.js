//EJERCICIO 3
function masLargo(arreglo) {
    var mayor = 0
    for (var indice in arreglo) {
        if (arreglo[indice].length > mayor) {
            mayor = arreglo[indice].length;
        }
    }
    resultado = {
        longitud: mayor,
        string: arreglo[indice]
    }
    return console.log(resultado);
}
var array = ["Hola", "Frase corta", "Frase normalita", "Frase muy muy larga"];
masLargo(array);

