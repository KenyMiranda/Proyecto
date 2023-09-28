import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumnos';
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';

@Component({
  selector: 'app-alumnos-list',
  templateUrl: './alumnos-list.component.html',
  styleUrls: ['./alumnos-list.component.css']
})
export class AlumnosListComponent implements OnInit {
  arrayAlumnos: any = []; 

  constructor(private alumnosService: AlumnosService){

  }

  ngOnInit() {
    this.alumnosService.getAlumnos().subscribe(
      (res) => {
        this.arrayAlumnos = res;
        console.log(this.arrayAlumnos[0]);
      },

      (err) => console.error(err)
    );

  }
}
