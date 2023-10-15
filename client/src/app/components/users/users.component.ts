import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  arrayusers: any = [];
  filterPost = "";
  constructor(private usersService: UsersService , private router: Router) {}

  ngOnInit() {
    this.getUsers();


  }

  getUsers() {
    this.usersService.getUsers().subscribe(
      (res) => {
        this.arrayusers = res;
        console.log(this.arrayusers[0]);
      },

      (err) => console.error(err)
    );

  }

  deleteUser(id_user : string){
    this.usersService.deleteUser(id_user).subscribe(
      (res) => {
        console.log(res);
        this.getUsers();
      },
      (err) => console.error(err)

    );
  }
}
