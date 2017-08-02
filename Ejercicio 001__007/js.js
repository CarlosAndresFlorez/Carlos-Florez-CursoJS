function buscarPareja(array) {

    for(var cont1=0;cont1<=array.length;cont1++) {
        var cont = cont1;
        for (cont; cont <= array.length; cont++) {
            var numero=array[cont1];
            if (array[cont] == -numero) {
                var posicionesParejas = console.log( cont1 + "," + cont);
                
            }
        }
    }return posicionesParejas;
}
buscarPareja([2, -5, 10, 5, 4, -10, 0, -5]);