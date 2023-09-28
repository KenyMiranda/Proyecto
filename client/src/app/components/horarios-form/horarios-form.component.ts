import { Component, OnInit } from '@angular/core';
import { MaestrosService } from 'src/app/services/maestros/maestros.service';

@Component({
  selector: 'app-horarios-form',
  templateUrl: './horarios-form.component.html',
  styleUrls: ['./horarios-form.component.css']
})
export class HorariosFormComponent  implements OnInit {
  arrayMaestros : any=[];
  constructor(private maestrosService: MaestrosService){

  }

  ngOnInit(){
    this.maestrosService.getMaestros().subscribe(
      (res) => {
        this.arrayMaestros = res;
        console.log(this.arrayMaestros[0]);
      },

      (err) => console.error(err)
    );
  }

}
