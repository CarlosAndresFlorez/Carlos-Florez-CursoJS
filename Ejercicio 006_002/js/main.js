// CONTROLADOR PRINCIPAL

class MainController {
    constructor() {
        this._container = null;

        //APLICAR PATRON SINGLETON
        this._apiClient = new ApiClient();
        //instancias clientes

        this._divAlmacenUsuarios = null;
        this._almacenUsuarios = new AlmacenUsuarios(this);
        this._usuariosApiClient = new UsuariosApiClient(this._apiClient);
        // fin instancias clientes

        //instancias posts
        this._divAlmacenPosts = null;
        this._almacenPosts = new AlmacenPosts(this);
        this._postsApiClient = new PostsApiClient(this._apiClient);
        // fin instancias post

        //instancias comentarios
        this._divAlmacenComentarios = null;
        this._almacenComentarios = new AlmacenComentarios(this);
        this._comentariosApiClient = new ComentariosApiClient(this._apiClient);
        // fin instancias comentarios

        //instancias albumes

        this._divAlmacenAlbumes = null;
        this._almacenAlbumes = new AlmacenAlbumes(this);
        this._albumesApiClient = new AlbumesApiClient(this._apiClient);
        //fin instacias albumes

        //APLICAR PATRON SINGLETON

    }
    //METODO CUANDO CLIQUEAN UN USUARIO
    abrirPosts(user) {
        this._almacenPosts.getAllPostsAndPaint(user);
        this._almacenAlbumes.getAllAlbumesAndPaint(user);

    }

    //

    //METODO CUANDO CLIQUEAN UN POST
    abrirComentarios(post) {
        this._almacenComentarios.getAllCommentsAndPaint(post);
    }
    //

    init() {

        this.pintarEstructuraGeneral();
        this._almacenUsuarios.init(this._divAlmacenUsuarios, this._usuariosApiClient);
        this._almacenPosts.init(this._divAlmacenPosts, this._postsApiClient);
        this._almacenComentarios.init(this._divAlmacenComentarios, this._comentariosApiClient);
        this._almacenAlbumes.init(this._divAlmacenAlbumes, this._albumesApiClient);

    }

    getAllUsuariosAndPaint() {
        this._usuariosApiClient.getUsuarios().then((data) => {
            this.paintAllUsuarios(data);
        });
    }

    pintarEstructuraGeneral() {

        this._container = document.createElement("div");
        this._container.className = "container";
        document.body.appendChild(this._container);

        this._divAlmacenUsuarios = document.createElement("div");
        this._divAlmacenUsuarios.className = "almacen-Usuarios";
        this._container.appendChild(this._divAlmacenUsuarios);

        this._divAlmacenPosts = document.createElement("div");
        this._divAlmacenPosts.className = "almacen-Posts";
        this._container.appendChild(this._divAlmacenPosts);

        this._divAlmacenComentarios = document.createElement("div");
        this._divAlmacenComentarios.className = "almacen-Comentarios";
        this._container.appendChild(this._divAlmacenComentarios);

        this._divAlmacenAlbumes = document.createElement("div");
        this._divAlmacenAlbumes.className = "almacen-Albumes";
        this._container.appendChild(this._divAlmacenAlbumes);

    }
}

// FIN CONTROLADOR PRINCIPAL

//USUARIO

class Usuario {
    constructor(identificador, nombre, alias, email) {
        this._identificador = identificador;
        this._nombre = nombre;
        this._alias = alias;
        this._email = email;
    }
}

// FIN USUARIO

// ALMACEN DE USUARIOS
class AlmacenUsuarios {

    constructor(mc) {
        this._usuarios = [];
        this._contenedorHtml = null;
        this._usuariosApiClient = null;
        this._mainControler = mc;
    }

    init(contenedorHtml, usuariosApiClient) {

        this._contenedorHtml = contenedorHtml;
        this._usuariosApiClient = usuariosApiClient;
        this.pintarEstructuraUsuarios();
        this.getAllUsuariosAndPaint();
    }

    getAllUsuariosAndPaint() {
        this._usuariosApiClient.getAllUsuarios().then((data) => {
            this.paintAllUsuarios(data);

        });
    }

