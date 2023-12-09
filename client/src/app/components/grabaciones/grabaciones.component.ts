import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GrabacionesService } from 'src/app/services/grabaciones/grabaciones.service';
import { ClasesHorariosService } from 'src/app/services/clasesHorarios/clases-horarios.service';
import { Grabacion } from 'src/app/models/grabaciones';

@Component({
  selector: 'app-grabaciones',
  templateUrl: './grabaciones.component.html',
  styleUrls: ['./grabaciones.component.css']
})
export class GrabacionesComponent {
  isAdmin: boolean = false;
  arrayGrabaciones: any = [];
  arrayClases : any = [];

  grabacion : Grabacion ={
    titulo : "",
    URL:"",
    fecha : "",
    id_clase : 0,

  }
  constructor(private authService: AuthService, private grabacionesService: GrabacionesService,private clasesHorarioService: ClasesHorariosService){}

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.obtenerGrabaciones();
    this.obtenerClases();
  }

  obtenerGrabaciones(){
    this.grabacionesService.getGrabaciones().subscribe(

      (res) => {

        this.arrayGrabaciones = res;
        console.log(this.arrayGrabaciones[0]);
      },
      (err) => console.error(err)
    );

  }

  guardarGrabaciones() {
    this.grabacionesService.saveGrabacion(this.grabacion).subscribe(
      (res) => {

      
        console.log(res);
      },
      (err) => console.error(err)
    );
  }

  obtenerClases(){
    this.clasesHorarioService.getClasesHorarios().subscribe(
      (res) => {
        this.arrayClases = res;
       console.log(this.arrayClases[0]);
      },

      (err) => console.error(err)
    );
  }

  escogerClase(id:number){

    this.grabacion.id_clase = id;
    

  }

}
