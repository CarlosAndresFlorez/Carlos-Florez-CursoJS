//EJERCICIO 6

function vaciarPapelera(array){
        for (var i = array.length;i>=0;i--) {
            if(array[i]=="*"){
                array.splice(i,1);
            }
        }var sinAsteriscos= console.log(array);
        return sinAsteriscos;
}
vaciarPapelera(['a',1,'*','*',5]);



function agruparElementos(array) {

    arregloNumeros=[];
	arregloStrings=[];
    	for(indice in array){
    		if (typeof(array[indice])=="number"){

    			arregloNumeros.push(array[indice]);
    		}else if(typeof (array[indice])=="string"){
    			arregloStrings.push(array[indice]);
    		}
    	}   
			var concatenacionNumerosYStrings= console.log(arregloNumeros.concat(arregloStrings));
			return concatenacionNumerosYStrings;
}
agruparElementos(['B', 'a', 4 , 23, 'J']);



function ponerBonitasLasLetras(array) {
   	
    	for(indice in array){
    		if (array[indice]=="a"||array[indice]=="e"||array[indice]=="i"||array[indice]=="o"||array[indice]=="u"){
    			array[indice]=array[indice].toUpperCase();
      		}else if(typeof(array[indice])=="string"){
      			array[indice]=array[indice].toLowerCase();
      		}
    	}var arregloResultado= console.log(array);
    	return arregloResultado;
}
ponerBonitasLasLetras([1,5,7,'a','J',"p",'e']);



function ponerBonitosLosNumeros(array) {

    var conversionAString="";
    temp=0;
   	for(indice in array){ 	
		if (typeof(array[indice])=="number"){
			conversionAString=array[indice].toString();
			var temp="";
							
			while(conversionAString.length>=2){
				var suma=0;
				for(var i=0;i<conversionAString.length;i++){
					temp=conversionAString[i];
					tempNumero=parseInt(temp);
					suma=tempNumero+suma; 					
				}

				array[indice] =suma;
				conversionAString=array[indice].toString();
			}
      	}
	}return (console.log(array));
}
ponerBonitosLosNumeros([9956,793,7]);



function arrayToString(array) {
  
    var arregloString="";
    arregloString=array.toString();

    arregloString=arregloString.replace(/,/g,"");
    return console.log(arregloString);
}
arrayToString([1, 4, 5, 5, 'A', 'b', 'E', 'j'])






