import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos-list',
  templateUrl: './alumnos-list.component.html',
  styleUrls: ['./alumnos-list.component.css']
})
export class AlumnosListComponent implements OnInit {
  arrayAlumnos: any = []; 
  filterPost = ""
  nombreUsuario = this.authService.getNameFromToken();
  constructor(private alumnosService: AlumnosService , private router: Router,private authService: AuthService){
    

  }

  ngOnInit() {
    this.getAlumnos();
    

  }

  logout(): void {
    this.authService.removeToken(); // Elimina el token al cerrar sesión
    this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
    
  }

  getAlumnos(){
    this.alumnosService.getAlumnos().subscribe(
      (res) => {
        this.arrayAlumnos = res;
        console.log(this.arrayAlumnos[0]);
      },

      (err) => console.error(err.error.msg)
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
             
            });
          } 
            
            
      
            
            
          )
          Swal.fire('Eliminado', 'El elemento ha sido eliminado.', 'success');
        }
      });
    
    
  }
}
