import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
  export class AdminListComponent implements OnInit {
  arrayAdmin : any = [];

  constructor(private adminService : AdminService){}

  ngOnInit() {
    this.getAdmin();
  }

  getAdmin(){
    this.adminService.getAdmins().subscribe(
      (res) =>{
        this.arrayAdmin = res;
        console.log(this.arrayAdmin[0]);
      } , (err) => console.log(err)
    );
  }

  deleteAdmin(id_admin: string){
    this.adminService.deleteAdmin(id_admin).subscribe(
      (res) => console.log(res)
      
    )
    this.getAdmin();
  }

}
