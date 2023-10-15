import { Component, OnInit } from '@angular/core';
import { Calificacion } from 'src/app/models/calificaciones';
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';
import { CalificacionesService } from 'src/app/services/calificaciones/calificaciones.service';

@Component({
  selector: 'app-calificaciones-list',
  templateUrl: './calificaciones-list.component.html',
  styleUrls: ['./calificaciones-list.component.css'],
})
export class CalificacionesListComponent implements OnInit {
  arrayAlumnos: any = [];
  arrayCalificaciones: any = [];
  arrayFechas: any = [];
  arrayCalif : any = [];
  calificacion: Calificacion = {
    fecha_calif: new Date(),
    calificacion: 0,
    id_alumno: 0,
  };
  
  filterPost = "";

  constructor(
    private alumnosService: AlumnosService,
    private calificacionesService: CalificacionesService
  ) {}
  ngOnInit() {
    this.getAlumnos();
    this.getCalificaciones();
  }

  getAlumnos() {
    this.alumnosService.getAlumnos().subscribe(
      (res) => {
        this.arrayAlumnos = res;
        console.log(this.arrayAlumnos[0]);
      },

      (err) => console.error(err)
    );
  }

  getCalificaciones() {
    const objeto: any = {};
    this.calificacionesService.getCalificaciones().subscribe(
      (res) => {
        this.arrayCalificaciones = res;
        for (let i = 0; i < this.arrayCalificaciones[0].length; i++) {
          objeto[i] = this.arrayCalificaciones[0][i];
          //let fecha = objeto[i].fecha_calif;
          if (this.arrayFechas.length === 0) {
            this.arrayFechas.push(objeto[i].fecha_calif);
           
          } else {
            let fecha = objeto[i - 1].fecha_calif;
            if (!(fecha == objeto[i].fecha_calif)) this.arrayFechas.push(objeto[i].fecha_calif);

           
          }

          if(this.arrayFechas.length > 5) this.arrayFechas.splice(0,1);

          
        }

        

        
        console.log(this.arrayCalificaciones[0]);
      },

      (err) => console.error(err)
    );
  }

  obtenerCalificacion(id_alumno:number,fecha:Date):number{
    const maestro = this.arrayCalificaciones[0].find((m: { id_alumno: number; fecha_calif: Date; }) => m.id_alumno === id_alumno && m.fecha_calif === fecha);
    return maestro ? maestro.calificacion : 0;
  }
}
