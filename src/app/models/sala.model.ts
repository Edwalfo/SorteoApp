import { Time } from "@angular/common";

export class Sala {
    id?: any;
    salaNombre: string;
    costo: number;
    fecha: Date;
    hora: Time;
    premio: number;
    estado?: boolean;
    fechaCreacion?: Date;
    fechaActualizacion?: Date;

    constructor(salaNombre: string, costo: number, fecha: Date, hora: Time, premio: number) {
        this.salaNombre = salaNombre;
        this.costo = costo;
        this.fecha = fecha;
        this.hora = hora;
        this.premio = premio;
    
    }

}