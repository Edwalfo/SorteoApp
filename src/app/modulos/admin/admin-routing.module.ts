import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CrearSalaComponent } from './adminMenu/crear-sala/crear-sala.component';
import { ListarSalasComponent } from './adminMenu/listar-salas/listar-salas.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'listar-salas', component: ListarSalasComponent },
  { path: 'crear-sala', component: CrearSalaComponent },
  { path: 'edictar-sala/:id', component: CrearSalaComponent },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
