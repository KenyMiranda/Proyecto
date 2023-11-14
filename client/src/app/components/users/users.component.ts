import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.deleteUser(id_user).subscribe(
          (res) => {
            console.log(res);
            this.getUsers();
          },
          (err) => console.error(err)
    
        );
        Swal.fire({
          title: "Deleted!",
          
          text: "The user has been deleted.",
          icon: "success"
        });
      }
      
    });
   
  }
}
