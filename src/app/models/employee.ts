export class Employee{
    constructor(
        public id: number,
        public usuarioId: number,
        public usuario: object,
        public sueldo: number,
        public tipoEmpleado: string,
        public horaInicio: string,
        public horaFin: string,
        public servicio: object
    ){}
}