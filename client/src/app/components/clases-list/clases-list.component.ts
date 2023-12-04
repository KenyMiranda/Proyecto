import { Component, OnInit } from '@angular/core';
import { ClasesHorariosService } from 'src/app/services/clasesHorarios/clases-horarios.service';
import { MaestrosService } from 'src/app/services/maestros/maestros.service';
import { AlumnoGruposService } from 'src/app/services/alumnoGrupos/alumno-grupos.service';

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
  click : boolean = false;
  constructor(private clasesHorarioService: ClasesHorariosService, private maestroService : MaestrosService,private alumnoGrupoService : AlumnoGruposService){}

  ngOnInit() {

    this.getClases();
    this.getMaestro();
    
  }

  getClases(){
    this.clasesHorarioService.getClasesHorarios().subscribe(
      (res) => {

        this.arrayClases = res;
        console.log(this.arrayClases[0]);
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
