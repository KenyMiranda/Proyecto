import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'; 
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';
import { CalificacionesService } from 'src/app/services/calificaciones/calificaciones.service';
import { Calificacion } from 'src/app/models/calificaciones';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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

  //formulario: FormGroup;

  constructor(private datepipe: DatePipe,private alumnosService: AlumnosService,
    private calificacionService: CalificacionesService,private formBuilder: FormBuilder){
      /*
      this.formulario = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]]
      });
      */
  }
  /*
  submitForm() {
    if (this.formulario.valid) {
      // Tu lógica para manejar el envío del formulario aquí
      console.log('Formulario válido. Datos:', this.formulario.value);
    } else {
      // Tu lógica para manejar el formulario no válido aquí
      console.log('Formulario no válido. Por favor, corrige los errores.');
    }
  }
  */

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

  saveCalificacion(id:number){
    this.calificacion.id_alumno = id;
    Swal.fire({
      title: "Assign grade ?",
      text: "This grade will be assing to this student!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it!"
    }).then((result) => {
      
      if (result.isConfirmed) {
        this.calificacionService.saveCalificacion(this.calificacion).subscribe(
          result => {
            console.log(result);
            //this.router.navigate(['/horario']);
            Swal.fire({
              title: "Done!",
              text: "The grade has been added.",
              icon: "success"
            });
            
          },
          (err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              
            });
          }
        );
       
      }
    });
   
  }
}
