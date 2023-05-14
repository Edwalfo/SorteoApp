import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Sala } from '../models/sala.model';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  constructor(private firestore: AngularFirestore) { }

  agregarSalas(Sala:Sala):Promise<any>{
 
    return this.firestore.collection('salas').add(Sala);
  }

  getSalas<Sala>():Observable<any>{
    return this.firestore.collection<Sala>('salas',ref=>ref.orderBy('fechaCreacion')).snapshotChanges();
  }

  eliminarSalas(id: string):Promise<any>{
    return this.firestore.collection('salas').doc(id).delete();
  }


  actualizarSalas(id: string, sala:Sala){
    
    return this.firestore.collection('salas').doc(id).update(sala);
  }
  
  getSala<Sala>(id:string):Observable<any>{
    return this.firestore.collection('salas').doc<Sala>(id).snapshotChanges();
  }


}
