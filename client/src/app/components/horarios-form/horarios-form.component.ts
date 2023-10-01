import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Horario } from 'src/app/models/horarios';
import { HorariosService } from 'src/app/services/horarios/horarios.service';
import { MaestrosService } from 'src/app/services/maestros/maestros.service';

@Component({
  selector: 'app-horarios-form',
  templateUrl: './horarios-form.component.html',
  styleUrls: ['./horarios-form.component.css']
})
export class HorariosFormComponent  implements OnInit {
  arrayMaestros : any=[];
  arrayHorario : any=[];
  horario : Horario = {
    
    idioma:"",
    nivel:"",
    dia:"",
    Hora_inicio:"",
    Hora_final:"",
    id_maestro:0,
  }
  constructor(private maestrosService: MaestrosService , private horariosService : HorariosService , private router: Router){
    

  }

  ngOnInit(){
    this.maestrosService.getMaestros().subscribe(
      (res) => {
        this.arrayMaestros = res;
       console.log(res);
      },

      (err) => console.error(err)
    );
  }
    saveHorario(){
      this.horariosService.saveHorario(this.horario).subscribe(
        result => {
          console.log(result);
          this.router.navigate(['/horario']);
          
        },
        err => console.log(err)
      )

    }
}
