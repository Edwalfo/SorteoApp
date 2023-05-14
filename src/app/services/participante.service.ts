import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Participante } from '../models/participante.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipanteService {


  constructor(private firestore: AngularFirestore) { }

  agregarParticipantes(participante:Participante):Promise<any>{
 
    return this.firestore.collection('participantes').add(participante);
  }

  getParticipantes<Participante>():Observable<any>{
    return this.firestore.collection<Participante>('participantes',ref=>ref.orderBy('fechaCreacion')).snapshotChanges();
  }

  eliminarParticipantes(id: string):Promise<any>{
    return this.firestore.collection('participantes').doc(id).delete();
  }


  actualizarParticipantes(id: string, participante:Participante){
    
    return this.firestore.collection('participantes').doc(id).update(participante);
  }
  
  getParticipante<Participante>(id:string):Observable<any>{
    return this.firestore.collection('participantes').doc<Participante>(id).snapshotChanges();
  }

  getParticipanteIdSala<Participante>():Observable<any>{
    return this.firestore.collection<Participante>('participantes',ref=>ref.orderBy('numero')).snapshotChanges();
  }
}
