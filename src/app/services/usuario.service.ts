import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private firestore: AngularFirestore) { }

  registrarUsuario(usuario: Usuario, id: string) {

    return this.firestore.collection('usuarios').doc(id).set(usuario);

  }

  getUsuario<Usuario>(id:string):Observable<any>{
    return this.firestore.collection('usuarios').doc<Usuario>(id).valueChanges();
  }

  getUsuarios<Usuario>():Observable<any>{
    return this.firestore.collection<Usuario>('usuarios',ref=>ref.orderBy('fechaCreacion')).snapshotChanges();
  }
}
