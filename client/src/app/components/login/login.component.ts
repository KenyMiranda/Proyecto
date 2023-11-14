import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users/users.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private userService: UsersService, private router: Router) {}
  loginUsuario() {
    if (this.email == '' || this.password == '') {
      console.log('Please enter');
      
    } else {
      
      
    }

    const user: Users = {
      id_user: 0,
      first_nameU: '',
      last_nameU: '',
      last_nameU2: '',
      telephoneU: '',
      email: this.email,
      password: this.password,
      id_rol: 0,
    };
    this.userService.loginUser(user).subscribe({
      next: (token: any) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Signed in successfully"
        });
     
          this.router.navigate(['/admin']);
     

        localStorage.setItem('token', token.toString());
        
      },
      error: (error: any) => {
        // Manejar el error aquí
        Swal.fire({
          icon: "error",
          title: "Oops... error inicio de sesion",
          text: "Email o Password Incorrectos",
          
        });
        // Puedes mostrar un mensaje de error al usuario o realizar otras acciones necesarias
      }
     
    }
   
    );
  }
}
