
export class Participante {
    id?: any;
    numero: number;
    isGanador: boolean;
    idSala: string;
    uid: string;
    fechaCreacion?: Date;
    fechaActualizacion?: Date;
    

    constructor(numero: number, isGanador: boolean, salaid: string, uid: string) {
        this.numero = numero;
        this.isGanador = isGanador;
        this.idSala = salaid;
        this.uid = uid;

    }

}