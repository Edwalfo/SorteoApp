import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Participante } from 'src/app/models/participante.model';
import { Sala } from 'src/app/models/sala.model';
import { AuthService } from 'src/app/services/auth.service';
import { ParticipanteService } from 'src/app/services/participante.service';
import { SalaService } from 'src/app/services/sala.service';

@Component({
  selector: 'app-card-salas',
  templateUrl: './card-salas.component.html',
  styleUrls: ['./card-salas.component.css']
})
export class CardSalasComponent implements OnInit {
  salas: Sala[] = [];
  participantes: Participante[] = [];
  uid: any;
  

  constructor(
    private _salaService: SalaService,
    private _participanteServive: ParticipanteService,
    private _authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getSalas();
    this.getParticipantes();
    this.obtenerUid();

  }


  generarNumero(numeros: number[]) {

    var num = 0;
    var resultado: boolean = false;

    if (numeros.length < 50) {
      do {
        num = Math.floor(Math.random() * 50) + 1;
        resultado = numeros.includes(num);
        console.log(resultado);


      } while (resultado == true);


    }
    console.log(num, 'numero generado');

    return num;


  }


  getSalas() {
    this._salaService.getSalas<Sala>().subscribe(data => {
      this.salas = [];
      data.forEach((element: any) => {
        this.salas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()

        })

      });
      this.salas = this.salas.filter(s => s.estado == true);



    })
  };

  getParticipantes() {
    this._participanteServive.getParticipantes<Participante>().subscribe(data => {
      this.participantes = []
      data.forEach((element: any) => {
        this.participantes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()

        })

      });


    })

  }


  agregarParticipante(id: string) {

    let datos = this.participantes.filter(p => p.idSala == id);
    let numeros = datos.map(p => p.numero)


    if (  datos.length < 50) {
      let num = this.generarNumero(numeros);

      const participante: Participante = {
        numero: num,
        isGanador: false,
        idSala: id,
        uid: this.uid,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),

      }
      this._participanteServive.agregarParticipantes(participante).then(() => {
        this.toastr.success('Se ha registrado en la sala con el numero: '+num, 'Registro exitoso', { positionClass: 'toast-top-right' });
        this.router.navigate(['/Sala/', id]);

      }).catch(error => {
        console.log(error);

      })


    } else {
      
      this.toastr.warning('Esta sala llego al limite de participantes', 'Sala llena', { positionClass: 'toast-top-right' });
    }


  }

  obtenerUid() {
    this._authService.statelogin().subscribe(res => {
      if(res!==null)
      this.uid = res.uid

    })
  }

  contarParticipantes(id: string) {
    let total = this.participantes.filter(p => p.idSala == id);
    return total.length

  }



}
