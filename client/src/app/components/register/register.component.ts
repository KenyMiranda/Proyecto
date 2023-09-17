import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users';
import{UsersService} from '../../services/users/users.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  usuario : Users = {
    first_nameU : "",
    last_nameU : "",
    last_nameU2 : "",
    telephoneU : "",
    email: "",
    password: "",
    id_rol: 0
  };

  constructor(private userService: UsersService){}

  ngOnInit() {
    
  }

  saveUser(){
    this.userService.saveUser(this.usuario)
    .subscribe(
      result => {
        console.log(result);
      },
      err => console.log(err)
      
    )
  }
}
