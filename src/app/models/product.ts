export class Product{
    constructor(
        public id: number,
        public nombre: string,
        public precio: number, 
        public cantUso: number, 
        public descripcion: string,
        public requiere: string | null
    ){}
}