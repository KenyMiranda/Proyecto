import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'; 
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';
import { CalificacionesService } from 'src/app/services/calificaciones/calificaciones.service';
import { Calificacion } from 'src/app/models/calificaciones';

@Component({
  selector: 'app-calificaciones-form',
  templateUrl: './calificaciones-form.component.html',
  styleUrls: ['./calificaciones-form.component.css']
})
export class CalificacionesFormComponent implements OnInit {

  
  arrayAlumnos: any = []; 
  fechas: Date[] = [];
  diasAgregados = 6;

  calificacion : Calificacion= {
    fecha_calif: new Date(),
    calificacion:0,
    id_alumno:0


  }

  constructor(private datepipe: DatePipe,private alumnosService: AlumnosService,private calificacionService: CalificacionesService){
    

  }

  ngOnInit() {
    this.getAlumnos();
    this.crearArrayDeFechas();
  }

  getAlumnos(){
    this.alumnosService.getAlumnos().subscribe(
      (res) => {
        this.arrayAlumnos = res;
        console.log(this.arrayAlumnos[0]);
      },

      (err) => console.error(err)
    );
  }

  crearArrayDeFechas() {
    const hoy = new Date();
    for (let i = 0; i <= this.diasAgregados; i++) {
      const fecha = new Date();
      fecha.setDate(hoy.getDate() + i);
      this.fechas.push(fecha);
      
    }
    console.log(this.fechas);
  }

  saveCalificacion(){
    this.calificacionService.saveCalificacion(this.calificacion).subscribe(
      (res) => {
        console.log(res);
        
      },
      (err) => console.error(err)
    );
  }
}
