import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {
  rol = this.authService.getRoleFromToken();
  id: any = this.authService.getIdFromToken();
  isAdmin = this.authService.isAdmin();
  isMaestro = this.authService.isMaestro();

  constructor(
   
    private authService: AuthService,
    private router: Router
   
  ) {}

  nombreUsuario = this.authService.getNameFromToken();

  logout(): void {
    this.authService.removeToken(); // Elimina el token al cerrar sesión
    this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
  }
}
