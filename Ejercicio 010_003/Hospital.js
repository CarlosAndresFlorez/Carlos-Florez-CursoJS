class Hospital {

    constructor(nombre, ubicacion) {

        this._nombre = nombre;
        this._ubicacion = ubicacion;
        this._areas = [];

    }
    trasladarPaciente(paciente) {

    }

    darDeAltaPaciente(paciente) {

    }

    getNumeroPacientes(paciente) {

    }

    getCapacidad() {

    }

    recibirPaciente(paciente) {

        for (indice in this._areas) {
            let area = this._areas[indice];
            if (area._especialidad == "Urgencias") {
                this._area._pacientes.push(paciente);
            }
        }
    }

    crearArea() {

        this._especialidad = generarEspecialidad();
        this._medicos = [];
        this._pacientes = [];
        this._capacidad = generarNumeroAleatorio(25, 50);

        new Area(this._especialidad, this._capacidad);

    }

    insertarArea() {




    }

}

class Area {

    constructor(especialidad, capacidad) {
        this._especialidad especialidad;
        this._medicos = [];
        this._pacientes = [];
        this._capacidad = capacidad;

    }

    retirarPaciente(paciente) {

    }

    buscarPaciente(paciente) {

    }

    asignarPaciente(paciente) {

    }

    insertarPaciente(paciente) {

    }
}

class FabricaPersonas {

    constructor() {
        this._ultimoId = 0;

    }

    crearMedico() {

        this._ultimoId + 1;
        this._nombre = Utilidades.generarNombreAleatorio();
        this._dni = Utilidades.generarNumeroAleatorio(2000, 10000);
        this._sexo = Utilidades.generarSexoAleatorio();
        this._fechaNacimineto = Utilidades.generarFechaNacimiento();
        this._externo = Utilidades.generarNumeroAleatorio(1, 0);
        this._turno = Utilidades.generarTurnoAleatorio();
        this._especialidad = Utilidades.generarEspecialidad();

        new Medico(this._ultimoId, this._nombre, this._dni, this._sexo, this._fechaNacimineto, this._externo, this._turno, this._especialidad);

    }

    crearPaciente() {

        this._ultimoId + 1;
        this._nombre = Utilidades.generarNombreAleatorio();
        this._dni = Utilidades.generarNumeroAleatorio(2000, 10000);
        this._sexo = Utilidades.generarSexoAleatorio();
        this._fechaNacimineto = Utilidades.generarFechaNacimiento();
        this._peso = Utilidades.generarNumeroAleatorio(0, 150);
        this._altura = Utilidades.generarNumeroAleatorio(35, 120);
        new Paciente(this._ultimoId, this._nombre, this._dni, this._sexo, this._fechaNacimineto, this._peso, this._altura);
    }
}

class Persona {

    constructor(id, nombre, dni, sexo, fechaNacimiento) {

        this._id = id;
        this._nombre = nombre;
        this._dni = dni;
        this._sexo = sexo;
        this.fechaNacimiento = fechaNacimiento;
    }
}

class Empleado extends Persona {

    constructor(id, nombre, dni, sexo, fechaNacimiento, externo, turno) {
        super(id, nombre, dni, sexo, fechaNacimiento);
        this._externo = externo;
        this._turno = turno;
    }
}

class Medico extends Empleado {

    constructor(id, nombre, dni, sexo, fechaNacimiento, externo, turno, especialidad) {
        super(id, nombre, dni, sexo, fechaNacimiento, externo, turno);
        this._especialidad = especialidad;
    }
}

class Paciente extends Persona {

    constructor(id, nombre, dni, sexo, fechaNacimiento, peso, altura, idMedico) {
        super(id, nombre, dni, sexo, fechaNacimiento);
        this._peso = peso;
        this._altura = altura;
        this._idMedico = null;
    }
}

class HistorialClinico {

    constructor(paciente, registros) {
        this.paciente = paciente;
        this.registros = registros;
    }

    crearRegistroMedico(medico, anotacion) {

    }
}

class ArchivoHistoriales {
    constructor() {
        historiales = [];

    }

    crearHistorial(paciente) {

    }

    getHistorial(paciente) {

    }

}

class Utilidades {

    constructor() {}

    static generarNombreAleatorio() {
        let nombresJugadores = ["Carlos", "Daniel", "Fabian", "Juan Carlos", "Bryan", "Saul", "Christian", "Marcel", "Ronal", "David", "Fran", "James", "Messi", "Cristiano", "Pepe"];
        let indice = this.generarNumeroAleatorio(0, nombresJugadores.length - 1);

        return nombresJugadores[indice];
    }

    static generarNumeroAleatorio(minimo, maximo) {
        let anchoFranjaNumerica = (maximo - minimo) + 1;
        let numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

        return numero;
    }

    static generarSexoAleatorio() {
        let sexo = ["Masculino", "Femenino"];
        let indice = this.generarNumeroAleatorio(0, 1);

        return sexo[indice];
    }

    static generarFechaNacimiento() {

        let anio = this.generarNumeroAleatorio(1900, 2017);
        let mes = this.generarNumeroAleatorio(0, 11);
        let dia = this.generarNumeroAleatorio(0, 30);
        let fechaNacimiento = new Date(anio, mes, dia);

        return fechaNacimiento;
    }

    static generarFechaNacimiento() {

        let anio = this.generarNumeroAleatorio(1900, 2017);
        let mes = this.generarNumeroAleatorio(0, 11);
        let dia = this.generarNumeroAleatorio(0, 30);
        let fechaNacimiento = new Date(anio, mes, dia);

        return fechaNacimiento;
    }

    static generarTurnoAleatorio() {

        let turnos = ["mañana", "tarde", "noche"];
        let indice = this.generarNumeroAleatorio(0, turnos.length - 1);
        let turno = turnos[indice];

        return turno;
    }

    static generarEspecialidad() {

        let especialidades = ["Ugencias", "Trauma", "UCI", "Reuma", "Rehab"];
        let indice = this.generarNumeroAleatorio(0, especialidades.length - 1);
        let especialidad = especialidades[indice];

        return especialidad;
    }

}

fabrica = new FabricaPersonas();
fabrica.crearMedico();
pacientefabrica.crearPaciente();