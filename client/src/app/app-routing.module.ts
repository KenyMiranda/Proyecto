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
import{Error404Component} from './components/error404/error404.component'
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
    path: 'alumno',
    component: AlumnosComponent,
  },
  { path: 'registro',
    component:RegisterComponent
  },
  {
    path:'maestro',
    component:MaestrosComponent
  },
  {
    path:'admin',
    component:AdminComponent
  },

  {
    path:'horario',
    component:HorariosComponent
  },

  {
    path:'usuario',
    component:UsersComponent
  },

  {
    path:'maestros-list',
    component:MaestrosListComponent
  },
  {
    path:'alumnos-list',
    component:AlumnosListComponent
  },
  {
    path:'**',
    component:Error404Component
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
