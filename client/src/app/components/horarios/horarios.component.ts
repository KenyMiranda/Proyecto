import { Component, OnInit } from '@angular/core';
import { HorariosService } from 'src/app/services/horarios/horarios.service';
import { MaestrosService } from 'src/app/services/maestros/maestros.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css'],
})
export class HorariosComponent implements OnInit {
  arrayHorarios: any = [];
  arrayMaestros: any = [];
  arrayDia: any = [];
  constructor(
    private horariosService: HorariosService,
    private maestrosService: MaestrosService
  ) {}
  public dia: boolean = true;
  ngOnInit() {
    this.obtenerMaestros();
    this.obtenerHorarios();

  }

  obtenerMaestros(){
    this.maestrosService.getMaestros().subscribe(
      (res) => {
        this.arrayMaestros = res;
        console.log(res);
      },

      (err) => console.error(err)
    );
  }

  obtenerHorarios(){
    this.horariosService.getHorarios().subscribe(
      (res) => {
        this.arrayHorarios = res;

        console.log(this.arrayHorarios[0]);
        for (let i of this.arrayHorarios[0]) {
         this.arrayDia.push(i.dia);

         if(i.dia =="Saturday"){
          console.log("Si");
         }
        }


        console.log(this.arrayDia);
      },

      (err) => console.error(err)
    );

  }


}
