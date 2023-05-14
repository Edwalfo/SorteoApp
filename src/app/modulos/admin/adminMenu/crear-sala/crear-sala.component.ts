import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Sala } from 'src/app/models/sala.model';
import { SalaService } from 'src/app/services/sala.service';

@Component({
  selector: 'app-crear-sala',
  templateUrl: './crear-sala.component.html',
  styleUrls: ['./crear-sala.component.css']
})
export class CrearSalaComponent implements OnInit {
  salas: Sala[] = [];
  crearSala: FormGroup;
  submitted = false;
  loading = false;
  titulo: string = 'Crear';
  id: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private _salaService: SalaService,
    private toastr: ToastrService
  ) {
    this.crearSala = this.fb.group({
      salaNombre: ['', Validators.required],
      costo: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      premio: ['', Validators.required]

    })

    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
  this.esEdictar();
    
  }

  agregarEdictarSala() {

    this.submitted = true;

    if (this.crearSala.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregarSala();
    } else {
      this.edictarSala()
    }

  }

  edictarSala() {

    const Sala: Sala = {
      salaNombre: this.crearSala.value.salaNombre,
      costo: this.crearSala.value.costo,
      fecha: this.crearSala.value.fecha,
      hora: this.crearSala.value.hora,
      premio: this.crearSala.value.premio,
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._salaService.actualizarSalas(this.id, Sala).then(() => {
      this.loading = false;
      this.toastr.info('La sala fue actualizada con exito', 'Sala actualizada', { positionClass: 'toast-top-right' });
      this.router.navigate(['admin/listar-salas']);

    }).catch(error => {
      console.log(error);

    })
 


  }

  agregarSala() {
    const Sala: Sala = {
      salaNombre: this.crearSala.value.salaNombre,
      costo: this.crearSala.value.costo,
      fecha: this.crearSala.value.fecha,
      hora: this.crearSala.value.hora,
      premio: this.crearSala.value.premio,
      estado: true,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }

    this.loading = true;
    this._salaService.agregarSalas(Sala).then(() => {
      this.toastr.success('La sala fue crear con exito', 'Sala registrada', { positionClass: 'toast-top-right' });
      this.router.navigate(['admin/listar-salas']);

    }).catch(error => {
      console.log(error);
      
    })

  }

  esEdictar() {

    if (this.id !== null) {
      this.titulo = 'Edictar';
      this._salaService.getSala<Sala>(this.id).subscribe(data => {
        
        this.crearSala.setValue({
          salaNombre: data.payload.data()['salaNombre'],
          costo: data.payload.data()['costo'],
          fecha: data.payload.data()['fecha'],
          hora: data.payload.data()['hora'],
          premio: data.payload.data()['premio'],
          
        })

      })

    }

  }

}
