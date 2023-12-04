import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';
import { CalificacionesService } from 'src/app/services/calificaciones/calificaciones.service';
import { AlumnoGruposService } from 'src/app/services/alumnoGrupos/alumno-grupos.service';
import { Calificacion } from 'src/app/models/calificaciones';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calificaciones-form',
  templateUrl: './calificaciones-form.component.html',
  styleUrls: ['./calificaciones-form.component.css'],
})
export class CalificacionesFormComponent implements AfterViewInit {
  //@ViewChild('myElement') myElement: ElementRef | undefined;
  @ViewChildren('myElement') myElements: QueryList<ElementRef> | undefined;
  arrayAlumnos: any = [];
  fechas: Date[] = [];
  diasAgregados = 6;

  calificacion: Calificacion = {
    fecha_calif: new Date(),
    calificacion: 0,
    id_alumno: 0,
  };

  //formulario: FormGroup;

  constructor(
    private datepipe: DatePipe,
    private alumnosService: AlumnosService,
    private calificacionService: CalificacionesService,
    private formBuilder: FormBuilder,
    private alumnosGruposService: AlumnoGruposService,
    private activatedRoute: ActivatedRoute
  ) {
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

  ngAfterViewInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.alumnosGruposService.getAlumnos(params['id']).subscribe((res) => {
        this.arrayAlumnos = res;

        console.log(this.arrayAlumnos[0]);
       
      });
    }

    if (this.myElements) {
      // Acceder a cada input de manera individual
      this.myElements.forEach((element, index) => {
        console.log(`Valor del input ${index + 1}: ${element.nativeElement.value}`);
      });
    }

    console.log(this.myElements)
  }
  /*
  getAlumnos(){
    this.alumnosService.getAlumnos().subscribe(
      (res) => {
        this.arrayAlumnos = res;
        console.log(this.arrayAlumnos[0]);
      },

      (err) => console.error(err)
    );
  }
  */

  crearArrayDeFechas() {
    const hoy = new Date();
    for (let i = 0; i <= this.diasAgregados; i++) {
      const fecha = new Date();
      fecha.setDate(hoy.getDate() + i);
      this.fechas.push(fecha);
    }
    console.log(this.fechas);
  }

  saveCalificacion(id: number,index:number){
    this.calificacion.id_alumno = id;

    if (this.myElements && this.myElements.first) {
      const inputValue = this.myElements.toArray()[index]?.nativeElement.value;
      this.calificacion.calificacion = inputValue;
      console.log('Valor del input:', inputValue);
      // Haz lo que necesites con el valor obtenido
    }
    /*
    const inputValue = this.myElement?.nativeElement.value;
    this.calificacion.calificacion = inputValue;
    console.log('Valor del input:', inputValue);

    console.log(this.myElement?.nativeElement);

    console.log('Valor del input:', this.calificacion.calificacion);
    */
    Swal.fire({
      title: 'Assign grade ?',
      text: 'This grade will be assing to this student!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.calificacionService.saveCalificacion(this.calificacion).subscribe(
          (result) => {
            console.log(result);
            //this.router.navigate(['/horario']);
            Swal.fire({
              title: 'Done!',
              text: 'The grade has been added.',
              icon: 'success',
            });
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
          }
        );
      }
    });
  }
}
