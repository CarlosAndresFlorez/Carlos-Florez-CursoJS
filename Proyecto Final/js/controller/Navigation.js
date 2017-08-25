class NavigationController {

    constructor(container) {

        this._paginas = [];
        this._container = container;

    }

    addPagina(pagina) {
        this._paginas.push(pagina);
    }

    irPagina(url) {

        for (let indice in this._paginas) {
            let pagina = this._paginas[indice];

            if (pagina._url == url) {
               
                if (pagina._url == "#login") {
                    pagina.validarUsuarioActivo();
                }
                pagina.pintar(this._container);
                window.history.pushState(null, "Nuevo  título", url);
                
            }
        }
    }
}

// getEnlacesMenu() {

// 	let enl

// 	return this._paginas;

// 	}