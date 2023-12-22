import { Component, OnInit } from '@angular/core';
import { ClasesHorariosService } from 'src/app/services/clasesHorarios/clases-horarios.service';
import { MaestrosService } from 'src/app/services/maestros/maestros.service';
import { AlumnoGruposService } from 'src/app/services/alumnoGrupos/alumno-grupos.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Grupo } from 'src/app/models/grupos';

@Component({
  selector: 'app-clases-list',
  templateUrl: './clases-list.component.html',
  styleUrls: ['./clases-list.component.css']
})
export class ClasesListComponent implements OnInit {
  arrayClases : any =[];
  arrayMaestros : any = [];
  arrayAlumnos : any = [];
  id : number = 0;
  idU:any = this.authService.getIdFromToken();
  rol = this.authService.getRoleFromToken();
  click : boolean = false;
  agregarGrupo : boolean = false;
  idGrupo :any;
  isAdmin = this.authService.isAdmin()
  isMaestro = this.authService.isMaestro();
  isAlumno = this.authService.isAlumno();

  grupo : Grupo ={
    nombre_grupo:""
  }
  constructor(private clasesHorarioService: ClasesHorariosService, private router : Router ,private authService: AuthService,private maestroService : MaestrosService,private alumnoGrupoService : AlumnoGruposService){}

  ngOnInit() {

    this.getClases();
    this.getMaestro();
    
  }

  nombreUsuario = this.authService.getNameFromToken();



logout(): void {
    this.authService.removeToken(); // Elimina el token al cerrar sesión
    this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
  }

  getClases(){
    if (this.rol == '1') {
      
      this.alumnoGrupoService.getClases(this.idU).subscribe(
        (res) => {
          this.arrayClases = res;
          console.log(this.arrayClases[0]);
        },

        (err) => console.error(err)
      );
    } else if (this.rol == '2') {
      this.clasesHorarioService.getClaseHorario(this.idU).subscribe(
        (res) => {
          this.arrayClases = res;
          console.log(this.arrayClases[0]);
        },

        (err) => console.error(err)
      );} else {
    this.clasesHorarioService.getClasesHorarios().subscribe(
      (res) => {

        this.arrayClases = res;
        console.log(this.arrayClases[0]);
      },
      (err) => console.error(err)

      

    );
  }
  }

  copiarGrupo(id: number){
    this.agregarGrupo=true;
    this.idGrupo = id;

  }

  agregarGrupoNuevo(){
    console.log(this.idGrupo);
    this.clasesHorarioService.postNuevoGrupoCopiado(this.idGrupo.toString(),this.grupo).subscribe(
      (res) => {

        console.log(res);
        location.reload();
      },
      (err) => console.error(err)
    );
  }

  getMaestro(){
    this.maestroService.getMaestros().subscribe(
      (res) => {

        this.arrayMaestros = res;
        console.log(this.arrayMaestros[0]);
      },
      (err) => console.error(err)

      

    );
  }

  getAlumnos(id:number){
    this.click = true;

    this.alumnoGrupoService.getAlumnos(id.toString()).subscribe(
      (res) => {

        this.arrayAlumnos = res;
        console.log(this.arrayAlumnos[0]);
      },
      (err) => console.error(err)
    );
  }

  borrarAlumno(id: number,idG:number){
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
        this.alumnoGrupoService.deleteAlumnoClase(id.toString(),idG.toString()).subscribe(
          (res) => {
            console.log(res);
            setTimeout(() => {
         
             location.reload();
           
           }, 2500);
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
          
          text: "The user has been deleted.",
          icon: "success"
        });
      }
      
    });
   
  }


  obtenerNombreMaestro(idMaestro: number): string {
    // Encuentra la clase correspondiente al id_grupo
    //const clase = this.arrayClases[0].find((c: {id_grupo:number})=> c.id_grupo === idGrupo);

    // Si se encuentra la clase, encuentra el maestro correspondiente al id_maestro
    
      const maestro = this.arrayMaestros[0].find((m: {id_user:number}) => m.id_user === idMaestro);
      return maestro ? `${maestro.first_nameU} ${maestro.last_nameU}` : 'Maestro no encontrado';
    

    
  }

  obtenerNombreMaestro2(idMaestro: number): string {
    // Encuentra la clase correspondiente al id_grupo
    //const clase = this.arrayClases[0].find((c: {id_grupo:number})=> c.id_grupo === idGrupo);

    // Si se encuentra la clase, encuentra el maestro correspondiente al id_maestro
    
      const maestro = this.arrayMaestros[0].find((m: {id_user:number}) => m.id_user === idMaestro);
      return maestro ? `${maestro.first_nameU} ${maestro.last_nameU}` : 'Maestro no encontrado';
    

    
  }

}
