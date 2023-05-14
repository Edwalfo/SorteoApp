
export class Usuario {
    id?: any;
    nombre: string;
    cedula: number;
    telefono: string;
    correo: string;
    password: any;
    isAdmin: boolean;
    uid: string;
    fechaCreacion?: Date;
    fechaActualizacion?: Date;

    constructor(nombre: string, cedula: number, telefono: string, correo: string, password: any, isAdmin: boolean, uid: string) {
        this.nombre = nombre;
        this.cedula = cedula;
        this.telefono = telefono;
        this.correo = correo;
        this.password = password;
        this.isAdmin = isAdmin;
        this.uid = uid;

    }

}