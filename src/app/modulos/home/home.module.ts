import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NavbarHomeComponent } from './navbar-home/navbar-home.component';
import { FooterHomeComponent } from './footer-home/footer-home.component';
import { HeaderHomeComponent } from './header-home/header-home.component';
import { HomeComponent } from './home.component';
import { CardSalasComponent } from './card-salas/card-salas.component';
import { LoginComponent } from './homeMenu/login/login.component';
import { RegistrarComponent } from './homeMenu/registrar/registrar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResultadosComponent } from './homeMenu/resultados/resultados.component';
import { PerfilComponent } from './homeMenu/perfil/perfil.component';
import { SalaComponent } from './homeMenu/sala/sala.component';


@NgModule({
  declarations: [


    NavbarHomeComponent,
    HomeComponent,
    FooterHomeComponent,
    HeaderHomeComponent,
    CardSalasComponent,
    LoginComponent,
    RegistrarComponent,
    ResultadosComponent,
    PerfilComponent,
    SalaComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
