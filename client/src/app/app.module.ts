import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { UsersService } from './services/users/users.service';
import { HttpClientModule } from '@angular/common/http';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { AlumnosService } from './services/alumnos/alumnos.service';
import { AdminService } from './services/admin/admin.service';
import { MaestrosService } from './services/maestros/maestros.service';
import { AlumnosListComponent } from './components/alumnos-list/alumnos-list.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { MaestrosComponent } from './components/maestros/maestros.component';
import { AdminComponent } from './components/admin/admin.component';
import { MaestrosListComponent } from './components/maestros-list/maestros-list.component';
import { HorariosComponent } from './components/horarios/horarios.component';
import { Error404Component } from './components/error404/error404.component';
import { NgChartsModule } from 'ng2-charts';
import { HorariosFormComponent } from './components/horarios-form/horarios-form.component';
import { HorariosService } from './services/horarios/horarios.service';
import { AdminListComponent } from './components/admin-list/admin-list.component';
import { UpdateFormComponent } from './components/update-form/update-form.component';
import { CalificacionesComponent } from './components/calificaciones/calificaciones.component';
import { CalificacionesFormComponent } from './components/calificaciones-form/calificaciones-form.component';
import { CalificacionesListComponent } from './components/calificaciones-list/calificaciones-list.component';
import { CalificacionesService } from './services/calificaciones/calificaciones.service';
import { FilterPipe } from './pipes/filter.pipe';
import { FilterAlumnoPipe } from './pipes/filter-alumno.pipe';
import { FilterMaestroPipe } from './pipes/filter-maestro.pipe';
import { FilterAdminPipe } from './pipes/filter-admin.pipe';
import { FilterHorarioPipe } from './pipes/filter-horario.pipe';
import { FilterCalifPipe } from './pipes/filter-calif.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    InicioComponent,
    RegisterComponent,
    LoginComponent,
    RegisterComponent,
    AlumnosListComponent,
    AlumnosComponent,
    MaestrosComponent,
    AdminComponent,
    MaestrosListComponent,
    HorariosComponent,
    Error404Component,
    HorariosFormComponent,
    AdminListComponent,
    UpdateFormComponent,
    CalificacionesComponent,
    CalificacionesFormComponent,
    CalificacionesListComponent,
    FilterPipe,
    FilterAlumnoPipe,
    FilterMaestroPipe,
    FilterAdminPipe,
    FilterHorarioPipe,
    FilterCalifPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,FormsModule,NgChartsModule,CommonModule],
  providers: [UsersService,AlumnosService,AdminService,MaestrosService,HorariosService,CalificacionesService,DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
