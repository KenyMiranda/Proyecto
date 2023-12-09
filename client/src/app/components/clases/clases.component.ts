import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Clase } from 'src/app/models/clases';
import { Grupo } from 'src/app/models/grupos';
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';
import { MaestrosService } from 'src/app/services/maestros/maestros.service';
import { GruposService } from 'src/app/services/grupos/grupos.service';
import { ClasesService } from 'src/app/services/clases/clases.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.css']
})
export class ClasesComponent implements OnInit {
  arrayMaestros : any=[];
  arrayAlumnos : any=[];
  arrayGrupos : any =[];
  
  seleccion1 : boolean = false;
  seleccion2 : boolean = false;
  agregarGrupo : boolean = false;
  numeroMaes : number = 0 ;
  

  filterPost = ""
  grupo : Grupo ={
    nombre_grupo : "",
    categoria:"",
    Idioma:"",
    id_maestro:0,
    id_maestro2:0,
   

  }
  clase : Clase = {
    id_grupo : 0,
    id_alumno : 0
    
    
  }
  constructor(private claseService: ClasesService ,private alumnosService: AlumnosService , private maestrosService: MaestrosService,private gruposService:GruposService,private router:Router){}
  ngOnInit(): void {
    
    this.maestrosService.getMaestros().subscribe(
      (res) => {
        this.arrayMaestros = res;
       console.log(res);
      },

      (err) => console.error(err)
    );

    this.alumnosService.getAlumnos().subscribe(
      (res) => {
        this.arrayAlumnos = res;
       console.log(res);
      },

      (err) => console.error(err)
    );

    this.gruposService.getGrupos().subscribe(
      (res) => {
        this.arrayGrupos = res;
       console.log(res);
      },

      (err) => console.error(err)
    );
  }

  agregarGrupos() {
    this.agregarGrupo = true;
  }

  guardarGrupo() {

    Swal.fire({
      title: "Add this group?",
      text: "this group will be added!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.gruposService.saveGrupo(this.grupo).subscribe(
          (res) => {
            
           console.log(res);
           setTimeout(() => {
        
            location.reload();
          
          }, 2500);
          Swal.fire({
            title: "Done!",
            text: "New group has been added.",
            icon: "success"
          });
         
          },
    
          (err) => {
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! {err.message}",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        }
        )
    
        
        
        
      }

     
    });
   
  }

  numeroMaestro(){
    console.log(this.numeroMaes);
   
    if (this.seleccion2 ==true) this.seleccion2 = false;



    if(this.numeroMaes ==1) {

      this.seleccion1 = true;
    } 
    if(this.numeroMaes ==2) {

      this.seleccion1 = true;
      this.seleccion2 = true;
    } 
    

  }

  escogerGrupo(id:number){

    this.clase.id_grupo = id;
    

  }

  agregarClase(id: number){
    this.clase.id_alumno = id;
    Swal.fire({
      title: "Add this student?",
      text: "This student will be add to this class!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.claseService.saveClase(this.clase).subscribe(
          result => {
            console.log(result);
            //this.router.navigate(['/horario']);
            Swal.fire({
              title: "Done!",
              text: "The student has been added.",
              icon: "success"
            });
            
          },
          (err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: '<a href="#">Why do I have this issue?</a>'
            });
          }
        );
       
      }
    });
    
   
    

    console.log('ID del alumno: ' + id);
  }

  nombreMaestro(id: number){
    const maestro = this.arrayMaestros[0].find((m: { id_user: number; }) => m.id_user === id);
    return maestro ? `${maestro.first_nameU}`+`  ${maestro.last_nameU}` : 'Maestro no encontrado';
  }
  obtenerGrupo(idGrupo: number):any {

    const grupo = this.arrayGrupos[0].find((m: { id_grupo: number; }) => m.id_grupo === idGrupo);
    return grupo ? `${grupo.nombre_grupo}` : '';

   
      
  }

  obtenerNombreMaestro(idGrupo: number): any {
    // Encuentra la clase correspondiente al id_grupo
    const grupo = this.arrayGrupos[0].find((c: {id_grupo:number})=> c.id_grupo === idGrupo);

    // Si se encuentra la clase, encuentra el maestro correspondiente al id_maestro
    if (grupo) {
      const maestro = this.arrayMaestros[0].find((m: {id_user:number}) => m.id_user === grupo.id_maestro);
      return maestro ? `${maestro.first_nameU} ${maestro.last_nameU}` : 'Maestro no encontrado';
    }

    
  }

  obtenerNombreMaestro2(idGrupo: number): any {
    // Encuentra la clase correspondiente al id_grupo
    const grupo = this.arrayGrupos[0].find((c: {id_grupo:number})=> c.id_grupo === idGrupo);

    // Si se encuentra la clase, encuentra el maestro correspondiente al id_maestro
    if (grupo) {
      const maestro = this.arrayMaestros[0].find((m: {id_user:number}) => m.id_user === grupo.id_maestro2);
      return maestro ? `${maestro.first_nameU} ${maestro.last_nameU}` : 'Maestro no encontrado';
    }

  
  }
  

}
