import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  constructor(private authService: AuthService){}

  isAdmin: boolean = false;

  ngOnInit(){
    this.isAdmin = this.authService.isAdmin();
  }
}

