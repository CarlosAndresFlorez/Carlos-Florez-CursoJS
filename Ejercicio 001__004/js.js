//EJERCICIO 4
var arrayDeTest1 = ["Richie", "Joanie", "Greg", "Marcia", "Bobby"];
var arrayDeTest2 = ["Blanka", "Zangief", "Chun Li", "Guile"];
var arrayDeTest3 = ["Red", "Blue", "Green"];
var arrayDeTest4 = ["Hola", "Frase corta", "Frase normalita", "Frase muy muy larga"];
var array = ["Hola", "Frase corta", "Frase normalita", "Frase muy muy larga", "asd"];

arreglo = [];

function ej3(arreglo) {
    var mayor = 0;
    for (var i = 0; i < arreglo.length; i++) {

        if (typeof(arreglo[i]) == "string") {
            var cont = arreglo[i].length;
            if (cont > mayor) {
                mayor = cont;
                var contString = i;
            }
            var objeto = {
                longitud: mayor,
                string: arreglo[contString]
            }
        } else {
            console.log("Existen valores en el arreglo que NO son string");
        }
    }

    return mayor;
}
var res1 = ej3(arrayDeTest1);
var res2 = ej3(arrayDeTest2);
var res3 = ej3(arrayDeTest3);
var res4 = ej3(arrayDeTest4);
var arrayResultados = [];
arrayResultados.push(res1, res2, res3, res4);

function media(arrayResultados) {
    var suma = 0;
    for (var indice in arrayResultados) {

        suma = suma + arrayResultados[indice];
        media = suma / arrayResultados.length;
    }
    return console.log(media);
}
media(arrayResultados);


