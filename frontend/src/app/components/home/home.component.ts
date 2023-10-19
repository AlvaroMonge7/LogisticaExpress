import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  package_info: any;
  users:any;

  constructor(
    private http: HttpClient,
    private usersService:UsersService,
    private router:Router
    ) {}

    

  ngOnInit(): void {

    if (!localStorage.getItem('username')) {
      this.router.navigateByUrl('/login');
    }else{

      this.http.get('assets/data/types_of_packages.json').subscribe(data => {
        this.package_info = data;
      });
      
      this.usersService.users().subscribe(
        data=>{
          this.users=data;
          console.log(this.users)
        }
      );
        
    }
  }

}
