import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users';
import { UsersService } from '../../services/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  usuario: Users = {
    first_nameU: '',
    last_nameU: '',
    last_nameU2: '',
    telephoneU: '',
    email: '',
    password: '',
    id_rol: 0,
  };

  arrayusers: any = [];

  constructor(
    private userService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
 
  ngOnInit() {
     const objeto : any= {};
    const params = this.activatedRoute.snapshot.params;
    console.log(params);
    if (params['id']) {
      this.userService.getUser(params['id']).subscribe((res) => {
        this.arrayusers = res;
        

        for (let i = 0; i < this.arrayusers[0].length; i++) {
          objeto[i] = this.arrayusers[0][i];
        }
        console.log(objeto);
        this.usuario=objeto[0];
        console.log(this.usuario);
      });
    }
  }

  saveUser() {
    this.userService.saveUser(this.usuario).subscribe(
      (result) => {
        console.log(result);
        this.router.navigate(['/usuarios-list']);
      },
      (err) => console.log(err)
    );
  }
}
