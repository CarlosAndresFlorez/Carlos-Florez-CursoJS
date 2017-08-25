class UserController {

    constructor(usuariosApiClient) {
        this._usuariosApi = usuariosApiClient;
        this._usuario = null;
    }

    buscarUsuario(id){
    	return this._usuariosApi.getUsuarioById(id);
    }

    validarUsuarioYContraseña(username, contraseña) {
        let usuario = new Usuario(null, null, username, null, contraseña);

        let promise = this._usuariosApi.login(usuario).then((data) => {
        	this._usuario = data;
        	return this._usuario;
        });

        return promise;
    }

    crearUsuario(nombre, apellidos, username, mail, password) {

        let usuario = new Usuario(nombre, apellidos, username, mail, password);

        this._usuariosApi.createUsuario(usuario);

    }

    guardarSesion(data) {

          let objectUsuario={
          	"id":data._identificador,
            "nombre":data._nombre,
            "username":data._username,
            "apellidos":data._apellidos,
            "email":data._email
           
        }
       		
         let objString=JSON.stringify(objectUsuario);       
		 localStorage.setItem("usuario", objString);
    }

     editarUsuario(usuario,pass){

    	let promise=this._usuariosApi.editarUsuario(usuario,pass).then((data)=>{
    		this._usuario = data;
    		return data;
    	});

    	return promise;
    }

    borrarUsuario(usuario,pass){

    	let promise=this._usuariosApi.deleteUsuario(usuario,pass).then((data)=>{
    		this._usuario = data;
    		return data;
    	});

    	return promise;
    }
    

    borrarLocalStorage() {

       let id= localStorage.setItem("usuario", null);
       

     }

    estaLogado() {

        if (localStorage.getItem("usuario") == "null") {

            return false;

        }else {return true};

    }

}