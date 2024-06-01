export class Service{
    constructor(
        public id: number,
        public fecha: string,
        public tipoServicio: string,
        public precio: number,
        public descripcion: string,
        public cantServicio: number,
        public descDiagnostico: any,
        public prescDiagnostico: any,
        public idEmpleado: any,
        public factura: any,
        public requiere: any,
    ){}
}