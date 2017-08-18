class MainController {
    constructor() {
        this._pubsub = new PubSub();
        this._telefono = new Telefono(1, this._pubsub);
        this._telefono = new Telefono(2, this._pubsub);
        this._telefono = new Telefono(3, this._pubsub);
        this._telefono = new Telefono(4, this._pubsub);
    }
}

class Telefono {
    constructor(id, pubsub) {
        this._id = id;
        this._pubsub = pubsub;
        this.suscribirse();

    }

    suscribirse() {

        //SE SUSCRIBE
        // let textArea =document.querySelector("#iphone1").textarea;

        this._pubsub.sub("TODOS", (objeto) => this.recibirMensaje(objeto));
        this._pubsub.sub(this._id, (objeto) => this.recibirMensaje(objeto));

    }

    recibirMensaje(objeto) {

        let esPropio = objeto.origen == this._id;
        this.pintarMensaje(mensaje, esPropio, origen);
         publicarMensaje();

    }

    publicarMensaje() {
        
        pubsub.pub("TODOS", { mensaje: "hola", origen: "Fran"});
        pubSub.pub("TODOS", objeto);
    }

    pintarMensaje(mensaje, esPropio, origen) {

    }

}

class Mensaje {

    constructor() {}

}

pintarMensaje = function(idIphone, mensaje, esPropio, nombreUsuario) {
    var selector = "#" + idIphone + " " + ".messages";
    var misMensajes = document.querySelector(selector);

    var elementMessage = document.createElement("div");

    if (esPropio) {
        elementMessage.className = "message messageOwn";
    } else {
        elementMessage.className = "message";

        // Como no es propio, ponemos nombre de usuario
        var elementUserName = document.createElement("div");
        elementUserName.className = "message__username";
        elementUserName.innerHTML = nombreUsuario;

        // Coloco el nombre de usuario dentro del mensaje
        elementMessage.insertBefore(elementUserName, null);
    }

    var elementText = document.createElement("div");
    elementText.className = "message__text";
    elementText.innerHTML = mensaje;

    // Coloco el nombre de usuario dentro del mensaje
    elementMessage.insertBefore(elementText, null);

    // Inserto el mensaje
    misMensajes.insertBefore(elementMessage, null);
}

getMensaje = function(idIphone) {
    // COJO EL TEXTO Y LO LIMPIO
    var selector = "#" + idIphone + " " + "textarea";
    var miTextarea = document.querySelector(selector);
    var mensaje = miTextarea.value;
    miTextarea.value = "";

    // COJO EL DESTINATARIO
    var selector2 = "#" + idIphone + " " + "select";
    var miSelect = document.querySelector(selector2);
    var destinatario = miSelect.options[miSelect.selectedIndex].value;

    // DEVUELVO UN OBJETO CON LA INFO
    var objeto = {
        mensaje: mensaje,
        destinatario: destinatario
    };

    return objeto;
}

window.onload = () => {
    let mc = new MainController();


    //mc.init();
}

// FUNCIONES ENTREGADAS
// NO TOCAR