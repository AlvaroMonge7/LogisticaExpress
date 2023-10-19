import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private logInService: LoginService,
    private router: Router
    ){}

  name:any ='' ;
  password:any='';

  loginUsuario(){
    this.logInService.login(this.name, this.password).subscribe(
      data => {
        if(data.success){
          localStorage.setItem('username', this.name);
          this.router.navigateByUrl('/');
        }else{
          alert(data.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
  }

}
