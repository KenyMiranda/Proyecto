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
import { CalificacionesListComponent } from './components/calificaciones-list/calificaciones-list.component';
import { ClasesComponent } from './components/clases/clases.component';
import { GruposComponent } from './components/grupos/grupos.component';
import { GrabacionesComponent } from './components/grabaciones/grabaciones.component';
import { MaterialesComponent } from './components/materiales/materiales.component';
import { ClasesListComponent } from './components/clases-list/clases-list.component';
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
  { path: 'registro', component: RegisterComponent },
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
    path: 'horarios',
    component: HorariosComponent,
  },

  {
    path: 'horarios-form',
    component: HorariosFormComponent,
  },

  {
    path: 'clases',
    component: ClasesComponent,
  },  
  
  {
    path: 'clases-list',
    component: ClasesListComponent,
  },

  {
    path: 'grupos',
    component: GruposComponent,
  },

  { path: 'grabaciones', 
    component: GrabacionesComponent },


  { path: 'materiales', 
    component: MaterialesComponent },

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
    path: 'calificaciones-form/:id',
    component: CalificacionesFormComponent,
  },
  {
    path: 'calificaciones-list',
    component: CalificacionesListComponent,
  },
  {
    path: 'calificaciones/:id',
    component: CalificacionesComponent,
  },
  {
    path: 'usuario/update/:id',
    component: RegisterComponent,
  },

  {
    path: 'horarios/update/:id',
    component: HorariosFormComponent,
  },

  {
    path: 'admin/update/:id',
    component: UpdateFormComponent,
  },

  {
    path: 'alumno/update/:id',
    component: UpdateFormComponent,
  },

  {
    path: 'maestro/update/:id',
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
