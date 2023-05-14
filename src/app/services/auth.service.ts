import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { 
    
  }

  registrar(user: Usuario) {

    return createUserWithEmailAndPassword(this.auth, user.correo, user.password);

  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);

  }

  logout(){
    return signOut(this.auth);
  }

  statelogin():Observable<any>{

    return authState(this.auth);

   
  
  }
    

}
