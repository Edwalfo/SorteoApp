import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {


  crearUsuario: FormGroup;
  usuario: Usuario[] = [];
  submitted = false;
  loading = false;
  id: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService,
    private _authService: AuthService,
    private _usuarioService: UsuarioService
  ) {
    this.crearUsuario = this.fb.group({
      nombre: ['', Validators.required],
      cedula: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmarPassword: ['', Validators.required]

    })

    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {


  }

  agregarEdictarUsuario() {

    this.submitted = true;

    if (this.crearUsuario.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregarUsuario();
    } else {

    }

  }

  agregarUsuario() {

    const pass = this.crearUsuario.value.password;
    const repetirpass = this.crearUsuario.value.confirmarPassword;

    if (pass !== repetirpass) {
      this.toastr.error('Las contraseña ingresadas deben ser iguales', 'Error');
      return;

    }

    const usuario: Usuario = {
      nombre: this.crearUsuario.value.nombre,
      cedula: this.crearUsuario.value.cedula,
      telefono: this.crearUsuario.value.telefono,
      correo: this.crearUsuario.value.email,
      password: this.crearUsuario.value.password,
      isAdmin: false,
      uid:'',
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),

    }

    this.loading = true
    this._authService.registrar(usuario)
      .then(res => {

        const id = res.user.uid;
        usuario.uid = id;
        usuario.password = null;

        this._usuarioService.registrarUsuario(usuario, id).then(() => {
          this.toastr.success('Usuario fue creado con exito', 'Registro exitoso', { positionClass: 'toast-top-right' });
          this.router.navigate(['/Login']);

        }).catch(error => console.log(error)
        );
      })
      .catch(error => console.log(error)
      );


  }

}
