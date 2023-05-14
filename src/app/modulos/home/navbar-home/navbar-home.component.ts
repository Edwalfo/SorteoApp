import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar-home',
  templateUrl: './navbar-home.component.html',
  styleUrls: ['./navbar-home.component.css']
})
export class NavbarHomeComponent implements OnInit {
  login: boolean = false;
  rol: any;

  constructor(
    private _authService: AuthService,
    private _usuarioService: UsuarioService,
    private router: Router,) {
    this._authService.statelogin().subscribe(res => {
      if (res) {

        /*         console.log('esta log'); */
        this.login = true;
        this.getUsuario(res.uid);

      } else {
        /*         console.log('no esta log'); */
        this.login = false;

      }

    });

  }

  ngOnInit(): void {


  }



  salir() {
    this._authService.logout()
      .then(() => {
        this.router.navigate(['/']);

      })
      .catch(error => console.log(error)
      );
  }

  getUsuario(uid: string) {

    const id = uid;

    this._usuarioService.getUsuario<Usuario>(id).subscribe(res => {
      this.rol = res.isAdmin;

    });

  }

}
