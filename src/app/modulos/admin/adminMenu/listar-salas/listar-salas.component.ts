import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Sala } from 'src/app/models/sala.model';
import { SalaService } from 'src/app/services/sala.service';

@Component({
  selector: 'app-listar-salas',
  templateUrl: './listar-salas.component.html',
  styleUrls: ['./listar-salas.component.css']
})
export class ListarSalasComponent implements OnInit {
  salas: Sala[] = [];

  constructor(
    private _salaService: SalaService, 
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getSalas();
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

    })
  };


  eliminarSala(id: string) {
    this._salaService.eliminarSalas(id).then(() => {
      this.toastr.error('La sala fue eliminada con exito', 'Sala Eliminada', { positionClass: 'toast-top-right' });


    }).catch(error => {
      console.log(error);

    })



  }

}