    paintAllUsuarios(data) {

        let tbody = this._contenedorHtml.querySelector("tbody");
        tbody.innerHTML = "";

        for (let i = 0; i < data.length; i++) {
            let usuario = data[i];
            let row = this.getRowForUsuario(usuario);
            tbody.appendChild(row);
        }
    }

    pintarEstructuraUsuarios() {

        let estructura = `    
                    <h1 class="main-title">USUARIOS</h1>

                    <form class="form-inline">

                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Alias</th>
                                    <th>E-mail</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>`

        this._contenedorHtml.innerHTML = estructura;

    }

    getRowForUsuario(usuario) {

        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.setAttribute("class", "hand");
        td1.innerHTML = usuario._identificador;
        tr.appendChild(td1);

        let td2 = document.createElement("td");
        td2.innerHTML = usuario._nombre;
        td2.setAttribute("class", "hand");
        tr.appendChild(td2);

        let td3 = document.createElement("td");
        td3.setAttribute("class", "hand");
        td3.innerHTML = usuario._alias;
        tr.appendChild(td3);

        let td4 = document.createElement("td");
        td4.setAttribute("class", "hand");
        td4.innerHTML = usuario._email;
        tr.appendChild(td4);

        let user = usuario;


        let button=document.createElement("button");
        button.setAttribute("type", "button");

        tr.appendChild(button);

        button.addEventListener("click", () => {
            this._mainControler.abrirPosts(user)
        });

        return tr;
    }
}

// FIN ALMACEN DE USUARIOS

//POST

class Post {
    constructor(idUsuario, idPost, titulo, contenido) {
        this._idUsuario = idUsuario;
        this._idPost = idPost;
        this._titulo = titulo;
        this._contenido = contenido;
    }
}

// ALMACEN DE POSTS
class AlmacenPosts {

    constructor(mc) {
        this._posts = [];
        this._contenedorHtml = null;
        this._postsApiClient = null;
        this._mainControler = mc;
    }

    init(contenedorHtml, postsApiClient) {

        this._contenedorHtml = contenedorHtml;
        this._postsApiClient = postsApiClient;
        this.pintarEstructuraPosts();

    }

    getAllPostsAndPaint(usuario) {
        this._postsApiClient.getAllPosts(usuario).then((data) => {
            this.paintAllPosts(data);
        });
    }

    paintAllPosts(data) {
        console.log(data);
        let tbody = this._contenedorHtml.querySelector("tbody");

        tbody.innerHTML = "";

        for (let i = 0; i < data.length; i++) {
            let post = data[i];
            let row = this.getRowForPost(post);
            tbody.appendChild(row);
        }
    }

    pintarEstructuraPosts() {

        let estructura = `    
                    <h1 class="main-title">POSTS</h1>

                    <form class="form-inline">

                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>ID USUARIO</th>
                                    <th>ID POST</th>
                                    <th>Titulo</th>
                                    <th>Contenido</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>`

        this._contenedorHtml.innerHTML = estructura;

    }

    getRowForPost(post) {

        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.setAttribute("class", "hand");
        td1.innerHTML = post._idUsuario;
        tr.appendChild(td1);

        let td2 = document.createElement("td");
        td2.innerHTML = post._idPost;
        td2.setAttribute("class", "hand");
        tr.appendChild(td2);

        let td3 = document.createElement("td");
        td3.setAttribute("class", "hand");
        td3.innerHTML = post._titulo;
        tr.appendChild(td3);

        let td4 = document.createElement("td");
        td4.setAttribute("class", "hand");
        td4.innerHTML = post._contenido;
        tr.appendChild(td4);

        tr.addEventListener("click", () => {
            this._mainControler.abrirComentarios(post);

        });

        return tr;
    }
}

// FIN ALMACEN DE POSTS

// FIN POST

// CLASE COMENTARIO

class Comentario {
    constructor(idPost, idComentario, nombre, email, contenido) {
        this._idPost = idPost;
        this._idComentario = idComentario;
        this._nombre = nombre;
        this._email = email;
        this._contenido = contenido
    }

}

