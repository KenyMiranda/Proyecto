import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalificacionesService } from 'src/app/services/calificaciones/calificaciones.service';
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';
import { Calificacion } from 'src/app/models/calificaciones';
import { Chart } from 'chart.js';
import { GrabacionesComponent } from '../grabaciones/grabaciones.component';
import 'chartjs-plugin-annotation';
import 'chartjs-plugin-datalabels';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css'],
})
export class CalificacionesComponent implements OnInit {
  
  public calificaciones: any = [];
  public calificacionesAlumno: any = [];
  public arrayAlumno: any = [];
  public fechas: any = [];
  nombreUsuario = this.authService.getNameFromToken();
  rol=this.authService.getRoleFromToken();
  isAdmin = this.authService.isAdmin();
  isAlumno:boolean =false;
  nombreAlumno: number =0;
  // Array de calificaciones (debes proporcionar tus propias calificaciones)

  calificacion: Calificacion = {
    fecha_calif: '',
    calificacion: 0,
    id_alumno: 0,
    
  };
  colorearFila: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private alumnosService: AlumnosService,
    private calificacionesService: CalificacionesService
    ,private authService: AuthService, private router: Router,
    private grabacion : GrabacionesComponent
  ) {}
  ngOnInit() {
    this.generarGrafica();
    if(this.rol==1){
      this.isAlumno=true;
    }
    this.getAlumnos();
  }

  logout(): void {
    this.authService.removeToken(); // Elimina el token al cerrar sesión
    this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
    
    
  }

  getGrabacion(id:number,id2:string){
    console.log(id);
    console.log(id2);
    
   
    this.router.navigate(['/grabaciones',id,id2]);
  }
  

  getAlumnos(){
    this.alumnosService.getAlumnos().subscribe(
      (res) => {
        this.arrayAlumno = res;
        console.log(this.arrayAlumno[0]);
       
      },
      (err) => {
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: ""+err.error.msg,
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }



    )
  }

  deleteCalificacion(id: number){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.calificacionesService.deleteCalificacion(id.toString()).subscribe(
          (res) => {
            console.log(res);
            setTimeout(() => {
        
              location.reload();
            
            }, 2500);
            this.generarGrafica();
          },
          (err) => {
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: ""+err.error.msg,
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        }
    
        );
        Swal.fire({
          title: "Deleted!",
          
          text: "The grade has been deleted.",
          icon: "success"
        });
      }
      
    });

  }

 

  generarGrafica() {
    const objeto: any = {};
    const params = this.activatedRoute.snapshot.params
    this.nombreAlumno = params['id'];
    
    if (params['idG'] && params['id']) {
      this.calificacionesService
        .getCalificacion(params['idG'], params['id'])
        .subscribe((res) => {
          this.calificaciones = res;
          for (let i = 0; i < this.calificaciones[0].length; i++) {
            objeto[i] = this.calificaciones[0][i];
            this.calificacionesAlumno.push(
              this.calificaciones[0][i].calificacion
            );
            this.fechas.push(
              this.calificaciones[0][i].fecha_calif.substring(10, 0)
            );
          }
          //if (this.calificacionesAlumno.length > 5)
          //this.calificacionesAlumno.splice(0, 1);
          console.log(objeto);
          console.log(this.calificaciones[0]);
          console.log(this.calificacionesAlumno);
          //this.calificacion=objeto[0];
          //console.log(this.calificacion.id_alumno);
          const ctx = document.getElementById('myChart') as HTMLCanvasElement;

          const myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: this.fechas,
              datasets: [
                {
                  label: 'Calificaciones',
                  data: this.calificacionesAlumno,
                  borderColor: 'blue',
                  fill: false,
                },
              ],
            },
            options: {
              plugins: {
                title: {
                  display: true,
                  text: 'Gráfico de Calificaciones ', // Aquí puedes especificar el título deseado
                  font: {
                    size: 16, // Tamaño de fuente del título
                  },
                },
                datalabels: {
                  anchor: 'end',
                  align: 'end',
                  formatter: function (value, context) {
                    const datasetIndex = context.datasetIndex;
                    const dataIndex = context.dataIndex;
                    const label = `Calificación: ${value}`;
                    return label; // Puedes personalizar la forma en que se muestra la etiqueta aquí
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  min: 0, // Comienza en 0
                  max: 100, // Valor máximo en el eje Y
                },
              },
            },
          });
        });
    }
  }
  
  
}
