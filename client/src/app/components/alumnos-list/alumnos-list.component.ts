import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';
import Swal from 'sweetalert2';

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

  deleteAlumno(id_alumno: string){
    
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.alumnosService.deleteAlumno(id_alumno).subscribe(
            (res) => {
            console.log(res);
            this.getAlumnos();
            
            } , 
            (err) => {Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: '<a href="#">Why do I have this issue?</a>'
            });
          } 
            
            
      
            
            
          )
          Swal.fire('Eliminado', 'El elemento ha sido eliminado.', 'success');
        }
      });
    
    
  }
}
