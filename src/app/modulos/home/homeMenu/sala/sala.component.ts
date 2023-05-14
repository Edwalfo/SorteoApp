import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Modal } from 'bootstrap';
import { timer } from 'rxjs';
import { Participante } from 'src/app/models/participante.model';
import { Sala } from 'src/app/models/sala.model';
import { Usuario } from 'src/app/models/usuario.model';
import { ParticipanteService } from 'src/app/services/participante.service';
import { SalaService } from 'src/app/services/sala.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {

  participantes: Participante[] = [];
  usuarios: Usuario[] = [];
  salas: Sala[] = [];
  id: any;
  ganador: any;
  Nganador: any;


  nombreSala: any;
  horafechaSala: any;
  estadoSala: any;
  premio: any;
  costo: any;
  hora: any;
  fecha: any;


  _second = 1000;
  _minute = this._second * 60;
  _hour = this._minute * 60;
  _day = this._hour * 24;
  end: any;
  now: any;
  day: any = 0;
  hours: any = 0;
  minutes: any = 0;
  seconds: any = 0;
  source = timer(0, 1000);
  clock: any;

  constructor(
    private _participanteServive: ParticipanteService,
    private _usuarioService: UsuarioService,
    private _salaService: SalaService,
    private aRoute: ActivatedRoute,

  ) {
    this.clock = this.source.subscribe(t => {
      this.now = new Date();
      this.end = new Date(this.horafechaSala);



      this.showDate();
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getParticipantes();
    this.getUsuarios();
    this.getSala();

  }

  showDate() {

    let distance = this.end - this.now;

    if (this.estadoSala == true) {
      if (distance <= 0) {
       
        this.obtenerGanador();
        this.actualizarSala();
        this.actualizarParticipante();
        
        this.day = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.clock.unsubscribe();

      } else {
        this.day = Math.floor(distance / this._day);
        this.hours = Math.floor((distance % this._day) / this._hour);
        this.minutes = Math.floor((distance % this._hour) / this._minute);
        this.seconds = Math.floor((distance % this._minute) / this._second);

      }

    }





  }


  getParticipantes() {
    this._participanteServive.getParticipanteIdSala<Participante>().subscribe(data => {
      this.participantes = []
      data.forEach((element: any) => {
        this.participantes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()

        })

      });

      this.participantes = this.participantes.filter(p => p.idSala == this.id);



    })


  }

  getUsuarios() {
    this._usuarioService.getUsuarios<Usuario>().subscribe(data => {
      this.usuarios = [];
      data.forEach((element: any) => {
        this.usuarios.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()

        })

      });

      this.usuarios = this.usuarios.filter(u => u.isAdmin == false)


    })


  }

  getSala() {
    this._salaService.getSala<Sala>(this.id).subscribe(data => {
      let datos = data.payload.data();

      this.nombreSala = datos.salaNombre
      this.estadoSala = datos.estado;
      this.horafechaSala = datos.fecha + ' ' + datos.hora;
      this.premio = datos.premio;
      this.costo = datos.costo;
      this.fecha = datos.fecha;
      this.hora = datos.hora;


    })


  }

  abrirModal() {

    const element = document.getElementById('modalId') as HTMLElement;
    const myModal = new Modal(element);
    myModal.show();


  }

  obtenerGanador() {


    if (this.participantes.length > 0) {
      this.ganador = this.participantes[Math.floor(Math.random() * this.participantes.length)];
      this.Nganador = this.ganador.numero;
      this.abrirModal();

    }

  }


  actualizarParticipante() {
    const participante: Participante = {
      numero: this.ganador.numero,
      isGanador: true,
      idSala: this.id,
      uid: this.ganador.uid,
      fechaActualizacion: new Date(),
    }



    this._participanteServive.actualizarParticipantes(this.ganador.id, participante).then(() => {

    }).catch(error => {
      console.log(error);

    })

  }

  actualizarSala() {

    const Sala: Sala = {

      salaNombre: this.nombreSala,
      costo: this.costo,
      fecha: this.fecha,
      hora: this.hora,
      estado: false,
      premio: this.premio,
      fechaActualizacion: new Date(),
    }

    this._salaService.actualizarSalas(this.id, Sala).then(() => {


    }).catch(error => {
      console.log(error);

    })



  }


}
