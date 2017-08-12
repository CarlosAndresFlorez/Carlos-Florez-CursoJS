function body() {

    var header = document.createElement("header");
    var cuerpo = document.querySelector("body");
    cuerpo.appendChild(header);



    var cabecera = crearElemento("div", cuerpo, "cabecera");

    function crearElemento(tipo, padre, clase, id, src, innerHTML) {

        var elemento = document.createElement(tipo);
        if (clase != null || typeof(clase) != "undefined") {
            elemento.setAttribute("class", clase);
        }

        if (src != null || typeof(src) != null) {
            elemento.setAttribute("src", src);
        }

        padre.appendChild(elemento);
        return elemento;
    }

    function crearInput(elemento){

    	elemento.setAttribute("type", "text");


    }


    var logo = crearElemento("div", cabecera, "logo");
    var imagenLogo = crearElemento("img", logo, null, null, "nvlogo.png");
    var imagen2 = crearElemento("img", cabecera, null, null, "destiny2.jpg");
    var buscar= crearElemento("input",logo);



    /*       
     
 
       
        var buscar = document.createElement("input");
        buscar.setAttribute("type", "text");
 
        buscar.setAttribute("value", "Buscar NVIDIA");
        logo.appendChild(buscar);

        var listaSelec = document.createElement("select");
        listaSelec.setAttribute("name", "region");
        logo.appendChild(listaSelec);

        var regiones = ["America Latina", "Europa", "Asia", "EEUU", "Australia", "Africa"];


        for (var i = 0; i <= regiones.length - 1; i++) {

            var opcion = document.createElement("option");
            opcion.setAttribute("value", i);
            opcion.innerHTML = (regiones[i]);
            listaSelec.appendChild(opcion);
        }


    var banner = document.createElement("div");
        banner.setAttribute("class", "bannerNvidia");
        cabecera.appendChild(bannerNvidia);
    */



}

window.onload = function() {
    body();
}