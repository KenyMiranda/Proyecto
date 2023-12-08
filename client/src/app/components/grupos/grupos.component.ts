import { Component, OnInit } from '@angular/core';
import { GruposService } from 'src/app/services/grupos/grupos.service';
import { MaestrosService } from 'src/app/services/maestros/maestros.service';


@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css'],
})
export class GruposComponent implements OnInit {
  arrayGrupos : any =[];
  arrayMaestros:any = [];
  constructor(private gruposService:GruposService , private maestrosService:MaestrosService) {}

  ngOnInit() {
    
    this.gruposService.getGrupos().subscribe(
      (res) => {
        this.arrayGrupos = res;
       console.log(res);
      },

      (err) => console.error(err)
    );

    this.maestrosService.getMaestros().subscribe(

      (res) => {
        this.arrayMaestros = res;
        console.log(res);
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
