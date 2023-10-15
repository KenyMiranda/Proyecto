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
  nombre: string = '';
  nombreM: string = '';
  idm1: number = 0;
  idm2: number = 0;
  filterPost = '';

  constructor(
    private horariosService: HorariosService,
    private maestrosService: MaestrosService
  ) {}
  public dia: boolean = true;
  ngOnInit() {
    this.obtenerMaestros();
    this.obtenerHorarios();
    
  }

  obtenerMaestros() {
    let objeto: any = {};

    this.maestrosService.getMaestros().subscribe(
      (res) => {
        this.arrayMaestros = res;
        console.log(this.arrayMaestros[0]);

        for (let i = 0; i < this.arrayMaestros[0].length; i++) {
          objeto[i] = this.arrayMaestros[0][i];
          let nombre = objeto[i].first_name_M;
          this.idm2 = objeto[i].id_maestro;
          console.log(nombre);
          this.nombre = nombre;
        }
      },

      (err) => console.error(err)
    );
  }

  obtenerHorarios() {
    
    this.horariosService.getHorarios().subscribe(
      (res) => {
        this.arrayHorarios = res;

        console.log(this.arrayHorarios[0]);

      },

      (err) => console.error(err)
    );
  }

  obtenerNombre(idMaestro: number):string {

    const maestro = this.arrayMaestros[0].find((m: { id_maestro: number; }) => m.id_maestro === idMaestro);
    return maestro ? `${maestro.first_name_M} ${maestro.last_name_M}` : 'Maestro no encontrado';
      
  }
}
