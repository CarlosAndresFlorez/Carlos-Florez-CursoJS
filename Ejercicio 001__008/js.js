//ejercicio 008

function recibirString(string){

var cadena = string.split(":");

console.log(cadena);

var suma=0;

for(numero in cadena){

var suma= suma + +cadena[numero];


}console.log("La suma es " + suma);

var promedio = suma/cadena.length;
return console.log("El promedio es " + promedio);

}

var stringDeNumeros = '80:70:90:100';
recibirString(stringDeNumeros);