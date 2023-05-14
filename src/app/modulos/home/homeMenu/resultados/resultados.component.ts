import { Component, OnInit } from '@angular/core';
import { Participante } from 'src/app/models/participante.model';
import { ParticipanteService } from 'src/app/services/participante.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  participantes: Participante[] = [];

  constructor(
    private _participanteServive: ParticipanteService,
  ) { }

  ngOnInit(): void {
    this.getParticipantes()
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

      this.participantes = this.participantes.filter(p => p.isGanador == true);

    })


  }


}
