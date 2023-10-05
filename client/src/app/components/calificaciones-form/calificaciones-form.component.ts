import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'; 
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';

@Component({
  selector: 'app-calificaciones-form',
  templateUrl: './calificaciones-form.component.html',
  styleUrls: ['./calificaciones-form.component.css']
})
export class CalificacionesFormComponent implements OnInit {

  arrayAlumnos: any = []; 
  fechas: Date[] = [];
  diasAgregados = 6;

  constructor(private alumnosService: AlumnosService , private datepipe: DatePipe){
    

  }

  ngOnInit() {
    this.getAlumnos();
    //this.crearArrayDeFechas();
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
}
