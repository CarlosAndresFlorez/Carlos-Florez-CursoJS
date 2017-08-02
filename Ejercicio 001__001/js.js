	
	//EJERCICIO 1 y 2 
	var letra_dni = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];


	function dni(cedula) {
	    var conversion = cedula.toString();	  
	    if (conversion.length == 8 && typeof(cedula) == "number" && cedula > 0) {
	        
	            var res = cedula % 23;
	            var resultado = console.log("DNI: " + cedula + "" + letra_dni[res]);
	            return resultado;
	    }else if (cedula < 0) {
	    	var errorNegativos= "Debes introducir un valor positivo.";
	    	console.log (errorNegativos)
	       ;
	    
	    } else if (typeof(cedula) != "number") {
	    	var errorString= "Debes introducir un valor numérico.";
	        console.log(errorString);
	    }  else {
	    	var errorNumeroCifras= "Debes introducir un número de 8 cifras.";
	        console.log(errorNumeroCifras);
	    			}
		}

	dni(12312312);