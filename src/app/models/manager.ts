export class Manager {
    constructor(
        public id: number,
        public usuarioId: number,
        public usuario: string | null,
        public fechaContrato: Date
    ) {}

}