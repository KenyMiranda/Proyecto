import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Horario } from 'src/app/models/horarios';
import { ClasesService } from 'src/app/services/clases/clases.service';
import { HorariosService } from 'src/app/services/horarios/horarios.service';
import { MaestrosService } from 'src/app/services/maestros/maestros.service';
import { GruposService } from 'src/app/services/grupos/grupos.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ClasesHorariosService } from 'src/app/services/clasesHorarios/clases-horarios.service';
import { Clase } from 'src/app/models/clases';
import { Grupo } from 'src/app/models/grupos';

@Component({
  selector: 'app-horarios-form',
  templateUrl: './horarios-form.component.html',
  styleUrls: ['./horarios-form.component.css']
})
export class HorariosFormComponent  implements OnInit {
  arrayMaestros : any=[];
  arrayHorario : any=[];
  arrayClases : any =[];
  arrayGrupos : any =[];
  edit : boolean = false;
  horario : Horario = {
    
    //idioma:"",
    //dia:"",
    Hora_inicio:"",
    Hora_final:"",
    semana:0,
    id_grupo:0,
  }

  clase : Clase = {
    id_grupo : 0,
    id_alumno : 0
    
    
  }

  grupo : Grupo = {
    nombre_grupo:"",
    categoria:"",
    Idioma:"",
    id_maestro:0,
    id_maestro2:0
    
    
  }
  constructor(private maestrosService: MaestrosService , private horariosService : HorariosService , private router: Router,private clasesHorarioService: ClasesHorariosService,private grupos : GruposService,private activatedRoute: ActivatedRoute){
    

  }

  ngOnInit(){
    const objeto : any= {};
    const params = this.activatedRoute.snapshot.params;

    if (params['id']) {
      this.horariosService.getHorario(params['id']).subscribe((res) => {
        this.arrayHorario = res;
        this.edit=true;

        for (let i = 0; i < this.arrayHorario[0].length; i++) {
          objeto[i] = this.arrayHorario[0][i];
        }
        console.log(objeto);
        this.horario=objeto[0];
        console.log(this.horario.id_horario);
      });
    }
    this.clasesHorarioService.getClasesHorarios().subscribe(
      (res) => {
        this.arrayClases = res;
       console.log(this.arrayClases[0]);
      },

      (err) => console.error(err)
    )

    this.maestrosService.getMaestros().subscribe(
      (res) => {
        this.arrayMaestros = res;
       console.log(this.arrayMaestros[0]);
      },

      (err) => console.error(err)

    );
    this.grupos.getGrupos().subscribe(
      (res) => {
        this.arrayGrupos = res;
       console.log(this.arrayGrupos[0]);
      },

      (err) => console.error(err)

    );

    
    
    
    
  }
    saveHorario(){
    


      Swal.fire({
        title: "Save this schedule?",
        text: "Checkout the information!",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, add it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.horariosService.saveHorario(this.horario).subscribe(
            (res) => {
              
             console.log(res);
             setTimeout(() => {
          
              location.reload();
            
            }, 2500);
            Swal.fire({
              title: "Done!",
              text: "New schedule has been added. THE PAGE WILL BE RELOAD IN 3 SECONDS",
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
          )
      
          
          
          
        }
  
       
      });
      
    }

    updateHorario(){
      this.horariosService.updateHorario(this.horario.id_horario,this.horario).subscribe(
        (result)=> {
          console.log(result);
          Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire("Saved!", "", "success");
              this.router.navigate(['/horario']);
            } else if (result.isDenied) {
              Swal.fire("Changes are not saved", "", "info");
            }
          });
         
         
        },
        (err) => {Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      } 
      );
    }

    escogerGrupo(id:number){

      this.horario.id_grupo = id;
      
  
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

    obtenerGrupo(idGrupo: number):any {

      const grupo = this.arrayGrupos[0].find((m: { id_grupo: number; }) => m.id_grupo === idGrupo);
      return grupo ? `${grupo.nombre_grupo}` : '';
  
     
        
    }

 

   
  
 

   
}
