import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  arrayusers: any = [];
  filterPost = "";
  constructor(private usersService: UsersService , private router: Router , private authService: AuthService) {}

  ngOnInit() {
    this.getUsers();
    //this.authService.getIdFromToken();

  }

  getUsers() {
    
    this.usersService.getUsers().subscribe(
      (res) => {
        
        this.arrayusers = res;
        console.log(this.arrayusers[0]);
        
      },

      (err) => {
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
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
          (err) => {
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        }
    
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