// ALMACEN DE COMENTARIOS
class AlmacenComentarios {

    constructor() {
        this._posts = [];
        this._contenedorHtml = null;
        this._postsApiClient = null;
    }

    init(contenedorHtml, comentariosApiClient) {

        this._contenedorHtml = contenedorHtml;
        this._comentariosApiClient = comentariosApiClient;
        this.pintarEstructuraComentarios();

    }

    getAllCommentsAndPaint(post) {
        this._comentariosApiClient.getAllComentarios(post).then((data) => {
            this.paintAllComentarios(data);
        });
    }

    paintAllComentarios(data) {
        console.log(data);
        let tbody = this._contenedorHtml.querySelector("tbody");
        tbody.innerHTML = "";

        for (let i = 0; i < data.length; i++) {
            let post = data[i];
            let row = this.getRowForComentarios(post);
            tbody.appendChild(row);
        }
    }

    pintarEstructuraComentarios() {

        let estructura = `    
                    <h1 class="main-title">COMENTARIOS</h1>

                    <form class="form-inline">

                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>ID POST</th>
                                    <th>ID COMENTARIO</th>
                                    <th>NOMBRE</th>
                                    <th>E-MAIL</th>
                                    <th>CONTENIDO</th>

                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>`

        this._contenedorHtml.innerHTML = estructura;

    }

    getRowForComentarios(comentario) {

        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.setAttribute("class", "hand");
        td1.innerHTML = comentario._idPost;
        tr.appendChild(td1);

        let td2 = document.createElement("td");
        td2.innerHTML = comentario._idComentario;
        td2.setAttribute("class", "hand");
        tr.appendChild(td2);

        let td3 = document.createElement("td");
        td3.setAttribute("class", "hand");
        td3.innerHTML = comentario._nombre;
        tr.appendChild(td3);

        let td4 = document.createElement("td");
        td4.setAttribute("class", "hand");
        td4.innerHTML = comentario._email;
        tr.appendChild(td4);

        let td5 = document.createElement("td");
        td5.setAttribute("class", "hand");
        td5.innerHTML = comentario._contenido;
        tr.appendChild(td5);

        return tr;
    }
}

// FIN ALMACEN DE POSTS

//ALBUM

class Album {
    constructor(idAlbum, url) {
        this._idAlbum = idAlbum;
        this._url = url;
    }
}

// ALMACEN DE ALBUMES
class AlmacenAlbumes {

    constructor(mc) {
        this._albumes = [];
        this._contenedorHtml = null;
        this._albumesApiClient = null;
        this._mainControler = mc;
    }

    init(contenedorHtml, albumesApiClient) {

        this._contenedorHtml = contenedorHtml;
        this._albumesApiClient = albumesApiClient;
        this.pintarEstructuraAlbumes();

    }

    getAllAlbumesAndPaint(usuario) {
        this._albumesApiClient.getAllAlbumes(usuario).then((data) => {
            this.paintAllAlbumes(data);
        });
    }

    paintAllAlbumes(data) {
        console.log(data);
        let tbody = this._contenedorHtml.querySelector("tbody");

        tbody.innerHTML = "";

        for (let i = 0; i < data.length; i++) {
            let album = data[i];
            let row = this.getRowForAlbum(album);
            tbody.appendChild(row);
        }
    }

    pintarEstructuraAlbumes() {

        let estructura = `    
                    <h1 class="main-title">FOTOS</h1>

                    <form class="form-inline">

                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>ID ALBUM</th>
                                    <th>URL</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>`

        this._contenedorHtml.innerHTML = estructura;

    }

    getRowForAlbum(album) {

        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.setAttribute("class", "hand");
        td1.innerHTML = album._idAlbum;
        tr.appendChild(td1);

        // let td2 = document.createElement("td");
        // td2.innerHTML = album._url;
        // td2.setAttribute("class", "hand");



        var imagen = document.createElement("img");
        imagen.setAttribute("src", album._url);
        
        tr.appendChild(imagen);

        // tr.appendChild(td2);

        return tr;
    }
}

// FIN ALMACEN DE ALBUMES

window.onload = () => {
    let mc = new MainController();
    mc.init();
}