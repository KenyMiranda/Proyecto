import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { MaestrosService } from 'src/app/services/maestros/maestros.service';

@Component({
  selector: 'app-maestros-list',
  templateUrl: './maestros-list.component.html',
  styleUrls: ['./maestros-list.component.css']
})
export class MaestrosListComponent {
  arrayMaestros: any = []; 
  filterPost = "";
  constructor(private maestrosService: MaestrosService){

  }

  ngOnInit() {
    this.getMaestro();


  }

  getMaestro() {
    this.maestrosService.getMaestros().subscribe(
      (res) => {
        this.arrayMaestros = res;
        console.log(this.arrayMaestros[0]);
      },

      (err) => console.error(err)
    );
  }

  deleteMaestro(id_maestro: number){
    this.maestrosService.deleteMaestro(id_maestro).subscribe(
      (res) => console.log(res)
      
    )
    this.getMaestro();
  }
}
