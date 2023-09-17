import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  arrayusers: any = [];
  constructor(private usersService: UsersService) {}

  ngOnInit() {
  

    this.usersService.getUsers().subscribe(
      (res) => {
        this.arrayusers = res;
        console.log(this.arrayusers[0]);
      },

      (err) => console.error(err)
    );
  }
}
