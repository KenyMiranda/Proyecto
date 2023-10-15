import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';

@Component({
  selector: 'app-alumnos-list',
  templateUrl: './alumnos-list.component.html',
  styleUrls: ['./alumnos-list.component.css']
})
export class AlumnosListComponent implements OnInit {
  arrayAlumnos: any = []; 
  filterPost = ""
  constructor(private alumnosService: AlumnosService , private router: Router){
    

  }

  ngOnInit() {
    this.getAlumnos();

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

  deleteAlumno(id_alumno: string) {
    this.alumnosService.deleteAlumno(id_alumno).subscribe(
      (res) => {
      console.log(res);
      this.getAlumnos();
      
      } , 
      (err) => {console.error(err);
      
      }

      
      
    )

  }
}
