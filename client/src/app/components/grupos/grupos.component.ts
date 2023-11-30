import { Component, OnInit } from '@angular/core';
import { GruposService } from 'src/app/services/grupos/grupos.service';


@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css'],
})
export class GruposComponent implements OnInit {
  arrayGrupos : any =[];
  constructor(private gruposService:GruposService) {}

  ngOnInit() {
    
    this.gruposService.getGrupos().subscribe(
      (res) => {
        this.arrayGrupos = res;
       console.log(res);
      },

      (err) => console.error(err)
    );
  }

  
}
