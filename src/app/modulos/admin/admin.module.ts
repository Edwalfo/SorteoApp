import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';
import { FooterAdminComponent } from './footer-admin/footer-admin.component';
import { AdminComponent } from './admin.component';
import { ListarSalasComponent } from './adminMenu/listar-salas/listar-salas.component';
import { CrearSalaComponent } from './adminMenu/crear-sala/crear-sala.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    NavbarAdminComponent,
    SidebarAdminComponent,
    FooterAdminComponent,
    ListarSalasComponent,
    CrearSalaComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
