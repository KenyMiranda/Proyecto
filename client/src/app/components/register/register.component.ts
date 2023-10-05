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
    id_user:0,
    first_nameU: '',
    last_nameU: '',
    last_nameU2: '',
    telephoneU: '',
    email: '',
    password: '',
    id_rol: 0,
  };

  arrayusers: any = [];
  edit : boolean = false;
  constructor(
    private userService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
 
  ngOnInit() {
    const objeto : any= {};
    const params = this.activatedRoute.snapshot.params;
    
    if (params['id']) {
      this.userService.getUser(params['id']).subscribe((res) => {
        this.arrayusers = res;
        this.edit=true;

        for (let i = 0; i < this.arrayusers[0].length; i++) {
          objeto[i] = this.arrayusers[0][i];
        }
        console.log(objeto);
        this.usuario=objeto[0];
        console.log(this.usuario.id_user);
      });
    }
  }

  saveUser() {
    delete this.usuario.id_user;
    this.userService.saveUser(this.usuario).subscribe(
      (result) => {
        console.log(result);
        this.router.navigate(['/usuarios-list']);
      },
      (err) => console.log(err)
    );
  }

  updateUser(){
    this.userService.updateUser(this.usuario.id_user,this.usuario).subscribe(
      (result)=> {
        console.log(result);
        this.router.navigate(['/usuarios-list']);
      },
      err => console.log(err)
    );
  }
}
