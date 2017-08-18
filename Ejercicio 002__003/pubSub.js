class PubSub {
    constructor() {
        this._suscriptores = {};
    }

    sub(nombreEvento, funcionCallbackSuscriptor) {
        //Si no existe el canal, seteo un array vacio
        if (!this._suscriptores[nombreEvento]) {
            this._suscriptores[nombreEvento] = [];
        }

        // añado el suscriptor al canal
        this._suscriptores[nombreEvento].push(funcionCallbackSuscriptor);
    }

    pub(nombreEvento, data) {
        // Si el evento existe, recorremos el array con los callbacks
        // De los suscriptores, y lo ejecutamos pasándole el data
        if (this._suscriptores[nombreEvento]) {
            let funcionesCallBackSuscriptores = this._suscriptores[nombreEvento];

            for(let i=0; i<funcionesCallBackSuscriptores.length; i++){
                let funcionCallbackSuscriptor = funcionesCallBackSuscriptores[i];
                funcionCallbackSuscriptor(data);
            }
        }
    }
}