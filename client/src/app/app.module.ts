import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,FormsModule,NgChartsModule],
  providers: [UsersService,AlumnosService,AdminService,MaestrosService,HorariosService],
  bootstrap: [AppComponent],
})
export class AppModule {}
