import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginComponent } from './homeMenu/login/login.component';
import { PerfilComponent } from './homeMenu/perfil/perfil.component';
import { RegistrarComponent } from './homeMenu/registrar/registrar.component';
import { ResultadosComponent } from './homeMenu/resultados/resultados.component';
import { SalaComponent } from './homeMenu/sala/sala.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'Login',component:LoginComponent},
  {path:'Registrar',component:RegistrarComponent},
  {path:'Resultados',component:ResultadosComponent},
  {path:'Perfil',component:PerfilComponent},
  {path:'Sala/:id',component:SalaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
