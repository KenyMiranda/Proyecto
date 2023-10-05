import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { RegisterComponent } from './components/register/register.component';
import { MaestrosComponent } from './components/maestros/maestros.component';
import { AdminComponent } from './components/admin/admin.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { HorariosComponent } from './components/horarios/horarios.component';
import { UsersComponent } from './components/users/users.component';
import { MaestrosListComponent } from './components/maestros-list/maestros-list.component';
import { AlumnosListComponent } from './components/alumnos-list/alumnos-list.component';
import { Error404Component } from './components/error404/error404.component';
import { HorariosFormComponent } from './components/horarios-form/horarios-form.component';
import { UpdateFormComponent } from './components/update-form/update-form.component';
import { AdminListComponent } from './components/admin-list/admin-list.component';
import { CalificacionesFormComponent } from './components/calificaciones-form/calificaciones-form.component';
import { CalificacionesComponent } from './components/calificaciones/calificaciones.component';
const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'alumnos',
    component: AlumnosComponent,
  },
  { path: 'registro',   
    component: RegisterComponent,
  
  },
  {
    path: 'update',
    component: UpdateFormComponent,
  },
  {
    path: 'maestros',
    component: MaestrosComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },

  {
    path: 'horario',
    component: HorariosComponent,
  },

  {
    path: 'horario-form',
    component: HorariosFormComponent,
  },

  {
    path: 'usuarios-list',
    component: UsersComponent,
  },

  {
    path: 'admins-list',
    component: AdminListComponent,
  },

  {
    path: 'maestros-list',
    component: MaestrosListComponent,
  },
  {
    path: 'alumnos-list',
    component: AlumnosListComponent,
  },
  {
    path : 'calificacion-form',
    component: CalificacionesFormComponent,
  },
  {
    path : 'calificaciones',
    component: CalificacionesComponent,
  },
  {
    path: 'usuario/update/:id',
    component: RegisterComponent,
  },

  {
    path:'alumno/update/:id',
    component: UpdateFormComponent,
  },

  {
    path : 'maestro/update/:id',
    component: UpdateFormComponent,
  },

  {
    path: '**',
    component: Error404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
