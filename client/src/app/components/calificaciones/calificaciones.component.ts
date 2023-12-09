import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalificacionesService } from 'src/app/services/calificaciones/calificaciones.service';
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';
import { Calificacion } from 'src/app/models/calificaciones';
import { Chart } from 'chart.js';
import 'chartjs-plugin-annotation';
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css'],
})
export class CalificacionesComponent implements OnInit {
  public calificaciones: any = [];
  public calificacionesAlumno: any = [];
  public fechas: any = [];

  // Array de calificaciones (debes proporcionar tus propias calificaciones)

  calificacion: Calificacion = {
    fecha_calif: '',
    calificacion: 0,
    id_alumno: 0,
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private alumnosService: AlumnosService,
    private calificacionesService: CalificacionesService
  ) {}
  ngOnInit() {
    this.generarGrafica();
  }

  generarGrafica() {
    const objeto: any = {};
    const params = this.activatedRoute.snapshot.params;
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
