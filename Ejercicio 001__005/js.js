//EJERCICIO 5   POR OPTIMIZAR!!!!!

function contadorDeCaracteres(cadena) {
    var numeroDeApariciones = 0;
    var cadena = cadena.split("");
    resultado = {};
    cadena.forEach(function(letras) {
        var cont = 0;
        var letraEncontrada = "";
        var letra = letras;
        console.log(letra);
        var cont = 0;
        for (indice in cadena) {
            if (cadena[indice] == letra) {
            	cont = cont + 1;
                resultado[letra] = cont;
            }
        }
        console.log(resultado);
    });
}
contadorDeCaracteres("xyyyxyxyxzyxyzyxyxyasdfz");